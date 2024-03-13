export default defineNuxtRouteMiddleware((to, from) => {
	if (process.client) {
		const { authenticated, accessToken, refreshToken } = storeToRefs(
			useStore()
		);

		if (accessToken.value && refreshToken.value) {
			authenticated.value = true;
		}
		console.log(to.name, accessToken.value);

		// if (
		// 	(accessToken.value && to.name === "login") ||
		// 	(accessToken.value && to.name === "register")
		// ) {
		// 	return navigateTo("/");
		// }
		// if (!authenticated.value && to.name === "dashboard") {
		// 	console.log(accessToken.value, "oui");

		// 	return navigateTo("/login");
		// }
	}
});
