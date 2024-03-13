<template>
	<NuxtLayout>
		<div class="container">
			<div v-for="post in posts" :key="post.id" style="margin-bottom: 3rem">
				<Card :post="post" />
			</div>
			<AddPost :is-active="isActive" @upload="getAllPosts" />
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

const { accessToken } = storeToRefs(useStore());

onMounted(async () => {
	await getAllPosts();
	console.log(!accessToken.value, "accessToken");
});
</script>
<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
