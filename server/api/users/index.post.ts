import { UserSchema } from '#shared/models/user.schema';
import { eventHandler, readBody, createError } from 'h3'
interface IRequestBody {
    email: string;
    password: string;
    name: string;
}
export default eventHandler(async (event) => {
    const { email, password, name } = await readBody<IRequestBody>(event);

    const newUserData = await UserSchema.create({
        email,
        password,
        name,
    });

    if (!newUserData) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User already exists',
        });
    }

    return {
        id: newUserData._id,
        name: newUserData.name,
    };
});
