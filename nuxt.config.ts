import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: '/heijde-app/',
        buildAssetsDir: 'assets',
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    compatibilityDate: '2024-04-03',
    components: [
        {
            path: '@/components',
            pathPrefix: false,
        },
    ],
    runtimeConfig: {
        GITHUB_TOKEN: process.env.NUXT_GITHUB_TOKEN,
    },
    mongoose:{
        uri: process.env.NUXT_MONGOOSE_URI,
        options: { 
        },
        devtools: true,
    },
    ssr: true,
    css: ['@/assets/scss/main.scss'],
    devtools: { enabled: true },
    modules: ['nuxt-mongoose', '@nuxtjs/tailwindcss', '@nuxt/image', '@vite-pwa/nuxt'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
        plugins: [svgLoader()],
    },
    pwa: {
        manifest: {
            display: 'standalone',
            start_url: '/heijde-app/',
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
