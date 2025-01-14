import { verifyTurnstileToken } from '@nuxtjs/turnstile/runtime/server/utils/verify.js';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body) {
        throw createError({
            statusCode: 422,
            statusMessage: 'Token not provided.',
        });
    }

    return await verifyTurnstileToken(body);
});
