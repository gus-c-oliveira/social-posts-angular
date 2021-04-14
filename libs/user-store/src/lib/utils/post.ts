import { Post } from '../model';

export const addImageToPost = (posts: Post[]): Post[] => {
  return posts.map((post) => ({
    ...post,
    img: `https://picsum.photos/seed/${post.id}/500`,
  }));
};
