import { verifyTurnstileToken } from '@nuxtjs/turnstile/runtime/server/utils/verify.js';
import { eventHandler, readBody } from 'h3';

export default eventHandler(async (event) => {
    const { token } = await readBody(event);

    if (!token) {
        throw createError({
            statusCode: 422,
            statusMessage: 'Token not provided.',
        });
    }
    return await verifyTurnstileToken(token);
});
