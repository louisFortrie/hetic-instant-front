<template>
  <div class="card">
    <img :src="post.url" alt="" />
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

const handleLikeClicked = () => {
  if (store.isLiked(post.value.id)) return;

  post.value.likes++;
  store.like(post.value.id);
};

onMounted(() => {
  store.getLikedPosts();
});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem;
  width: 20rem;
  max-width: 100%;
  background-color: white;
  overflow: hidden;
  text-align: center;
}
.like {
  cursor: pointer;
  border: none;
  background: none;
  position: absolute;
  top: 10px;
  right: 10px;
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

.like.isLiked {
  color: white;
}
</style>
