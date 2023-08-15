const prisma = require('../../lib/prisma');

function replacer(key, value) {
    if (typeof value === 'bigint') {
        return value.toString() + 'n'; // or simply return value.toString();
    } else {
        return value;
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(JSON.parse(JSON.stringify(users, replacer)));
        } catch (error) {

            res.status(500).json({ error: "Unable to fetch users." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}
