import { Action } from '@ngrx/store';
import { Post } from './post.model';

export enum PostActionTypes {
  LoadPosts = '[Post] Load Posts',
  LoadPostsSuccess = '[Post] Load Posts Success',
  LoadPostsError = '[Post] Load Posts Error',
  SetSelectedPostID = '[Post] Set Selected Post ID',
}

export class LoadPosts implements Action {
  public readonly type = PostActionTypes.LoadPosts;
}

export class LoadPostsSuccess implements Action {
  public readonly type = PostActionTypes.LoadPostsSuccess;

  public constructor(public posts: Post[]) {}
}

export class LoadPostsError implements Action {
  public readonly type = PostActionTypes.LoadPostsError;
}

export class SetSelectedPostID implements Action {
  public readonly type = PostActionTypes.SetSelectedPostID;

  public constructor(public id: number) {}
}

export type PostAction =
  | LoadPosts
  | LoadPostsSuccess
  | LoadPostsError
  | SetSelectedPostID;
