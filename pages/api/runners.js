const prisma = require('../../lib/prisma');

export default async function handle(req, res) {
    if (req.method === 'GET') {
        try {
            const runners = await prisma.runner.findMany(); // Assuming you have a "user" model in your Prisma schema
            res.status(200).json(runners);
        } catch (error) {
            res.status(500).json({ error: "Unable to fetch users." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}
