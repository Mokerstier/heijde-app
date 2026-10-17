import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    rootDir: '.',
    compatibilityDate: '2024-04-03',
    components: [
        {
            path: '@/components',
            pathPrefix: false,
        },
    ],
    turnstile: { siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY, addValidateEndpoint: true },
    runtimeConfig: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        mail: {
            message: {
                to: process.env.MAIL_PERSONAL ?? '',
            },
            smtp: {
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: process.env.GMAIL_MAIL,
                    pass: process.env.GMAIL_PASSWORD,
                },
            },
        },
        public: {
            turnstile: {
                secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
                siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
            },
        },
    },
    mongoose: {
        uri: process.env.NUXT_MONGOOSE_URI,
        // Fail fast with a clear error (usually: Atlas IP allowlist or a wrong URI) instead of
        // hanging until the serverless function times out.
        options: { serverSelectionTimeoutMS: 5000, connectTimeoutMS: 5000 },
        devtools: true,
    },
    ssr: true,
    app: {
        head: {
            meta: [{ name: 'theme-color', content: '#0e0b1f' }],
        },
    },
    css: ['@/assets/css/main.css'],
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
        '@nuxt/fonts',
        '@nuxt/image',
        '@vite-pwa/nuxt',
        'nuxt-mongoose',
        'nuxt-auth-utils',
        'nuxt-mail',
        '@nuxtjs/turnstile',
        '@tresjs/nuxt',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
        plugins: [
            tailwindcss(),
            svgLoader({
                svgoConfig: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    cleanupIds: { remove: false },
                                    removeViewBox: false,
                                    removeUselessDefs: false,
                                },
                            },
                        },
                    ],
                },
            }),
        ],
    },

    pwa: {
        manifest: {
            theme_color: '#0e0b1f',
            display: 'standalone',
            start_url: '/',
            icons: [
                {
                    src: 'pwa-64x64.png',
                    sizes: '64x64',
                    type: 'image/png',
                },
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: 'maskable-icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
            ],
        },
    },
});