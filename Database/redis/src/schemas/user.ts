import type { Entity } from 'redis-om';
import { Schema } from 'redis-om';

export type User = Entity & {
    name: string;
    email: string;
    age: number;
};

export type UserInput = Partial<Pick<User, 'name' | 'email' | 'age'>>;

export const userSchema = new Schema<User>('user', {
    name:  { type: 'string' },
    email: { type: 'string' },
    age:   { type: 'number' },
}, { dataStructure: 'JSON' });
