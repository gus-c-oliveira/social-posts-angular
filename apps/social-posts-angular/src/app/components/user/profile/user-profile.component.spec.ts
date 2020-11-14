import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockPostList, mockUserList } from '@app/mocks';
import {
  AppState,
  COMMENT_STATE_KEY,
  initialCommentState,
  LoadPosts,
  POST_STATE_KEY,
  PostState,
  USER_STATE_KEY,
  UserState,
} from '@app/store';
import { errorSelector, spinnerSelector } from '@app/ui';
import {
  getAllElementsTextContentBySelector,
  getElementBySelector,
  getElementTextContentBySelector,
} from '@gus/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

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
  const initialState = {
    [userKey]: { ...userStoreState },
    [postKey]: { ...postStoreState },
    [commentKey]: { ...commentStoreState },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
      ],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
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
      const profilePicture = getElementBySelector(fixture, '.banner__picture');
      expect(profilePicture.src).toContain(selectedUser.pictureURL);
    });

    it(`should display the user's username`, () => {
      const username = getElementTextContentBySelector(
        fixture,
        '.banner__username'
      );
      expect(username).toEqual(selectedUser.username);
    });
  });

  describe('general', () => {
    it(`should display the user's name, phone, website and email`, () => {
      const generalSectionValues = getAllElementsTextContentBySelector(
        fixture,
        '.general__value'
      );
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
      const addressSectionValues = getAllElementsTextContentBySelector(
        fixture,
        '.address__value'
      );
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

  describe('company', () => {
    it(`should display the user company's name, catchphrase and bs`, () => {
      const companySectionValues = getAllElementsTextContentBySelector(
        fixture,
        '.company__info-value'
      );
      // Order should be name, catchphrase and bs.
      const name = companySectionValues[0];
      const catchphrase = companySectionValues[1];
      const bs = companySectionValues[2];
      expect(name).toEqual(selectedUser.company.name);
      expect(catchphrase).toEqual(`“${selectedUser.company.catchPhrase}”`);
      expect(bs).toEqual(selectedUser.company.bs);
    });
  });

  it(`should display the spinner while the user's posts are loading`, () => {
    store$.setState({
      [postKey]: { ...postStoreState, loading: true },
    });
    fixture.detectChanges();
    const spinner = getElementBySelector(fixture, spinnerSelector);
    expect(spinner).toBeTruthy();
  });

  it('should display the error component if posts fail to load', () => {
    store$.setState({
      [postKey]: { ...postStoreState, error: true },
    });
    fixture.detectChanges();
    const error = getElementBySelector(fixture, errorSelector);
    expect(error).toBeTruthy();
  });

  it(`should retry loading the user posts
      when clicking the error button`, () => {
    spyOn(store$, 'dispatch');
    store$.setState({
      ...initialState,
      [postKey]: { ...postStoreState, error: true },
    });
    fixture.detectChanges();
    getElementBySelector(fixture, '.error__button').click();
    expect(store$.dispatch).toHaveBeenCalledWith(
      new LoadPosts(selectedUser.id)
    );
  });

  it(`should display the user's posts`, () => {
    const posts = getAllElementsTextContentBySelector(fixture, '.post');
    const expected = mockPostList.map((post) => post.title);
    expect(posts).toEqual(expected);
  });

  it(`should create an overlay to display post
      after clicking a user's post`, () => {
    getElementBySelector(fixture, '.post').click();
    fixture.detectChanges();
    const post = component.overlayRef.overlayElement.querySelector(
      userPostSelector
    );
    expect(post).toBeTruthy();
  });
});
