import { verifyTurnstileToken } from '@nuxtjs/turnstile/runtime/server/utils/verify.js';

export default defineEventHandler(async (event) => {
    const { token } = await readBody(event);

    if (!token) {
        throw createError({
            statusCode: 422,
            statusMessage: 'Token not provided.',
        });
    }
    return await verifyTurnstileToken(token);
});
