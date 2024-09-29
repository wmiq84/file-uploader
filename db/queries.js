const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	await prisma.member.deleteMany();
	// fix id reset later
	await prisma.member.create({
		data: {
			name: 'test',
			password: '123',
		},
		
	}); 

	// const post = await prisma.post.update({
	// 	where: { id: 1 },
	// 	data: { published: true },
	// });
	// console.log(post);

	const allUsers = await prisma.member.findMany();
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
