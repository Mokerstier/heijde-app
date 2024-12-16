import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        try {
            return await PageModel.find({});
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
});
