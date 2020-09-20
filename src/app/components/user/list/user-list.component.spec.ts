import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mockUserList } from '@app/mocks';
import {
  initialUserState,
  LoadUsers,
  SetSelectedUserID,
  USER_STATE_KEY,
  UserState,
} from '@app/store';
import {
  getAllElementsBySelector,
  getElementBySelector,
  getElementTextContentBySelector,
  SpinnerStubComponent,
  TranslatePipeStub,
} from '@app/testing';
import {
  ButtonComponent,
  ErrorComponent,
  errorSelector,
  spinnerSelector,
} from '@app/ui';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { UserCardComponent, userCardSelector } from '../card';
import { USER_PROFILE_PATH } from '../profile';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const storeStates: { [stateName: string]: UserState } = {
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
  let store: MockStore<{ [userStateKey: string]: UserState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [
        SpinnerStubComponent,
        ButtonComponent,
        ErrorComponent,
        UserListComponent,
        UserCardComponent,
        TranslatePipeStub,
      ],
      providers: [
        provideMockStore({
          initialState: {
            [userStateKey]: initialUserState,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<{
      [userStateKey: string]: UserState;
    }>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display the spinner while the user list is loading`, () => {
    store.setState({
      [userStateKey]: { ...storeStates.loading },
    });
    fixture.detectChanges();
    const spinner = getElementTextContentBySelector(fixture, spinnerSelector);
    expect(spinner).toBeTruthy();
  });

  it('should display one card for each user', () => {
    store.setState({
      [userStateKey]: { ...storeStates.usersLoaded },
    });
    fixture.detectChanges();
    const cards = getAllElementsBySelector(fixture, userCardSelector);
    expect(cards.length).toEqual(mockUserList.length);
  });

  it('should display the error component if users fail to load', () => {
    store.setState({
      [userStateKey]: { ...storeStates.error },
    });
    fixture.detectChanges();
    const error = getElementBySelector(fixture, errorSelector);
    expect(error).toBeTruthy();
  });

  it('should retry loading the user list when clicking the error button', () => {
    spyOn(store, 'dispatch');
    store.setState({
      [userStateKey]: { ...storeStates.error },
    });
    fixture.detectChanges();
    getElementBySelector(fixture, '.error__button').click();
    expect(store.dispatch).toHaveBeenCalledWith(new LoadUsers());
  });

  it('should dispatch action to set selected user id after clicking on a card', () => {
    spyOn(store, 'dispatch');
    store.setState({
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
      [userStateKey]: { ...storeStates.usersLoaded },
    });
    fixture.detectChanges();
    getElementBySelector(fixture, '.card').click();
    expect(router.navigate).toHaveBeenCalledWith([USER_PROFILE_PATH], {
      relativeTo: route.parent,
    });
  });
});
