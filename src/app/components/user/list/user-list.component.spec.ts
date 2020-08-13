import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockUserList } from '@app/mocks';
import { USER_STATE_KEY, UserState } from '@app/store';
import { spinnerSelector, UiModule } from '@app/ui';
import { provideMockStore } from '@ngrx/store/testing';

import { UserCardComponent, userCardSelector } from '../card';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let testIndex = 0;
  const initialState: UserState[] = [
    { loading: false, users: [], error: false, selectedUserID: null },
    { loading: true, users: [], error: false, selectedUserID: null },
    { loading: false, users: mockUserList, error: false, selectedUserID: null },
    { loading: false, users: [], error: true, selectedUserID: null },
  ];
  const key = USER_STATE_KEY;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [UserListComponent, UserCardComponent],
      providers: [
        provideMockStore({
          initialState: { [key]: initialState[testIndex] },
        }),
      ],
    }).compileComponents();
    testIndex = testIndex + 1;
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display the spinner while the user list is loading`, () => {
    const spinner = fixture.debugElement
      .query(By.css(spinnerSelector))
      .nativeElement.textContent.trim();
    expect(spinner).toBeTruthy();
  });

  it('should display one card for each user', () => {
    const cards = fixture.debugElement.queryAll(By.css(userCardSelector));
    expect(cards.length).toEqual(mockUserList.length);
  });

  it('should display the error message if users fail to load', () => {
    const error = fixture.debugElement.query(By.css('.error')).nativeElement;
    expect(error).toBeTruthy();
  });
});
