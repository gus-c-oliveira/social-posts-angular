import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockUserList } from '@app/mocks';
import { USER_STATE_KEY } from '@app/store';
import { provideMockStore } from '@ngrx/store/testing';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  const selectedUser = { ...mockUserList[0] };
  const key = USER_STATE_KEY;
  const storeState = {
    loading: false,
    users: mockUserList,
    error: false,
    selectedUserID: selectedUser.id,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [
        provideMockStore({
          initialState: { [key]: { ...storeState } },
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
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
});
