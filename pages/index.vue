<template>
  <NuxtLayout>
    <div class="container">
      <div v-for="post in posts" :key="post.id">
        <Card :post="post" />
      </div>
      <AddPost :is-active="isActive" />
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup>
const posts = ref<Post[]>([]);

const runtimeConfig = useRuntimeConfig();

const isActive = ref(false);

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
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
