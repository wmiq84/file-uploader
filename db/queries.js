const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	// await prisma.member.deleteMany();
	// await prisma.folder.deleteMany();
	// fix id reset later
	await prisma.member.create({
		data: {
			name: 'test',
			password: '123',
			folders: {
				create: {
					name: 'Homework',
					files: {
						create: {
							name: 'Placeholder',
							size: 1,
							upload: 10,
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
