<template>
	<div class="wrapper">
		<div class="container">
			<h1>Welcome Back !</h1>
			<input class="input" v-model="email" type="email" placeholder="Email" />
			<input
				class="input"
				v-model="password"
				type="password"
				placeholder="Password"
			/>
			<button class="btn primary" @click="login">Login</button>
		</div>
		<div class="container banner"></div>
	</div>
</template>

<script setup>
const email = ref("");
const password = ref("");

const login = () => {
	// Logique de connexion ici
};
</script>
<style lang="scss" scoped>
.wrapper {
	display: flex;
	justify-content: space-between;
}
.container {
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	h1 {
		margin-bottom: 20px;
	}
	&.banner {
		width: 40%;
		background: url("/images/joy.jpg") no-repeat center center;
	}
}
.input {
	margin-bottom: 10px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	width: 300px;
}

.btn {
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	&.primary {
		background-color: #0f7cf1;
		color: white;
	}
}
</style>
