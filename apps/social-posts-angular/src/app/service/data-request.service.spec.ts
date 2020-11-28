import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataRequestService } from './data-request.service';
import { APP_CONSTANTS } from '../app.constants';
import { mockCommentList } from '@app/mocks';

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
