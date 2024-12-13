import { defineMongooseModel } from '#nuxt/mongoose';
export const User = defineMongooseModel(
    'User',
    {
        name: {
            type: 'string',
            required: true,
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
        },
    },
    {},
    (schema) => {}
);
