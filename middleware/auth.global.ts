export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useStore());
  const { accessToken } = storeToRefs(useStore());
  const { refreshToken } = storeToRefs(useStore());

  if (accessToken.value && refreshToken.value) {
    authenticated.value = true;
  }

  if (accessToken.value && to.name === "login") {
    return navigateTo("/");
  }
  if (
    !accessToken.value &&
    to.name !== "login" &&
    to.name !== "index" &&
    to.name !== "register"
  ) {
    return navigateTo("/login");
  }
});
