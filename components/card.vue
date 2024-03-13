<template>
	<h3 style="margin-top: 1rem">{{ post.title || "Null" }}</h3>
	<div
		class="card"
		v-bind:style="{ backgroundImage: 'url(' + post.url + ')' }"
		@click="handleCardClick"
	>
		<button class="button share-btn">
			<img src="/images/share.svg" alt="" @click="shareImage" />
		</button>
		<button class="button download-btn" @click="downloadImage">
			<img src="/images/download.svg" alt="" />
		</button>
		<button
			:class="{ like: true, isLiked: store.isLiked(post.id) }"
			@click="handleLikeClicked"
		>
			<p class="like-text">{{ post.likes }}</p>
			<img
				:src="
					store.isLiked(post.id)
						? '/images/filled-heart.svg'
						: '/images/hollow-heart.svg'
				"
				alt="like button"
				class="heart"
			/>
		</button>
	</div>
</template>

<script lang="ts" setup>
import { useStore } from "~/stores/default";

const props = defineProps<{
	post: Post;
}>();

const post = toRef(props, "post");

const store = useStore();
const runtimeConfig = useRuntimeConfig();
const addLike = async (postId: string) => {
	const apiUrl = runtimeConfig.public.API_URL;

	try {
		await fetch(`${apiUrl}/posts/${postId}/like`, {
			method: "POST",
		});
	} catch (e: any) {
		throw new Error(e);
	}
};

const handleCardClick = (event: MouseEvent) => {
	if (!(event.target as HTMLElement).classList.contains("card")) return;
	console.log("Card clicked");
};

const handleLikeClicked = async () => {
	if (store.isLiked(post.value.id)) return;

	post.value.likes++;
	store.like(post.value.id);
	await addLike(post.value.id);
};

const downloadImage = () => {
	fetch(post.value.url, { mode: "cors" })
		.then((response) => response.blob())
		.then((blob) => {
			// Créer un objet URL pour le blob
			var url = window.URL.createObjectURL(new Blob([blob]));

			// Créer un lien temporaire pour le téléchargement
			var lien = document.createElement("a");
			lien.href = url;
			lien.download = "image.jpg";

			// Simuler un clic sur le lien pour déclencher le téléchargement
			document.body.appendChild(lien);
			lien.click();

			// Nettoyer après le téléchargement
			window.URL.revokeObjectURL(url);
			document.body.removeChild(lien);
		})
		.catch((error) => console.error("Une erreur est survenue :", error));
};

const shareImage = () => {
	if (navigator.share) {
		navigator
			.share({
				title: "L'instant",
				text: "Regardez cette image!",
				url: post.value.url,
			})
			.then(() => console.log("Partage réussi"))
			.catch((error) => console.error("Erreur lors du partage", error));
	} else {
		console.log("L'API Web Share n'est pas disponible sur ce navigateur.");
	}
};

onMounted(() => {
	store.getLikedPosts();
});
</script>

<style lang="scss" scoped>
.card {
	cursor: pointer;
	position: relative;
	border-radius: 16px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	margin: 1rem;
	aspect-ratio: 1.5/1;
	width: 20rem;
	max-width: 100%;
	background-color: white;
	overflow: hidden;
	text-align: center;
	display: flex;
	align-items: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
.like {
	transition: opacity 0.3s ease-in-out;
	opacity: 0.8;
	color: white;
	cursor: pointer;
	border: none;
	background: none;
	position: absolute;
	top: 10px;
	right: 10px;
	&:hover {
		opacity: 1;
	}
	.like-text {
		position: absolute;
		z-index: 1;
		font-size: 0.7rem;
		top: 46%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin: 0;
	}
	.heart {
		width: 2rem;
		height: 2rem;
		filter: invert(32%) sepia(93%) saturate(6231%) hue-rotate(352deg)
			brightness(98%) contrast(130%);
	}
}
.button {
	position: absolute;
	z-index: 1;
	width: 2rem;
	height: auto;
	background: none;
	border: none;
	filter: invert(1);
	mix-blend-mode: difference;
	cursor: pointer;
	img {
		width: 100%;
		height: auto;
	}
}

.share-btn {
	bottom: 10px;
	left: 10px;
	width: 1.8rem;
}
.download-btn {
	top: 10px;
	left: 10px;
}
</style>
