import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  getAllElementsByDataTest,
  getAllElementsTextContentByDataTest,
  getElementByDataTest,
  getElementTextContentByDataTest,
} from '@gus/testing';
import { errorSelector } from '@gus/ui';
import {
  addUserFriends,
  addUserPicture,
  mapUsersToEntities,
  mockPostList,
  mockUserList,
  PostService,
  SERVICE_BASE_URL,
  USER_STATE_KEY,
  UserState,
} from '@gus/user-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { UserShellModule } from '../../user-shell.module';
import { userPostSelector } from '../post';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let service: PostService;
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
  const initialState = {
    [userKey]: { ...userStoreState },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
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
          { provide: SERVICE_BASE_URL, useValue: '/' },
          PostService,
        ],
      })
        .overrideComponent(UserProfileComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PostService);
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
    component.posts$ = of({ state: 'loading', data: [] });
    fixture.detectChanges();
    const spinner = getElementByDataTest(fixture, 'loader');
    expect(spinner).toBeTruthy();
  });

  it('should display the error component if posts fail to load', () => {
    component.posts$ = of({ state: 'error', data: [] });
    fixture.detectChanges();
    const error = getElementByDataTest(fixture, errorSelector);
    expect(error).toBeTruthy();
  });

  it(`should retry loading the user posts
      when clicking the error button`, () => {
    spyOn(service, 'loadPosts');
    component.posts$ = of({ state: 'error', data: [] });
    fixture.detectChanges();
    getElementByDataTest(fixture, 'error-button').click();
    expect(service.loadPosts).toHaveBeenCalledWith(selectedUser.id);
  });

  it(`should display the user's posts`, () => {
    component.posts$ = of({ state: 'loaded', data: mockPostList });
    fixture.detectChanges();
    const posts = getAllElementsTextContentByDataTest(fixture, 'post');
    const expected = mockPostList.map((post) => post.title);
    expect(posts).toEqual(expected);
  });

  it(`should create an overlay to display post
      after clicking a user's post`, () => {
    component.posts$ = of({ state: 'loaded', data: mockPostList });
    fixture.detectChanges();
    getElementByDataTest(fixture, 'post').click();
    fixture.detectChanges();
    const post = component.overlayRef.overlayElement.querySelector(
      userPostSelector
    );
    expect(post).toBeTruthy();
  });
});
