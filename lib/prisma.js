
const { PrismaClient } = require('@prisma/client');

// Check if we're in a production environment
const isProd = process.env.NODE_ENV === 'production';

// Declare an instance of PrismaClient
let prisma;

if (isProd) {
    // If we're in production, always use a new Prisma Client
    prisma = new PrismaClient();
} else {
    // Ensure that we're only instantiating Prisma Client once in development
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

module.exports = prisma;
