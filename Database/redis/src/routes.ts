import express from 'express';
import { getAllUsers } from './repository.ts';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.send({
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
        message: "Welcome to the Redis API"
    });
});

router.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;