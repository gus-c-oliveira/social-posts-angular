import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';

import { mockCommentList, mockPostList } from '../mocks/index';
import { SERVICE_BASE_URL } from '../token';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let http: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [PostService, { provide: SERVICE_BASE_URL, useValue: '/' }],
      });
    })
  );

  beforeEach(() => {
    service = TestBed.inject(PostService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('loadPosts', () => {
    it(`should initially emit state loading
        and an empty array of comments`, (done) => {
      const userId = 1;
      service.loadPosts(userId);
      service.posts$.pipe(take(1)).subscribe((reqData) => {
        expect(reqData.state).toEqual('loading');
        expect(reqData.data).toEqual([]);
        done();
      });

      const req = http.expectOne(`/posts?userId=${userId}`);
      req.flush([]);
    });

    it('should retrieve an array of posts using a GET request', (done) => {
      const userId = 1;
      service.loadPosts(userId);
      service.posts$.pipe(skip(1), take(1)).subscribe((reqData) => {
        expect(reqData.data.length).toEqual(10);
        reqData.data.forEach((post, index) => {
          expect(post).toEqual(mockPostList[index]);
        });
        done();
      });

      const req = http.expectOne(`/posts?userId=${userId}`);
      expect(req.request.method).toEqual('GET');

      req.flush(mockPostList);
    });
  });

  describe('loadPostComments', () => {
    it(`should initially emit state loading
        and an empty array of comments`, (done) => {
      const postId = 1;
      service.loadPostComments(postId);
      service.comments$.pipe(take(1)).subscribe((reqData) => {
        expect(reqData.state).toEqual('loading');
        expect(reqData.data).toEqual([]);
        done();
      });

      const req = http.expectOne(`/comments?postId=${postId}`);
      req.flush([]);
    });

    it('should retrieve an array of comments using a GET request', (done) => {
      const postId = 1;
      service.loadPostComments(postId);
      service.comments$.pipe(skip(1), take(1)).subscribe((reqData) => {
        expect(reqData.state).toEqual('loaded');
        reqData.data.forEach((comment, index) => {
          expect(comment).toEqual(mockCommentList[index]);
        });
        done();
      });

      const req = http.expectOne(`/comments?postId=${postId}`);
      expect(req.request.method).toEqual('GET');

      req.flush(mockCommentList);
    });
  });

  describe('setSelectedPost', () => {
    it('should emit the selected post in observable', (done) => {
      const userId = 1;
      service.loadPosts(userId);
      const selectedPostId = 2;
      service.posts$.pipe(skip(1), take(1)).subscribe(() => {
        service.setSelectedPost(selectedPostId);
        service.selectedPost$.pipe(take(1)).subscribe((selected) => {
          expect(selected.id).toEqual(selectedPostId);
          done();
        });
      });

      const req = http.expectOne(`/posts?userId=${userId}`);
      expect(req.request.method).toEqual('GET');

      req.flush(mockPostList);
    });
  });

  describe('clearSelectedPost', () => {
    it('should emit null in seleted post observable', (done) => {
      service.clearSelectedPost();
      service.selectedPost$.pipe(take(1)).subscribe((selected) => {
        expect(selected).toEqual(null);
        done();
      });
    });
  });

  describe('clearPosts', () => {
    it('should emit an empty array of posts', (done) => {
      service.clearPosts();
      service.posts$.pipe(take(1)).subscribe((reqData) => {
        expect(reqData.state).toEqual('empty');
        expect(reqData.data).toEqual([]);
        done();
      });
    });
  });

  describe('clearComments', () => {
    it('should emit an empty array of comments', (done) => {
      service.clearComments();
      service.comments$.pipe(take(1)).subscribe((reqData) => {
        expect(reqData.state).toEqual('empty');
        expect(reqData.data).toEqual([]);
        done();
      });
    });
  });

  afterEach(() => {
    http.verify();
  });
});
