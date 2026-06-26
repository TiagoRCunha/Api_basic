import { Repository } from 'redis-om';
import client from './client.ts';
import utils from './utils.ts';
import {
    getUserIndexReady,
    setUserIndexReady,
    userSchema,
    type User,
} from './schemas/user.ts';

async function ensureUserIndex(): Promise<void> {
    if (!getUserIndexReady()) {
        setUserIndexReady(userRepository.createIndex());
    }

    await getUserIndexReady();
}

const userRepository = new Repository(userSchema, client);

export async function getAllUsers(): Promise<User[]> {
    await ensureUserIndex();

    try {
        return await userRepository.search().return.all();
    } catch (error) {
        if (!utils.isMissingIndexError(error)) {
            throw error;
        }

        // Index may have been dropped after startup; recreate and retry once.
        setUserIndexReady(null);
        await ensureUserIndex();
        return userRepository.search().return.all();
    }
}
