import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  mockUserList,
  initialUserState,
  UserActions,
  USER_STATE_KEY,
  UserState,
  mapUsersToEntities,
} from '@gus/user-store';
import { SpinnerStubComponent } from '@gus/ui/testing';
import {
  getAllElementsByDataTest,
  getElementByDataTest,
  getElementTextContentByDataTest,
  TranslatePipeStub,
} from '@gus/testing';
import { ButtonComponent, ErrorComponent, errorSelector } from '@gus/ui';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { UserCardComponent, userCardSelector } from '../card';
import { USER_PROFILE_PATH } from '../../routes/paths';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const storeStates: { [stateName: string]: UserState } = {
    loading: {
      loading: true,
      entities: {},
      error: false,
      selectedUserID: null,
      ids: [],
    },
    error: {
      loading: false,
      entities: {},
      error: true,
      selectedUserID: null,
      ids: [],
    },
    usersLoaded: {
      loading: false,
      entities: mapUsersToEntities(mockUserList),
      error: false,
      selectedUserID: null,
      ids: mockUserList.map((user) => user.id),
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
    const spinner = getElementTextContentByDataTest(fixture, 'loader');
    expect(spinner).toBeTruthy();
  });

  it('should display one card for each user', () => {
    store.setState({
      [userStateKey]: { ...storeStates.usersLoaded },
    });
    fixture.detectChanges();
    const cards = getAllElementsByDataTest(fixture, userCardSelector);
    expect(cards.length).toEqual(mockUserList.length);
  });

  it('should display the error component if users fail to load', () => {
    store.setState({
      [userStateKey]: { ...storeStates.error },
    });
    fixture.detectChanges();
    const error = getElementByDataTest(fixture, errorSelector);
    expect(error).toBeTruthy();
  });

  it(`should retry loading the user list
      when clicking the error button`, () => {
    spyOn(store, 'dispatch');
    store.setState({
      [userStateKey]: { ...storeStates.error },
    });
    fixture.detectChanges();
    getElementByDataTest(fixture, 'error-button').click();
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.loadUsers());
  });

  it(`should dispatch action to set
      selected user id after clicking on a card`, () => {
    spyOn(store, 'dispatch');
    store.setState({
      [userStateKey]: { ...storeStates.usersLoaded },
    });
    fixture.detectChanges();
    getElementByDataTest(fixture, 'user-card').click();
    expect(store.dispatch).toHaveBeenCalledWith(
      UserActions.setSelectedUserID({ id: mockUserList[0].id })
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
    getElementByDataTest(fixture, 'user-card').click();
    expect(router.navigate).toHaveBeenCalledWith([USER_PROFILE_PATH], {
      relativeTo: route.parent,
    });
  });
});
