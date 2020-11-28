import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { USER_SERVICE_BASE_URL } from '../token';
import { mockUserList } from '../mocks/index';

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: USER_SERVICE_BASE_URL, useValue: '/' },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should retrieve an array of users using a GET request', (done) => {
      service.getUsers().subscribe((data) => {
        expect(data.length).toEqual(2);
        data.forEach((user, index) => {
          expect(user).toEqual(mockUserList[index]);
        });
        done();
      });

      const req = http.expectOne('/users');
      expect(req.request.method).toEqual('GET');

      req.flush(mockUserList);
    });
  });

  afterEach(() => {
    http.verify();
  });
});
