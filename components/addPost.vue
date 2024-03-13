<template>
  <div :class="{ container: true, active: addPostOpen }">
    <button class="close" @click="close">
      <img src="/images/cross.svg" alt="close btn" />
    </button>
    <input
      id="file"
      type="file"
      placeholder="Upload a file"
      @input="handleFileInput"
      class="addInput"
    />
    <label class="wrapper" ref="inputLabel" for="file">Post Your Image +</label>
    <button @click="addPost">Add Post</button>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  isActive: boolean;
}>();

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

const runtimeConfig = useRuntimeConfig();
const store = useStore();
const addPost = async () => {
  const apiUrl = runtimeConfig.public.API_URL;
  const formData = new FormData();
  formData.append("file", fileInput.value as File);
  formData.append("data", JSON.stringify(store.userId));
  try {
    await $fetch(`${apiUrl}/posts`, {
      method: "POST",
      body: formData,
    });
    inputLabel.value!.innerHTML = "Post Your Image +";
  } catch (e: any) {
    throw new Error(e);
  }
};

const close = () => {
  store.toggleAddPost();
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
  background: #ccccccb6;
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
</style>
