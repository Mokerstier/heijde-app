<template>
    <div>
        <section class="container">
            <HeaderBlock prefix="/" title="Contact Me" sub-title="Let's Connect"></HeaderBlock>
        </section>
        <section class="container grid gap-4 text-gray lg:grid-cols-2">
            <div class="flex flex-col gap-4">
                <p>
                    I’d love to hear from you! Whether you have a project in mind, a question, or
                    just want to say hello, feel free to drop me a message.
                </p>
                <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
                    <div class="flex flex-col gap-2">
                        <label for="name" class="text-sm font-medium">Your Name</label>
                        <input
                            v-model="body.name"
                            type="text"
                            id="name"
                            name="name"
                            class="border-gray-300 rounded-md border p-2 focus:outline-primary"
                            required />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="email" class="text-sm font-medium">Your Email</label>
                        <input
                            v-model="body.email"
                            type="email"
                            id="email"
                            name="email"
                            class="border-gray-300 rounded-md border p-2 focus:outline-primary"
                            required />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="message" class="text-sm font-medium">Your Message</label>
                        <textarea
                            v-model="body.message"
                            id="message"
                            name="message"
                            rows="4"
                            class="border-gray-300 rounded-md border p-2 focus:outline-primary"
                            required></textarea>
                    </div>
                    <button
                        type="submit"
                        class="hover:bg-primary-dark self-start rounded-md bg-primary px-4 py-2 text-white">
                        Send Message
                    </button>
                </form>
            </div>
            <div class="relative flex items-center justify-center">
                <SvgComponent class="absolute left-20 top-6 h-21" icon="Dots" />
                <NuxtImg
                    fit="contain"
                    class="max-h-[600px] border-b border-b-primary lg:max-h-[500px]"
                    src="/images/hero-img.png"></NuxtImg>
                <SvgComponent class="absolute right-16 top-2/3 h-21" icon="Dots" />
            </div>
        </section>
        <section class="container mt-8">
            <div class="flex flex-col items-start gap-4">
                <p class="font-bold">Or connect with me here:</p>
                <div class="flex gap-4">
                    <Button
                        to="https://nl.linkedin.com/in/wouter-van-der-heijde-610695175"
                        target="_blank"
                        variant="secondary">
                        LinkedIn
                    </Button>
                    <Button to="https://github.com/Mokerstier" target="_blank" variant="secondary">
                        GitHub
                    </Button>
                    <Button to="mailto:wouter.van.der.heijde@outlook.com" variant="secondary"
                        >Email</Button
                    >
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { useReCaptcha } from 'vue-recaptcha-v3';

useHead({
    title: 'Contact | Wouter van der Heijde',
    meta: [
        {
            name: 'description',
            content: 'Get in touch with me',
        },
    ],
});

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

const body = ref({
    name: '',
    email: '',
    message: '',
});

const errorMessage = ref<string | null>();
const submissionMessage = ref<string | null>();

const recaptcha = async () => {
    await recaptchaLoaded(); // Wait for reCAPTCHA to load
    return await executeRecaptcha('contact'); // Create a reCAPTCHA token
};

const mail = useMail();
const handleSubmit = async (event: Event) => {
    alert('Message sent!');

    const token = await recaptcha(); // Call the recaptcha method to get the token

    // Check if the token is valid
    if (!token) {
        errorMessage.value = 'Invalid reCAPTCHA. Please try again.';
        submissionMessage.value = null; // Clear previous messages
        alert(errorMessage.value);
        return; // Exit if the token is invalid
    }

    try {
        console.log(token);
        // Send the token to the CAPTCHA validation API first
        const captchaResponse = await fetch(`/api/captcha`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recaptcha_token: token }),
        });
        const captcha = await captchaResponse.json();

        // If the CAPTCHA validation is successful (status 200), submit the form
        if (captcha.succes) {
            // Prepare form data for submission
            mail.send({
                from: body.value.name,
                subject: `Received an email from ${body.value.email}`,
                text: body.value.message,
            });
        } else {
            // Handle CAPTCHA validation error
            errorMessage.value = 'CAPTCHA validation failed. Please try again.';
            alert(errorMessage.value);
            submissionMessage.value = null;
        }
    } catch (error) {
        console.error('Submission error:', error);
        errorMessage.value = 'An error occurred while submitting the form.';
        submissionMessage.value = null; // Clear previous messages
        alert(errorMessage.value); // Show error alert
    }
};
</script>
