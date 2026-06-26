import { Repository } from 'redis-om';
import client from './client.ts';
import utils from './utils.ts';
import {
    getUserIndexReady,
    setUserIndexReady,
    userSchema,
    type User,
    type UserInput,
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

export async function getUserById(id: string): Promise<User | null> {
    const user = await userRepository.fetch(id);
    // redis-om returns an empty entity when not found
    return user?.name !== undefined ? user : null;
}

export async function createUser(data: UserInput): Promise<User> {
    return userRepository.save(data as User);
}

export async function updateUser(id: string, data: UserInput): Promise<User | null> {
    const user = await userRepository.fetch(id);
    if (user?.name === undefined) return null;
    Object.assign(user, data);
    await userRepository.save(user);
    return user;
}

export async function deleteUser(id: string): Promise<boolean> {
    const user = await userRepository.fetch(id);
    if (user?.name === undefined) return false;
    await userRepository.remove(id);
    return true;
}