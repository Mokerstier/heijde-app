import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        environmentOptions: {
            nuxt: {
                overrides: {
                    modules: { ogImage: { enabled: false } },
                },
            },
        },
        include: ['src/**/*.test.ts'],
        coverage: {
            reportsDirectory: '../.coverage',
        },
    },
});
