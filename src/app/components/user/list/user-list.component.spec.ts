import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mockUserList } from '@app/mocks';
import {
  AppState,
  SetSelectedUserID,
  USER_STATE_KEY,
  POST_STATE_KEY,
  initialPostState,
} from '@app/store';
import { spinnerSelector, UiModule } from '@app/ui';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { cardCssClass, UserCardComponent, userCardSelector } from '../card';
import { USER_PROFILE_PATH } from '../profile';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: MockStore<AppState>;
  const storeStates = {
    empty: { loading: false, users: [], error: false, selectedUserID: null },
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, RouterTestingModule.withRoutes([])],
      declarations: [UserListComponent, UserCardComponent],
      providers: [
        provideMockStore({
          initialState: {
            [userStateKey]: {},
            [postStateKey]: initialPostState,
          },
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<AppState>;
  });

  it('should create', () => {
    store.setState({
      [userStateKey]: { ...storeStates.empty },
      [postStateKey]: initialPostState,
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should display the spinner while the user list is loading`, () => {
    store.setState({
      [userStateKey]: { ...storeStates.loading },
      [postStateKey]: initialPostState,
    });
    fixture.detectChanges();
    const spinner = fixture.debugElement
      .query(By.css(spinnerSelector))
      .nativeElement.textContent.trim();
    expect(spinner).toBeTruthy();
  });

  it('should display one card for each user', () => {
    store.setState({
      [userStateKey]: { ...storeStates.usersLoaded },
      [postStateKey]: initialPostState,
    });
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css(userCardSelector));
    expect(cards.length).toEqual(mockUserList.length);
  });

  it('should display the error message if users fail to load', () => {
    store.setState({
      [userStateKey]: { ...storeStates.error },
      [postStateKey]: initialPostState,
    });
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.error')).nativeElement;
    expect(error).toBeTruthy();
  });

  it('should dispatch action to set selected user id after clicking on a card', () => {
    spyOn(store, 'dispatch');
    store.setState({
      [userStateKey]: { ...storeStates.usersLoaded },
      [postStateKey]: initialPostState,
    });
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('.' + cardCssClass))
      .nativeElement.click();
    expect(store.dispatch).toHaveBeenCalledWith(
      new SetSelectedUserID(mockUserList[0].id)
    );
  });

  it('should navigate to user profile after clicking a user card', () => {
    const router: Router = TestBed.inject(Router);
    const route: ActivatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(router, 'navigate');
    store.setState({
      [userStateKey]: { ...storeStates.usersLoaded },
      [postStateKey]: initialPostState,
    });
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('.' + cardCssClass))
      .nativeElement.click();
    expect(router.navigate).toHaveBeenCalledWith([USER_PROFILE_PATH], {
      relativeTo: route.parent,
    });
  });
});
