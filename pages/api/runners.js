// const prisma = require('../../lib/prisma');

// export default async function handle(req, res) {
//     if (req.method === 'GET') {
//         try {
//             const runners = await prisma.runner.findMany(); // Assuming you have a "user" model in your Prisma schema
//             res.status(200).json(runners);
//         } catch (error) {
//             res.status(500).json({ error: "Unable to fetch users." });
//         }
//     } else {
//         res.status(405).json({ error: "Method not allowed." });
//     }
// }

const prisma = require('../../lib/prisma');

export default async function handle(req, res) {
    if (req.method === 'GET') {
        const runnerName = req.query.name;  // Extracting name from query parameters

        // If a name query parameter is provided, fetch by name
        if (runnerName) {
            try {
                const runner = await prisma.runner.findFirst({
                    where: {
                        name: runnerName
                    }
                });
                if (runner) {
                    res.status(200).json(runner);
                } else {
                    res.status(404).json({ error: "Runner not found." });
                }
            } catch (error) {
                res.status(500).json({ error: `Unable to fetch runner with name ${runnerName}.` });
            }
        }
        // If no name is provided, fetch all runners
        else {
            try {
                const runners = await prisma.runner.findMany();
                res.status(200).json(runners);
            } catch (error) {
                res.status(500).json({ error: "Unable to fetch runners." });
            }
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}
