import { Comment } from '../model';

export const mapEntitiesToComments = (entities: {
  [id: number]: Comment;
}): Comment[] => {
  const comments: Comment[] = [];
  Object.keys(entities).forEach((id) => comments.push(entities[id]));
  return comments;
};

export const mapCommentsToEntities = (
  comments: Comment[]
): { [id: number]: Comment } => {
  const entities: { [id: number]: Comment } = {};
  comments.forEach((comment) => (entities[comment.id] = comment));
  return entities;
};
