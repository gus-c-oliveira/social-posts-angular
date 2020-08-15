import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockUserList } from '@app/mocks';
import { mapUserToSimpleUser, SimpleUser } from '@app/store';

import { UserCardComponent, userCardSelector } from './user-card.component';

const mockSimpleUser: SimpleUser = mapUserToSimpleUser(mockUserList[0]);

@Component({
  selector: 'app-test-host',
  template: `
    <app-user-card
      [user]="user"
      (selected)="saveSelected($event)"
    ></app-user-card>
  `,
})
class TestHostComponent {
  public user: SimpleUser = mockSimpleUser;
  public selected: number = null;

  public saveSelected(id: number) {
    this.selected = id;
  }
}

describe('UserCardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, UserCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const card = fixture.debugElement.query(By.css(userCardSelector))
      .nativeElement;
    expect(card).toBeTruthy();
  });

  it('should display the user data', () => {
    const data = fixture.debugElement
      .queryAll(By.css('p'))
      .map((item) => item.nativeElement.textContent.trim());
    const expectedResult = [
      `Username: ${mockSimpleUser.username}`,
      `Name: ${mockSimpleUser.name}`,
      `Email: ${mockSimpleUser.email}`,
    ];
    data.forEach((item, index) => {
      expect(item).toEqual(expectedResult[index]);
    });
  });

  it('should emit the id of the user to the parent component when clicked', () => {
    const card = fixture.debugElement.query(By.css('.card')).nativeElement;
    card.click();
    expect(component.selected).toEqual(mockSimpleUser.id);
  });
});
