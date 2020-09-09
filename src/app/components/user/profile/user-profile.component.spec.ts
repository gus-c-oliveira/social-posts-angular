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

  describe('banner', () => {
    it('should display the user profile picture', () => {
      const profilePicture = fixture.debugElement.query(
        By.css('.banner__picture')
      ).nativeElement;
      expect(profilePicture.src).toContain(selectedUser.pictureURL);
    });

    it(`should display the user's username`, () => {
      const username = fixture.debugElement
        .query(By.css('.banner__username'))
        .nativeElement.textContent.trim();
      expect(username).toEqual(selectedUser.username);
    });
  });

  describe('general', () => {
    it(`should display the user's name, phone, website and email`, () => {
      const generalSectionValues = fixture.debugElement
        .queryAll(By.css('.general__value'))
        .map((item) => item.nativeElement.textContent.trim());
      // Order should be name, phone, website and email.
      const name = generalSectionValues[0];
      const phone = generalSectionValues[1];
      const website = generalSectionValues[2];
      const email = generalSectionValues[3];
      expect(name).toEqual(selectedUser.name);
      expect(phone).toEqual(selectedUser.phone);
      expect(website).toEqual(selectedUser.website);
      expect(email).toEqual(selectedUser.email);
    });
  });

  describe('address', () => {
    it(`it should display the user's address street, suite, city, zipcode and geo`, () => {
      const addressSectionValues = fixture.debugElement
        .queryAll(By.css('.address__value'))
        .map((item) => item.nativeElement.textContent.trim());
      // Order should be street, suite, city, zipcode and email.
      const street = addressSectionValues[0];
      const suite = addressSectionValues[1];
      const city = addressSectionValues[2];
      const zipcode = addressSectionValues[3];
      const geo = addressSectionValues[4];
      expect(street).toEqual(selectedUser.address.street);
      expect(suite).toEqual(selectedUser.address.suite);
      expect(city).toEqual(selectedUser.address.city);
      expect(zipcode).toEqual(selectedUser.address.zipcode);
      expect(geo).toEqual(
        `${selectedUser.address.geo.lat} | ${selectedUser.address.geo.lng}`
      );
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
