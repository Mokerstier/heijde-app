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
	modules: ["nuxt-mongoose", "@nuxtjs/tailwindcss", "@nuxt/image"],
    
	mongoose: {
		uri: process.env.NUXT_MONGOOSE_URI,
		options: {},
		modelsDir: "models",
		devtools: true,
	},
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
