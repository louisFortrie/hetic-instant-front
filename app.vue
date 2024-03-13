<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet"
  />
  <NuxtPage />
</template>
<script lang="ts" setup>
const store = useStore();
const { authenticated } = storeToRefs(useStore());
onMounted(() => {
  store.getTokens();
  if (authenticated.value) {
    navigateTo("/");
  }
});
</script>
<style lang="scss">
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
}
</style>
