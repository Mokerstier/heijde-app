import { defineStore } from 'pinia';

export interface UserPayloadInterface {
    email: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        redirectedFrom: '',
    }),
    actions: {
        async authenticateUser(body: UserPayloadInterface) {
            // useFetch from nuxt 3
            const { data, pending }: any = await useFetch('/api/auth/login', {
                method: 'POST',
                body: body,
            });

            this.loading = pending;

            if (data.value) {
                this.authenticated = true; // set authenticated  state value to true
            }
        },
        logUserOut() {
            const token = useCookie('token'); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            token.value = null; // clear the token cookie
        },
    },
});
