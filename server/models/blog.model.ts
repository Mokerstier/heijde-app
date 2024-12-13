import { defineMongooseModel } from '#nuxt/mongoose';

export const Blog = defineMongooseModel(
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
    },
    {},
    (schema) => {}
);
