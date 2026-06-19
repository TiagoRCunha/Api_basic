import express from 'express';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.send({
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
        message: "Welcome to the Redis API"
    });
});

export default router;