const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const newRunner = await prisma.runner.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Nunner',

        },

    })

    const newUser = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Nuser',

        },

    })
    console.log(newRunner)
    console.log(newUser)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })