import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { mockCommentList } from '../mocks/index';
import { COMMENT_SERVICE_BASE_URL } from '../token';

describe('CommentService', () => {
  let service: CommentService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CommentService,
        { provide: COMMENT_SERVICE_BASE_URL, useValue: '/' },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CommentService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getComments', () => {
    it('should retrieve an array of comments using a GET request', (done) => {
      const postId = 1;
      service.getComments(postId).subscribe((data) => {
        expect(data.length).toEqual(5);
        data.forEach((comment, index) => {
          expect(comment).toEqual(mockCommentList[index]);
        });
        done();
      });

      const req = http.expectOne(`/comments?postId=${postId}`);
      expect(req.request.method).toEqual('GET');

      req.flush(mockCommentList);
    });
  });

  afterEach(() => {
    http.verify();
  });
});
