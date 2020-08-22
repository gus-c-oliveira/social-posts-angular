import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockCommentList } from '@app/mocks';

import { APP_CONSTANTS } from '../../app.constants';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommentService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve an array of comments using a GET request', (done) => {
    const postId = 1;
    service.getComments(postId).subscribe((data) => {
      expect(data.length).toEqual(5);
      data.forEach((comment, index) => {
        expect(comment).toEqual(mockCommentList[index]);
      });
      done();
    });

    const req = http.expectOne(
      APP_CONSTANTS.baseURL + `comments?postId=${postId}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockCommentList);
  });

  afterEach(() => {
    http.verify();
  });
});
