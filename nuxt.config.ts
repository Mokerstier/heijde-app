import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    compatibilityDate: '2024-04-03',
    components: [
        {
            path: '@/components',
            pathPrefix: false,
        },
    ],
    turnstile: { siteKey: process.env.CLOUDFLARE_KEY },
    runtimeConfig: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        mail: {
            message: {
                to: process.env.MAIL_PERSONAL,
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
                secretKey: process.env.CLOUDFLARE_SECRET,
            },
        },
    },
    mongoose: {
        uri: process.env.NUXT_MONGOOSE_URI,
        options: {},
        devtools: true,
    },
    ssr: true,
    css: ['@/assets/scss/main.scss'],
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxt/image',
        '@vite-pwa/nuxt',
        'nuxt-mongoose',
        'nuxt-auth-utils',
        'nuxt-vercel-analytics',
        'nuxt-mail',
        '@nuxtjs/turnstile',
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
            theme_color: '#282c33',
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
