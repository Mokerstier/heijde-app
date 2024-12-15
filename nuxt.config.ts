import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: '/heijde-app/',
        buildAssetsDir: 'assets',
        pageTransition: { name: 'page', mode: 'out-in' }
    } ,
	compatibilityDate: "2024-04-03",
	components: [
        {
            path: '@/components',
            pathPrefix: false,
        },
    ],
    runtimeConfig: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN
    },
    ssr: true,
	css: ['@/assets/scss/main.scss'],
	devtools: { enabled: true },
	modules: ["nuxt-mongoose", "@nuxtjs/tailwindcss", "@nuxt/image"],
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
});
