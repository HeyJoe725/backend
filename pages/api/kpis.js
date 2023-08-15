const prisma = require('../../lib/prisma');

export default async function handle(req, res) {
    if (req.method === 'GET') {
        try {
            const kpis = await prisma.KPI.findMany(); // Assuming you have a "user" model in your Prisma schema
            res.status(200).json(kpis);
        } catch (error) {
            console.log('fdsfsefes' + error)
            res.status(500).json({ error: "Unable to fetch users." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}
