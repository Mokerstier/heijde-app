import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated, redirectedFrom } = storeToRefs(useAuthStore()); // make authenticated state reactive
    redirectedFrom.value = to?.fullPath; // set the redirectedFrom state to the previous route
    console.log('WTF!!! :', from?.fullPath, to);
    const token = useCookie('token'); // get token from cookies
    console.log(token);
    if (token.value) {
        // check if value exists
        authenticated.value = true; // update the state to authenticated
    }

    // if token exists and url is /login redirect to homepage

    if (token.value && to?.name === 'login') {
        console.log('HERE?');
        return navigateTo(redirectedFrom.value || '/');
    }

    // if token doesn't exist redirect to log in

    if (!token.value && to?.name !== 'login') {
        abortNavigation();

        return navigateTo('/login');
    }
});
