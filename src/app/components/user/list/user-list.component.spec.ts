import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mockUserList } from '@app/mocks';
import {
  AppState,
  COMMENT_STATE_KEY,
  initialCommentState,
  initialPostState,
  initialUserState,
  LoadUsers,
  POST_STATE_KEY,
  SetSelectedUserID,
  USER_STATE_KEY,
} from '@app/store';
import { errorSelector, spinnerSelector, UiModule } from '@app/ui';
import {
  getAllElementsBySelector,
  getElementBySelector,
  getElementTextContentBySelector,
} from '@app/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { UserCardComponent, userCardSelector } from '../card';
import { USER_PROFILE_PATH } from '../profile';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: MockStore<AppState>;
  const storeStates = {
    loading: { loading: true, users: [], error: false, selectedUserID: null },
    error: { loading: false, users: [], error: true, selectedUserID: null },
    usersLoaded: {
      loading: false,
      users: mockUserList,
      error: false,
      selectedUserID: null,
    },
  };
  const userStateKey = USER_STATE_KEY;
  const postStateKey = POST_STATE_KEY;
  const commentStateKey = COMMENT_STATE_KEY;
  const initialState: AppState = {
    [userStateKey]: initialUserState,
    [postStateKey]: initialPostState,
    [commentStateKey]: initialCommentState,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
      ],
      declarations: [UserListComponent, UserCardComponent],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<AppState>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display the spinner while the user list is loading`, () => {
    store.setState({
      ...initialState,
      [userStateKey]: { ...storeStates.loading },
    });
    fixture.detectChanges();
    const spinner = getElementTextContentBySelector(fixture, spinnerSelector);
    expect(spinner).toBeTruthy();
  });

  it('should display one card for each user', () => {
    store.setState({
      ...initialState,
      [userStateKey]: { ...storeStates.usersLoaded },
    });
    fixture.detectChanges();
    const cards = getAllElementsBySelector(fixture, userCardSelector);
    expect(cards.length).toEqual(mockUserList.length);
  });

  it('should display the error component if users fail to load', () => {
    store.setState({
      ...initialState,
      [userStateKey]: { ...storeStates.error },
    });
    fixture.detectChanges();
    const error = getElementBySelector(fixture, errorSelector);
    expect(error).toBeTruthy();
  });

  it('should retry loading the user list when clicking the error button', () => {
    spyOn(store, 'dispatch');
    store.setState({
      ...initialState,
      [userStateKey]: { ...storeStates.error },
    });
    fixture.detectChanges();
    getElementBySelector(fixture, '.error__button').click();
    expect(store.dispatch).toHaveBeenCalledWith(new LoadUsers());
  });

  it('should dispatch action to set selected user id after clicking on a card', () => {
    spyOn(store, 'dispatch');
    store.setState({
      ...initialState,
      [userStateKey]: { ...storeStates.usersLoaded },
    });
    fixture.detectChanges();
    getElementBySelector(fixture, '.card').click();
    expect(store.dispatch).toHaveBeenCalledWith(
      new SetSelectedUserID(mockUserList[0].id)
    );
  });

  it('should navigate to user profile after clicking a user card', () => {
    const router: Router = TestBed.inject(Router);
    const route: ActivatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(router, 'navigate');
    store.setState({
      ...initialState,
      [userStateKey]: { ...storeStates.usersLoaded },
    });
    fixture.detectChanges();
    getElementBySelector(fixture, '.card').click();
    expect(router.navigate).toHaveBeenCalledWith([USER_PROFILE_PATH], {
      relativeTo: route.parent,
    });
  });
});
