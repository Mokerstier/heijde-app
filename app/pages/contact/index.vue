<template>
    <div>
        <section class="container">
            <HeaderBlock prefix="/" title="Contact Me" sub-title="Let's Connect"></HeaderBlock>
        </section>
        <section class="container grid gap-4 text-muted lg:grid-cols-2">
            <div class="flex flex-col gap-4">
                <form
                    v-if="submissionMessage === null"
                    ref="formEl"
                    class="flex flex-col gap-4"
                    @submit.prevent="handleSubmit">
                    <p>
                        I’d love to hear from you! Whether you have a project in mind, a question,
                        or just want to say hello, feel free to drop me a message.
                    </p>
                    <div class="field flex flex-col gap-2">
                        <label for="name" class="text-sm font-medium">Your Name</label>
                        <input
                            v-model="body.name"
                            type="text"
                            id="name"
                            name="name"
                            class="field-input border border-line bg-ink p-2 text-white outline-none"
                            required />
                    </div>
                    <div class="field flex flex-col gap-2">
                        <label for="email" class="text-sm font-medium">Your Email</label>
                        <input
                            v-model="body.email"
                            type="email"
                            id="email"
                            name="email"
                            class="field-input border border-line bg-ink p-2 text-white outline-none"
                            required />
                    </div>
                    <div class="field flex flex-col gap-2">
                        <label for="message" class="text-sm font-medium">Your Message</label>
                        <textarea
                            v-model="body.message"
                            id="message"
                            name="message"
                            rows="4"
                            class="field-input border border-line bg-ink p-2 text-white outline-none"
                            required></textarea>
                    </div>
                    <NuxtTurnstile
                        v-model="token"
                        sitekey="0x4AAAAAAA5HcHsNNawkKi6t"
                        appearance="interaction-only" />
                    <Button
                        variant="primary"
                        type="submit"
                        class="hover:bg-primary-dark self-start rounded-md bg-primary px-4 py-2 text-white">
                        Send Message
                    </Button>
                    <p v-if="errorMessage" role="alert" class="text-red-400">
                        {{ errorMessage }}
                    </p>
                </form>
                <div v-else ref="successEl" role="status" class="flex items-center gap-4">
                    <svg
                        class="h-16 w-16 shrink-0 text-primary"
                        viewBox="0 0 52 52"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        aria-hidden="true">
                        <circle class="success-circle" cx="26" cy="26" r="23" />
                        <path class="success-check" d="M15 27l8 8 15-17" />
                    </svg>
                    <h4 class="success-text">{{ submissionMessage }}</h4>
                </div>
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
import gsap from 'gsap';

useHead({
    title: 'Contact | Wouter van der Heijde',
    meta: [
        {
            name: 'description',
            content: 'Get in touch with me',
        },
    ],
});

const body = ref({
    name: '',
    email: '',
    message: '',
});

const token = ref();

const errorMessage = ref<string | null>();
const submissionMessage = ref<string | null>(null);

const formEl = ref<HTMLFormElement | null>(null);
const successEl = ref<HTMLElement | null>(null);

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Success: the checkmark draws itself and the message slides in.
watch(submissionMessage, async (message) => {
    if (message === null || prefersReducedMotion()) return;
    await nextTick();
    if (!successEl.value) return;
    gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.success-circle', { drawSVG: 0, duration: 0.7 })
        .from('.success-check', { drawSVG: 0, duration: 0.4 }, '>-0.1')
        .from('.success-text', { autoAlpha: 0, x: -16, duration: 0.5 }, '<');
});

// Error: shake the form instead of a blocking alert().
watch(errorMessage, async (message) => {
    if (!message || prefersReducedMotion()) return;
    await nextTick();
    if (formEl.value) {
        gsap.fromTo(
            formEl.value,
            { x: -10 },
            { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.25)', clearProps: 'transform' }
        );
    }
});

const mail = useMail();
const handleSubmit = async (event: Event) => {
    errorMessage.value = null;
    console.log(token.value);
    try {
        // Send the token to the CAPTCHA validation API first
        const captchaResponse = await $fetch(`/_turnstile/validate`, {
            method: 'POST',
            body: { token: token.value },
        });
        // const captcha = await captchaResponse.json();
        console.log(captchaResponse);
        // If the CAPTCHA validation is successful (status 200), submit the form
        if (captchaResponse.success) {
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
            submissionMessage.value = null;
        }
    } catch (error) {
        console.error('Submission error:', error);
        errorMessage.value = 'An error occurred while submitting the form.';
        submissionMessage.value = null; // Clear previous messages
    }
};
</script>
<style scoped>
.field label {
    transition:
        color 0.25s,
        transform 0.25s;
}
.field:focus-within label {
    color: var(--color-primary);
    transform: translateX(6px);
}
.field-input {
    transition:
        border-color 0.25s,
        box-shadow 0.25s;
}
.field-input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 30%, transparent);
}
</style>
