const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
	await prisma.file.deleteMany();
	await prisma.folder.deleteMany();
	await prisma.member.deleteMany();
	console.log('All members, folders, and files deleted');

	// Reset the auto-incrementing primary key sequences
	await prisma.$executeRaw`ALTER SEQUENCE "File_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Folder_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Member_id_seq" RESTART WITH 1`;

	const hashedPassword = await bcrypt.hash('123', 10);

	await prisma.member.create({
		data: {
			name: 'test',
			password: hashedPassword,
			folders: {
				create: {
					name: 'Homework',
					files: {
						create: {
							name: 'Placeholder',
							size: 1,
							upload: 10,
							path: "Placeholder"
						},
					},
				},
			},
		},
	});

	// await prisma.folder.create({
	// 	data: {
	// 		name: 'hw',
	// 		password: '123',
	// 	},

	// });
	// const post = await prisma.post.update({
	// 	where: { id: 1 },
	// 	data: { published: true },
	// });
	// console.log(post);

	const allUsers = await prisma.member.findMany({
		include: {
			folders: {
				include: {
					files: true,
				},
			},
		},
	});
	console.dir(allUsers, { depth: null });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
