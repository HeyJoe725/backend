export default function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'GET':
            // Get data from your database
            res.status(200).json({ text: 'Hello' });
            break;
        case 'POST':
            // Update or create data in your database
            res.status(200).json({ text: 'POST done' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);

    }
}