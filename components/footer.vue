<template>
  <div class="container">
    <button class="addButton" @click="handleAddButtonClicked"></button>
  </div>
</template>
<script lang="ts" setup>
const store = useStore();

const handleAddButtonClicked = () => {
  store.toggleAddPost();
  console.log("Add button clicked");
};
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background-color: #ebf1ff;
}
.addButton {
  width: 4rem;
  height: 4rem;
  background-color: #97bbfb;
  border: none;
  border-radius: 50%;
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.5rem;
    height: 0.2rem;
    background-color: white;
    transform: translate(-50%, -50%);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
}
</style>
