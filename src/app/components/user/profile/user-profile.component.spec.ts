import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mockPostList, mockUserList } from '@app/mocks';
import {
  POST_STATE_KEY,
  PostState,
  USER_STATE_KEY,
  UserState,
} from '@app/store';
import { provideMockStore } from '@ngrx/store/testing';

import { USER_POST_PATH } from '../post';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  const selectedUser = { ...mockUserList[0] };
  const userKey = USER_STATE_KEY;
  const userStoreState: UserState = {
    loading: false,
    users: mockUserList,
    error: false,
    selectedUserID: selectedUser.id,
  };
  const postKey = POST_STATE_KEY;
  const postStoreState: PostState = {
    loading: false,
    posts: mockPostList,
    error: false,
    selectedPostID: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [UserProfileComponent],
      providers: [
        provideMockStore({
          initialState: {
            [userKey]: { ...userStoreState },
            [postKey]: { ...postStoreState },
          },
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display the selected user's info`, () => {
    const generalInfo = fixture.debugElement
      .queryAll(By.css('.general span'))
      .reduce(
        (acc, curr) =>
          acc.concat(curr.nativeElement.textContent.trim().split(': ')),
        []
      );
    const addressInfo = fixture.debugElement
      .queryAll(By.css('.address span'))
      .reduce(
        (acc, curr) =>
          acc.concat(curr.nativeElement.textContent.trim().split(': ')),
        []
      );
    const companyInfo = fixture.debugElement
      .queryAll(By.css('.company span'))
      .reduce(
        (acc, curr) =>
          acc.concat(curr.nativeElement.textContent.trim().split(': ')),
        []
      );
    const expectedUserInfo = [];
    for (const k in selectedUser) {
      if (typeof selectedUser[k] === 'string') {
        expectedUserInfo.push(selectedUser[k]);
      } else {
        for (const j in selectedUser[k]) {
          if (typeof selectedUser[k][j] === 'string') {
            expectedUserInfo.push(selectedUser[k][j]);
          }
        }
      }
    }
    const displayedUserInfo = []
      .concat(generalInfo)
      .concat(addressInfo)
      .concat(companyInfo);
    expectedUserInfo.forEach((info) => {
      expect(displayedUserInfo.indexOf(info)).toBeGreaterThan(-1);
    });
  });

  it(`should display the user's posts`, () => {
    const posts = fixture.debugElement
      .queryAll(By.css('.post'))
      .map((item) => item.nativeElement.textContent.trim());
    const expected = mockPostList.map((post) => `#${post.id}: ${post.title}`);
    expect(posts).toEqual(expected);
  });

  it(`should navigate to user post after clicking a user's post`, () => {
    const router: Router = TestBed.inject(Router);
    const route: ActivatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(router, 'navigate');
    fixture.debugElement.query(By.css('.post')).nativeElement.click();
    expect(router.navigate).toHaveBeenCalledWith([USER_POST_PATH], {
      relativeTo: route.parent,
    });
  });
});
