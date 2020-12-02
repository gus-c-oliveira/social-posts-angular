import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockUserList, mapUserToSimpleUser, SimpleUser } from '@gus/user-store';
import {
  getAllElementsTextContentBySelector,
  getElementBySelector,
  getElementTextContentBySelector,
  TranslatePipeStub,
} from '@gus/testing';

import { UserCardComponent, userCardSelector } from './user-card.component';

const mockSimpleUser: SimpleUser = mapUserToSimpleUser(mockUserList[0]);

@Component({
  selector: 'gus-test-host',
  template: `
    <gus-user-card
      [user]="user"
      (selected)="saveSelected($event)"
    ></gus-user-card>
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, UserCardComponent, TranslatePipeStub],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const card = getElementBySelector(fixture, userCardSelector);
    expect(card).toBeTruthy();
  });

  it('should display the user picture', () => {
    const picture = getElementBySelector(fixture, '.card__picture');
    expect(picture.src).toContain(mockSimpleUser.pictureURL);
  });

  it(`should display the user's username`, () => {
    const username = getElementTextContentBySelector(
      fixture,
      '.card__username'
    );
    expect(username).toEqual(mockSimpleUser.username);
  });

  it(`should display the user's name and email`, () => {
    let name = '';
    let email = '';
    const nameAndEmail = getAllElementsTextContentBySelector(
      fixture,
      '.card__info-value'
    );
    // Name should be the first value, Email should be the second value.
    name = nameAndEmail[0];
    email = nameAndEmail[1];
    expect(name).toEqual(mockSimpleUser.name);
    expect(email).toEqual(mockSimpleUser.email);
  });

  it(`should emit the id of the user
      to the parent component when clicked`, () => {
    getElementBySelector(fixture, '.card').click();
    expect(component.selected).toEqual(mockSimpleUser.id);
  });
});