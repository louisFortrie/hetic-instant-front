<template>
  <h1>Hello world</h1>
  <div v-for="post in posts" :key="post.id">
    <Card :post="post" />
  </div>
</template>
<script lang="ts" setup>
const posts = ref<Post[]>([]);

const runtimeConfig = useRuntimeConfig();

const getAllPosts = async () => {
  const apiUrl = runtimeConfig.public.API_URL;
  console.log(apiUrl);

  const response = await fetch(`${apiUrl}/posts`);
  const data = await response.json();
  posts.value = data;

  console.log(data);
};

onMounted(async () => {
  await getAllPosts();
});
</script>
<style lang="scss" scoped></style>
