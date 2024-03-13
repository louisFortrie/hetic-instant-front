<template>
  <div class="wrapper">
    <div class="container banner"></div>
    <div class="container">
      <p class="logo">L'instant.</p>
      <h1>Register</h1>
      <p class="error-message" v-if="errorMessage !== ''">{{ errorMessage }}</p>
      <span v-if="!isValidEmail" class="error-message">Invalid Email</span>
      <span v-if="!isPasswordMatch" class="error-message"
        >Passwords dont match</span
      >
      <span v-if="!isValidPassword" class="error-message">
        The password must be at least 6 characters long
      </span>
      <Input
        label="Username"
        placeholder="Username"
        :error-message="errorMessage"
        @input="handleUserNameInput"
      />
      <Input
        label="Email"
        placeholder="Email"
        :error-message="errorMessage"
        @input="handleEmailInput"
      />
      <Input
        type="password"
        label="Password"
        placeholder="password"
        :error-message="errorMessage"
        @input="handlePasswordInput"
      />
      <Input
        type="password"
        label="Confirm Password"
        placeholder="Confirm Password"
        :error-message="errorMessage"
        @input="handleConfirmPasswordInput"
      />
      <button
        @click="register"
        :disabled="!isValidForm"
        :class="{ btn: true, primary: true, disabled: !isValidForm }"
      >
        Register
      </button>
      <NuxtLink to="/login">Already got an account ?</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  //height: fit-content;
}
.error {
  border: 1px solid red;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
}

.logo {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.container {
  margin-top: -4rem;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  h1 {
    color: #0f7cf1;
    margin-bottom: 20px;
  }
  &.banner {
    margin-top: 0;
    width: 60%;
    background: url("/images/joy.jpg") no-repeat center center;
  }
}

.btn {
  font-size: 1rem;
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  margin-bottom: 1rem;
  cursor: pointer;
  &.primary {
    background-color: #0f7cf1;
    color: white;
  }
  &.disabled {
    background-color: #64afff;
    color: white;
    cursor: not-allowed;
  }
}
</style>

<script setup>
import { ref, computed } from "vue";
const store = useStore();

const email = ref("example@example.com");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const handleEmailInput = (value) => {
  email.value = value;
};

const handlePasswordInput = (value) => {
  password.value = value;
};

const handleConfirmPasswordInput = (value) => {
  confirmPassword.value = value;
};

const handleUserNameInput = (value) => {
  username.value = value;
};

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.value.match(emailRegex);
});

const isValidPassword = computed(() => {
  return password.value.length > 5;
});

const isPasswordMatch = computed(() => {
  return password.value === confirmPassword.value;
});

const isValidForm = computed(() => {
  return (
    isValidEmail.value &&
    isPasswordMatch.value &&
    password.value.length > 0 &&
    confirmPassword.value.length > 0 &&
    email.value.length > 0 &&
    username.value.length > 0
  );
});

const runtime = useRuntimeConfig();

const register = async () => {
  const apiUrl = runtime.public.API_URL;
  if (isValidForm.value) {
    const user = await store.registerUser(
      username.value,
      email.value,
      password.value,
      apiUrl
    );
    console.log(user);
    if (user.status === 401) {
      errorMessage.value = "User already exists with this email";
      return;
    }
    navigateTo("/");
  } else {
    console.log("Erreur");
    errorMessage.value = isValidEmail.value
      ? "Email invalide"
      : "Les mots de passe ne correspondent pas";
  }
};
</script>
