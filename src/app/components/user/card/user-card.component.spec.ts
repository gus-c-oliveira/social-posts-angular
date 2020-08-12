import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { mapUserToSimpleUser, SimpleUser } from '@app/store';
import { mockUserList } from '@app/mocks';
import { By } from '@angular/platform-browser';

describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;
  let component: UserCardComponent;
  const mockSimpleUser: SimpleUser = mapUserToSimpleUser(mockUserList[0]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    component.user = mockSimpleUser;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user data', () => {
    const data = fixture.debugElement
      .queryAll(By.css('p'))
      .map((item) => item.nativeElement.textContent.trim());
    const labels = Object.keys(mockSimpleUser).filter((key) => key !== 'id');
    const values = Object.values(mockSimpleUser).filter(
      (value) => typeof value === 'string'
    );
    data.forEach((item, index) => {
      expect(item).toEqual(index % 2 ? values[index] : labels[index]);
    });
  });
});
