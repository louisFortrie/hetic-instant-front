<template>
	<div class="container">
		<button
			class="addButton button primary"
			@click="handleAddButtonClicked"
			v-if="authenticated"
		></button>
		<nuxt-link class="loginButton button primary" to="/login" v-else
			><img src="/images/account.svg" alt=""
		/></nuxt-link>
		<button
			class="logoutButton button danger"
			@click="logout"
			v-if="authenticated"
		>
			<img src="/images/logout.svg" alt="" />
		</button>
	</div>
</template>
<script lang="ts" setup>
const store = useStore();
const { authenticated } = storeToRefs(useStore());

const logout = () => {
	store.logout();
};

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
	z-index: 1;
}

.button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 4rem;
	height: 4rem;
	border: none;
	border-radius: 50%;
	position: absolute;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	cursor: pointer;
	img {
		width: 2rem;
		height: 2rem;
		filter: invert(1);
	}
	&.primary {
		background-color: #97bbfb;
	}

	&.danger {
		background-color: #ff5757;
	}
}

.addButton {
	bottom: 1.5rem;
	left: 1.5rem;
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
.loginButton {
	bottom: 1.5rem;
	left: 1.5rem;
}

.logoutButton {
	bottom: 1.5rem;
	right: 1.5rem;
}
</style>
