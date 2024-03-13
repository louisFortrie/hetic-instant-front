<template>
  <div class="inputContainer">
    <label>{{ label }}</label>
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      @input="handleInput"
      :class="{ error: errorMessage !== '' }"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Input Label",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "Enter text...",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["input"]);

const inputValue = ref();

const handleInput = (event) => {
  inputValue.value = event.target.value;
  emits("input", inputValue.value);
};
</script>

<style lang="scss" scoped>
.inputContainer {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  input {
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    &.error {
      outline: 2px solid red;
      border-color: transparent;
    }
    &:focus {
      outline: 2px solid #4d90fe;
      border-color: transparent;
    }
  }
  .errorMessage {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
}
</style>
