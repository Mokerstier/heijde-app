import { inject } from '@vercel/analytics';

// Replaces the nuxt-vercel-analytics module, whose old @nuxt/kit dependency chain carried
// most of the audit findings. The script tracks client-side route changes through the
// History API, so no router hook is needed.
export default defineNuxtPlugin(() => {
    inject({ mode: import.meta.dev ? 'development' : 'production' });
});
