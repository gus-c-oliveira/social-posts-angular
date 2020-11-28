import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataRequestService } from './data-request.service';
import { APP_CONSTANTS } from '../app.constants';
import { mockPostList, mockCommentList } from '@app/mocks';

describe('DataRequestService', () => {
  let service: DataRequestService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataRequestService],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(DataRequestService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getPosts', () => {
    it('should retrieve an array of posts using a GET request', (done) => {
      const userId = 1;
      service.getPosts(userId).subscribe((data) => {
        expect(data.length).toEqual(10);
        data.forEach((post, index) => {
          expect(post).toEqual(mockPostList[index]);
        });
        done();
      });

      const req = http.expectOne(
        APP_CONSTANTS.baseURL + `posts?userId=${userId}`
      );
      expect(req.request.method).toEqual('GET');

      req.flush(mockPostList);
    });
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

      const req = http.expectOne(
        APP_CONSTANTS.baseURL + `comments?postId=${postId}`
      );
      expect(req.request.method).toEqual('GET');

      req.flush(mockCommentList);
    });
  });

  afterEach(() => {
    http.verify();
  });
});
