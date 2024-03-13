<template>
  <div class="wrapper">
    <div class="container banner"></div>

    <div class="container">
      <p class="logo">L'instant.</p>
      <h1>Welcome Back !</h1>
      <p class="errorMessage" v-if="errorMessage !== ''">{{ errorMessage }}</p>

      <Input
        type="email"
        label="Email"
        placeholder="john@example.com"
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
      <!-- <input class="input" v-model="email" type="email" placeholder="Email" />
		<input
        class="input"
        v-model="password"
        type="password"
        placeholder="Password"
		/> -->
      <button class="btn primary" @click="login">Login</button>
      <NuxtLink to="/register">Create Account</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const store = useStore();

const email = ref("");
const password = ref("");

const runtime = useRuntimeConfig();

const handleEmailInput = (value) => {
  email.value = value;
};

const handlePasswordInput = (value) => {
  password.value = value;
};

const errorMessage = ref("");
const { authenticated } = storeToRefs(useStore());
const login = async () => {
  const apiUrl = runtime.public.API_URL;
  if (email.value && password.value) {
    const user = await store.authenticateUser(
      email.value,
      password.value,
      apiUrl
    );
    console.log(user);
    if (user.status === 401) {
      errorMessage.value = "Invalid credentials";
    }
  }

  if (authenticated.value) {
    navigateTo("/");
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  //   height: fit-content;
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

.errorMessage {
  color: red;
  margin-bottom: 1rem;
}
.logo {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
}
.input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
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
}
</style>
