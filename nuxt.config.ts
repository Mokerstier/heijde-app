import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: '/heijde-app/',
        buildAssetsDir: 'assets'
    } ,
	compatibilityDate: "2024-04-03",
	components: [
        {
            path: '@/components',
            pathPrefix: false,
        },
    ],
	css: ['@/assets/scss/main.scss'],
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
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