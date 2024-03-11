export {};

declare global {
  type Post = {
    id: string;
    imageName: string;
    url: string;
    likes: number;
  };
}
