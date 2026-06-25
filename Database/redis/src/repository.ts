import { Schema, Repository } from 'redis-om';
import type { Entity } from 'redis-om';
import client from './client.ts';

type User = Entity & {
    name: string;
    email: string;
    age: number;
};

type UserInput = Partial<Pick<User, 'name' | 'email' | 'age'>>;

const userSchema = new Schema<User>('user', {
    name:  { type: 'string' },
    email: { type: 'string' },
    age:   { type: 'number' },
}, { dataStructure: 'JSON' });

const userRepository = new Repository(userSchema, client);

let userIndexReady: Promise<void> | null = null;

async function ensureUserIndex(): Promise<void> {
    if (!userIndexReady) {
        userIndexReady = userRepository.createIndex();
    }

    await userIndexReady;
}

function isMissingIndexError(error: unknown): boolean {
    const message = error instanceof Error ? error.message : String(error);
    return message.includes('SEARCH_INDEX_NOT_FOUND') || message.includes('Index not found');
}

export async function getAllUsers(): Promise<User[]> {
    await ensureUserIndex();

    try {
        return await userRepository.search().return.all();
    } catch (error) {
        if (!isMissingIndexError(error)) {
            throw error;
        }

        // Index may have been dropped after startup; recreate and retry once.
        userIndexReady = null;
        await ensureUserIndex();
        return userRepository.search().return.all();
    }
}
