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

  it('should display the user picture', () => {
    const picture = fixture.debugElement.query(By.css('.card__picture'))
      .nativeElement;
    expect(picture.src).toContain(mockSimpleUser.pictureURL);
  });

  it(`should display the user's username`, () => {
    const username = fixture.debugElement
      .query(By.css('.card__username'))
      .nativeElement.textContent.trim();
    expect(username).toEqual(mockSimpleUser.username);
  });

  it(`should display the user's name and email`, () => {
    let name = '';
    let email = '';
    const nameAndEmail = fixture.debugElement
      .queryAll(By.css('.card__info-value'))
      .map((item) => item.nativeElement.textContent.trim());
    // Name should be the first value, Email should be the second value.
    name = nameAndEmail[0];
    email = nameAndEmail[1];
    expect(name).toEqual(mockSimpleUser.name);
    expect(email).toEqual(mockSimpleUser.email);
  });

  it('should emit the id of the user to the parent component when clicked', () => {
    const card = fixture.debugElement.query(By.css('.card')).nativeElement;
    card.click();
    expect(component.selected).toEqual(mockSimpleUser.id);
  });
});
