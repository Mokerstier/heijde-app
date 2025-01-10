export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();
    console.log(config);
    console.log(body.recaptcha_token);
    try {
        const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${config.public.CAPTCHA_SECRET}&response=${body.recaptcha_token}`,
        });

        const captchaResult = await captchaResponse.json();
        console.log(captchaResult);
        if (!captchaResult.success) {
            throw new Error(
                `reCAPTCHA verification failed: ${captchaResult['error-codes'].join(', ')}`
            );
        }

        return { success: true, message: 'reCAPTCHA verification succeeded' };
    } catch (error) {
        return { success: false, message: error.message };
    }
});
