import { defineStore } from "pinia";

interface UserPayload {
	email: string;
	password: string;
}

export const useStore = defineStore({
	id: "store",
	state: () => ({
		addPostOpen: false,
		likedPosts: [] as string[],
		accessToken: null as string | null,
		refreshToken: null as string | null,
		authenticated: false,
		userId: null as string | null,
	}),
	actions: {
		toggleAddPost() {
			this.addPostOpen = !this.addPostOpen;
		},
		async authenticateUser(email: string, password: string, apiUrl: string) {
			console.log("apiUrl", apiUrl);
			const user = { user: { email, password } };
			try {
				const data: any = await $fetch(`${apiUrl}/auth/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user),
				});
				console.log("data", data);

				if (data.accessToken) {
					this.userId = data.userId;
					this.accessToken = data.accessToken;
					this.refreshToken = data.refreshToken;
					this.authenticated = true;
					window.sessionStorage.setItem("userId", data.userId);
					window.sessionStorage.setItem("accessToken", data.accessToken);
					window.sessionStorage.setItem("refreshToken", data.refreshToken);
				}
				return data;
			} catch (e) {
				return e;
			}
		},
		async registerUser(
			username: string,
			email: string,
			password: string,
			apiUrl: string
		) {
			const user = { username, email, password };
			const data: any = await $fetch(`${apiUrl}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			if (data.accessToken) {
				this.userId = data.userId;
				this.accessToken = data.accessToken;
				this.refreshToken = data.refreshToken;
				this.authenticated = true;
				window.sessionStorage.setItem("userId", data.userId);
				window.sessionStorage.setItem("accessToken", data.accessToken);
				window.sessionStorage.setItem("refreshToken", data.refreshToken);
			}
			return data;
		},
		getTokens() {
			const accessToken = window.sessionStorage.getItem("accessToken");
			const refreshToken = window.sessionStorage.getItem("refreshToken");
			if (accessToken && refreshToken) {
				console.log("accessToken", accessToken);
				this.userId = window.sessionStorage.getItem("userId");
				this.accessToken = accessToken;
				this.refreshToken = refreshToken;
				this.authenticated = true;
			}
		},
		logout() {
			this.accessToken = null;
			this.refreshToken = null;
			this.authenticated = false;
			this.userId = null;
			window.sessionStorage.removeItem("userId");
			window.sessionStorage.removeItem("accessToken");
			window.sessionStorage.removeItem("refreshToken");
		},
		like(id: string) {
			this.likedPosts.push(id);
			window.localStorage.setItem(
				"likedPosts",
				JSON.stringify(this.likedPosts)
			);
		},
		isLiked(id: string) {
			return this.likedPosts.includes(id);
		},
		getLikedPosts() {
			const likedPosts = window.localStorage.getItem("likedPosts");
			this.likedPosts = likedPosts ? JSON.parse(likedPosts) : [];
			return;
		},
		setAccessToken(token: string) {
			this.accessToken = token;
		},
		setRefreshToken(token: string) {
			this.refreshToken = token;
		},
	},
});
