import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './repository.ts';

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


router.post('/users', async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ message: 'User created', userId: user.entityId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        if (user) {
            res.json({ message: 'User updated', user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const deleted = await deleteUser(req.params.id);
        if (deleted) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;