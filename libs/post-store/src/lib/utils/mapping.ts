import { Dictionary } from '@ngrx/entity';

import { Post } from '../model/index';

export const mapPostsToEntities = (posts: Post[]): Dictionary<Post> => {
  const entities: { [id: number]: Post } = {};
  posts.forEach((post) => (entities[post.id] = post));
  return entities;
};

export const mapEntitiesToPosts = (entities: {
  [id: number]: Post;
}): Post[] => {
  const posts: Post[] = [];
  Object.keys(entities).forEach((id) => posts.push(entities[id]));
  return posts;
};
