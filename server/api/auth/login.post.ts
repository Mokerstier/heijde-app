import jwt from 'jsonwebtoken';
import { useCookie } from 'nuxt/app';

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    const user = await UserSchema.findOne({ email: email });

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'User not found',
        });
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
        return createError({
            statusCode: 401,
            statusMessage: 'Password is incorrect',
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.name },
        process.env.JWT_SECRET as string,
        { expiresIn: '48h' } // Token expires in 12 hour
    );

    setCookie(event, 'token', token); // set token to cookie

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Login successful',
        },
    };
});
