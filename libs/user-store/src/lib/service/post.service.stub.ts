import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class PostServiceStub {
  public comments$ = of({ state: 'empty', comments: [] });

  public getPosts() {}

  public loadPostComments() {}

  public clearComments() {}
}
