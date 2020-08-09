import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { APP_CONSTANTS } from '../app.constants';
import { mockUserList } from './user.mock';

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve an array of users using a GET request', (done) => {
    service.getUsers().subscribe((data) => {
      expect(data.length).toEqual(2);
      data.forEach((user, index) => {
        expect(user).toEqual(mockUserList[index]);
      });
      done();
    });

    const req = http.expectOne(APP_CONSTANTS.baseURL + 'users');
    expect(req.request.method).toEqual('GET');

    req.flush(mockUserList);
  });

  afterEach(() => {
    http.verify();
  });
});
