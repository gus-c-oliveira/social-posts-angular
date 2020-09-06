import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { mockPostList, mockUserList } from '@app/mocks';
import {
  AppState,
  COMMENT_STATE_KEY,
  initialCommentState,
  POST_STATE_KEY,
  PostState,
  USER_STATE_KEY,
  UserState,
} from '@app/store';
import { spinnerSelector } from '@app/ui';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { userPostSelector } from '../post';
import { UserModule } from '../user.module';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let store$: MockStore<any>;
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
  const commentKey = COMMENT_STATE_KEY;
  const commentStoreState = initialCommentState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserModule, RouterTestingModule.withRoutes([])],
      providers: [
        provideMockStore({
          initialState: {
            [userKey]: { ...userStoreState },
            [postKey]: { ...postStoreState },
            [commentKey]: { ...commentStoreState },
          },
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    store$ = TestBed.inject(Store) as MockStore<AppState>;
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

  it(`should display the spinner while the user's posts are loading`, () => {
    store$.setState({
      [postKey]: { ...postStoreState, loading: true },
    });
    fixture.detectChanges();
    const spinner = fixture.debugElement
      .query(By.css(spinnerSelector))
      .nativeElement.textContent.trim();
    expect(spinner).toBeTruthy();
  });

  it('should display the error message if posts fail to load', () => {
    store$.setState({
      [postKey]: { ...postStoreState, error: true },
    });
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.error')).nativeElement;
    expect(error).toBeTruthy();
  });

  it(`should display the user's posts`, () => {
    const posts = fixture.debugElement
      .queryAll(By.css('.post'))
      .map((item) => item.nativeElement.textContent.trim());
    const expected = mockPostList.map((post) => `#${post.id}: ${post.title}`);
    expect(posts).toEqual(expected);
  });

  it(`should create an overlay to display post after clicking a user's post`, () => {
    fixture.debugElement.query(By.css('.post')).nativeElement.click();
    fixture.detectChanges();
    const post = component.overlayRef.overlayElement.querySelector(
      userPostSelector
    );
    expect(post).toBeTruthy();
  });
});
