import { defineMongooseModel } from '#nuxt/mongoose';
import { Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    tags: string[];
    content: string;
    description: string;
    slug: string;
}

export interface BlogOutline {
    title: string;
    description: string;
    tags: string[];
    slug: string;
}

export const Blog = defineMongooseModel<IBlog>(
    'Blog',
    {
        title: {
            type: 'string',
            required: true,
            unique: true,
        },
        tags: {
            type: [String],
        },
        content: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        slug: {
            type: 'string',
        },
    },
    {
        collection: 'blogs',
        timestamps: true,
        strict: true,
        strictQuery: true,
    },
    (schema) => {}
);
