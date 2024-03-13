export {};

declare global {
	type Post = {
		id: string;
		title: string;
		imageName: string;
		url: string;
		likes: number;
	};
}
