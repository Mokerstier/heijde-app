import jwt from 'jsonwebtoken';
import { UserSchema } from '#shared/models/user.schema';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)
    const user = await UserSchema.findOne({ email: email });
    console.log(email, user)
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
