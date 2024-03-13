<template>
  <div>
    <slot />
    <Footer v-if="authenticated"></Footer>
  </div>
</template>

<script lang="ts" setup>
const { authenticated } = storeToRefs(useStore());
</script>
