<template>
    <div>
        <section class="container">
            <HeaderBlock prefix="/" title="Contact Me" sub-title="Let's Connect"></HeaderBlock>
        </section>
        <section class="container grid gap-4 text-gray lg:grid-cols-2">
            <div class="flex flex-col gap-4">
                <form
                    v-if="submissionMessage === null"
                    class="flex flex-col gap-4"
                    @submit.prevent="handleSubmit">
                    <p>
                        I’d love to hear from you! Whether you have a project in mind, a question,
                        or just want to say hello, feel free to drop me a message.
                    </p>
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
                    <NuxtTurnstile v-model="body.token" appearance="interaction-only" />
                    <Button
                        variant="primary"
                        type="submit"
                        class="hover:bg-primary-dark self-start rounded-md bg-primary px-4 py-2 text-white">
                        Send Message
                    </Button>
                </form>
                <h4 v-else>{{ submissionMessage }}</h4>
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
useHead({
    title: 'Contact | Wouter van der Heijde',
    meta: [
        {
            name: 'description',
            content: 'Get in touch with me',
        },
    ],
});

const config = useRuntimeConfig();

const body = ref({
    name: '',
    email: '',
    message: '',
    token: config.public.turnstile.secretKey as string,
});

const errorMessage = ref<string | null>();
const submissionMessage = ref<string | null>(null);

const mail = useMail();
const handleSubmit = async (event: Event) => {
    try {
        // Send the token to the CAPTCHA validation API first
        const captchaResponse = await fetch(`/api/turnstile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body.value),
        });
        const captcha = await captchaResponse.json();

        // If the CAPTCHA validation is successful (status 200), submit the form
        if (captcha.success) {
            // Prepare form data for submission
            mail.send({
                from: body.value.name,
                subject: `Received an email from ${body.value.email}`,
                text: body.value.message,
            });
            body.value.name = '';
            body.value.email = '';
            body.value.message = '';
            submissionMessage.value =
                'Thank you for reaching out! I will get back to you as soon as possible.';
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
