<template>
  <div>
    <slot />
    <Footer></Footer>
  </div>
</template>

<script lang="ts" setup>
const { authenticated } = storeToRefs(useStore());
</script>
