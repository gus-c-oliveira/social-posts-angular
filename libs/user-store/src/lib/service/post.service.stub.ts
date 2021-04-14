import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { emptyRequestData, Post } from '../model';

@Injectable()
export class PostServiceStub {
  public selectedPost$ = new BehaviorSubject<Post>(null);
  public posts$ = of(emptyRequestData);
  public comments$ = of(emptyRequestData);

  public loadPosts() {}

  public loadPostComments() {}

  public setSelectedPost() {}

  public clearSelectedPost() {}

  public clearPosts() {}

  public clearComments() {}
}
