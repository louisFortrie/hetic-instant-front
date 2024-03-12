import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    likedPosts: [] as string[],
  }),
  actions: {
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
  },
});
