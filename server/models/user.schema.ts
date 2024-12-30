import { defineMongooseModel } from '#nuxt/mongoose';
import { Document, Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

export interface RootUser extends Document {
    email: string;
    name: string;
}

const schema = new Schema<RootUser>(
    {
        email: { type: String, unique: true },
        name: { type: String },
    },
    { timestamps: true, strict: true, strictQuery: true }
);

schema.plugin(bcrypt);

export const UserSchema = defineMongooseModel<RootUser>('User', schema, {
    collection: 'users',
    timestamps: true,
    strict: true,
    strictQuery: true,
    pluginTags: ['bcrypt'],
});
