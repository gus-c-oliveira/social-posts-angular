import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockPostList } from '@app/mocks';

import { APP_CONSTANTS } from '../../app.constants';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve an array of posts using a GET request', (done) => {
    service.getPosts(1).subscribe((data) => {
      expect(data.length).toEqual(10);
      data.forEach((post, index) => {
        expect(post).toEqual(mockPostList[index]);
      });
      done();
    });

    const req = http.expectOne(APP_CONSTANTS.baseURL + 'posts?userId=1');
    expect(req.request.method).toEqual('GET');

    req.flush(mockPostList);
  });

  afterEach(() => {
    http.verify();
  });
});
