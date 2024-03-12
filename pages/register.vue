<template>
	<div>
		<input
			v-model="email"
			type="email"
			placeholder="Email"
			:class="{ error: !isValidEmail }"
		/>
		<span v-if="!isValidEmail" class="error-message">Email invalide</span>
		<input v-model="password" type="password" placeholder="Password" />
		<input
			v-model="confirmPassword"
			type="password"
			placeholder="Confirm Password"
			:class="{ error: !isPasswordMatch }"
		/>
		<span v-if="!isPasswordMatch" class="error-message"
			>Les mots de passe ne correspondent pas</span
		>
		<button @click="register" :disabled="!isValidForm">Register</button>
	</div>
</template>

<style>
.error {
	border: 1px solid red;
}

.error-message {
	color: red;
}
</style>

<script setup>
import { ref, computed } from "vue";

const email = ref("example@example.com");
const password = ref("");
const confirmPassword = ref("");

const isValidEmail = computed(() => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return email.value.match(emailRegex);
});

const isPasswordMatch = computed(() => {
	return password.value === confirmPassword.value;
});

const isValidForm = computed(() => {
	return isValidEmail.value && isPasswordMatch.value;
});

const register = () => {
	if (isValidForm.value) {
		// Logique d'enregistrement ici
	} else {
		alert("Veuillez remplir correctement le formulaire.");
	}
};
</script>
