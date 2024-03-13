<template>
	<div :class="{ container: true, active: addPostOpen }">
		<button class="close" @click="close">
			<img src="/images/cross.svg" alt="close btn" />
		</button>
		<div class="addContainer" v-if="fileInput">
			<Input
				class="titleInput"
				type="text"
				label="Post Title"
				placeholder="Post Title"
				@input="handlePostTitleChange"
			/>

			<button
				@click="addPost"
				:class="{ btn: true, primary: true, disabled: !fileInput }"
			>
				Add Post
			</button>
		</div>
		<input
			id="file"
			type="file"
			placeholder="Upload a file"
			@input="handleFileInput"
			class="addInput"
		/>
		<label class="wrapper" ref="inputLabel" for="file" v-if="!fileInput"
			>Post Your Image +</label
		>
	</div>
</template>
<script lang="ts" setup>
const props = defineProps<{
	isActive: boolean;
}>();

const emits = defineEmits(["upload"]);

const { addPostOpen } = storeToRefs(useStore());
const fileInput = ref<File | null>(null);
const inputLabel = ref<HTMLLabelElement | null>(null);
const handleFileInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	console.log(target, store.userId);

	const file = target.files?.[0];
	if (file) {
		fileInput.value = file;
		inputLabel.value!.innerHTML = file.name;
	}
};

const postTitle = ref("");

const handlePostTitleChange = (value: string) => {
	postTitle.value = value;
	console.log(postTitle.value);
};

const runtimeConfig = useRuntimeConfig();
const store = useStore();
const addPost = async () => {
	const apiUrl = runtimeConfig.public.API_URL;
	const formData = new FormData();
	const title = postTitle.value;
	const userId = store.userId;

	formData.append("file", fileInput.value as File);
	formData.append("data", JSON.stringify({ userId, title }));
	try {
		await $fetch(`${apiUrl}/posts`, {
			method: "POST",
			body: formData,
		});
		emits("upload");
		close();
	} catch (e: any) {
		throw new Error(e);
	}
};

const close = () => {
	fileInput.value = null;
	store.toggleAddPost();
	inputLabel.value!.innerHTML = "Post Your Image +";
};
</script>
<style lang="scss" scoped>
.addInput {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.addContainer {
	z-index: 3;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
}

// .titleInput {
// 	position: absolute;
// 	top: 47%;
// 	left: 50%;
// 	transform: translate(-50%, -50%);
// }

.wrapper {
	font-weight: bold;
	color: #0f7cf1;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	height: 90vh;
	width: 90vw;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 6px solid #75cfffad;
	border-radius: 1rem;
	z-index: 2;
}
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: #ebf1ffe3;
	z-index: 2;
	transform: translateY(100%);
	transition: transform 0.3s ease-in-out;
	&.active {
		transform: translateY(0);
	}
}
.close {
	position: absolute;
	top: 2rem;
	right: 2rem;
	background: none;
	border: none;
	cursor: pointer;
	img {
		filter: brightness(0) saturate(100%) invert(38%) sepia(31%) saturate(4512%)
			hue-rotate(195deg) brightness(96%) contrast(97%);
		width: 1.5rem;
	}
}

// .btn {
// 	z-index: 3;
// 	position: absolute;
// 	top: 50%;
// 	left: 50%;
// 	transform: translate(-50%, 50%);
// }
</style>
