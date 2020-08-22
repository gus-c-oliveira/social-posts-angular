import { Action } from '@ngrx/store';

import { Comment } from './comment.model';

export enum CommentActionTypes {
  LoadComments = '[Comment] Load Comments',
  LoadCommentsSuccess = '[Comment] Load Comments Success',
  LoadCommentsError = '[Comment] Load Comments Error',
}

export class LoadComments implements Action {
  public readonly type = CommentActionTypes.LoadComments;

  public constructor(public postId: number) {}
}

export class LoadCommentsSuccess implements Action {
  public readonly type = CommentActionTypes.LoadCommentsSuccess;

  public constructor(public comments: Comment[]) {}
}

export class LoadCommentsError implements Action {
  public readonly type = CommentActionTypes.LoadCommentsError;
}

export type CommentAction =
  | LoadComments
  | LoadCommentsSuccess
  | LoadCommentsError;