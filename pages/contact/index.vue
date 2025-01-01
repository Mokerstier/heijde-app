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
useHead({
    title: 'Contact | Wouter van der Heijde',
    meta: [
        {
            name: 'description',
            content: 'Get in touch with me',
        },
    ],
});
const mail = useMail();

const body = ref({
    name: '',
    email: '',
    message: '',
});

const handleSubmit = (event: Event) => {
    alert('Message sent!');
    mail.send({
        from: body.value.name,
        subject: `Received an email from ${body.value.email}`,
        text: body.value.message,
    });
};
</script>
