import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  USER_STATE_KEY,
  UserState,
  mockUserList,
  USER_SERVICE_BASE_URL,
  addUserFriends,
  addUserPicture,
  mapUsersToEntities,
} from '@gus/user-store';
import {
  PostActions,
  POST_STATE_KEY,
  PostState,
  mockPostList,
  POST_SERVICE_BASE_URL,
  mapPostsToEntities,
} from '@gus/post-store';
import { errorSelector } from '@gus/ui';
import {
  getAllElementsByDataTest,
  getAllElementsTextContentByDataTest,
  getElementByDataTest,
  getElementTextContentByDataTest,
} from '@gus/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { userPostSelector } from '../post';
import { UserShellModule } from '../../user-shell.module';
import { UserProfileComponent } from './user-profile.component';
import { EffectsModule } from '@ngrx/effects';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let store$: MockStore<any>;
  const mockUsers = addUserFriends(addUserPicture(mockUserList));
  const selectedUser = { ...mockUsers[0] };
  const userKey = USER_STATE_KEY;
  const userStoreState: UserState = {
    loading: false,
    entities: mapUsersToEntities(mockUsers),
    error: false,
    selectedUserID: selectedUser.id,
    ids: mockUsers.map((user) => user.id),
  };
  const postKey = POST_STATE_KEY;
  const postStoreState: PostState = {
    loading: false,
    entities: mapPostsToEntities(mockPostList),
    error: false,
    selectedPostID: null,
    ids: mockPostList.map((post) => post.id),
  };
  const initialState = {
    [userKey]: { ...userStoreState },
    [postKey]: { ...postStoreState },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserShellModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        provideMockStore({
          initialState,
        }),
        { provide: POST_SERVICE_BASE_URL, useValue: '/' },
        { provide: USER_SERVICE_BASE_URL, useValue: '/' },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    store$ = TestBed.inject(Store) as MockStore<any>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cover', () => {
    it('should display the user profile picture', () => {
      const profilePicture = getElementByDataTest(fixture, 'cover-picture');
      expect(profilePicture.src).toContain(selectedUser.pictureURL);
    });

    it(`should display the user's username`, () => {
      const username = getElementTextContentByDataTest(fixture, 'username');
      expect(username).toEqual(selectedUser.username);
    });
  });

  describe('general', () => {
    it(`should display the user's name, phone, website and email`, () => {
      const generalSectionValues = getAllElementsTextContentByDataTest(
        fixture,
        'general-value'
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

  describe('friends', () => {
    it(`should display the user's friends`, () => {
      const friends = getAllElementsByDataTest(fixture, 'friend');
      expect(friends.length).toEqual(selectedUser.friendIDs.length);
    });
  });

  describe('address', () => {
    it(`should display the user's address street,
      suite, city, zipcode and geo`, () => {
      const addressSectionValues = getAllElementsTextContentByDataTest(
        fixture,
        'address-value'
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
      const companySectionValues = getAllElementsTextContentByDataTest(
        fixture,
        'company-value'
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
    const spinner = getElementByDataTest(fixture, 'loader');
    expect(spinner).toBeTruthy();
  });

  it('should display the error component if posts fail to load', () => {
    store$.setState({
      [postKey]: { ...postStoreState, error: true },
    });
    fixture.detectChanges();
    const error = getElementByDataTest(fixture, errorSelector);
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
    getElementByDataTest(fixture, 'error-button').click();
    expect(store$.dispatch).toHaveBeenCalledWith(
      PostActions.loadPosts({ id: selectedUser.id })
    );
  });

  it(`should display the user's posts`, () => {
    const posts = getAllElementsTextContentByDataTest(fixture, 'post');
    const expected = mockPostList.map((post) => post.title);
    expect(posts).toEqual(expected);
  });

  it(`should create an overlay to display post
      after clicking a user's post`, () => {
    getElementByDataTest(fixture, 'post').click();
    fixture.detectChanges();
    const post = component.overlayRef.overlayElement.querySelector(
      userPostSelector
    );
    expect(post).toBeTruthy();
  });
});
