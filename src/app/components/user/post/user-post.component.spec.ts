import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserPostComponent } from './user-post.component';

describe('UserPostComponent', () => {
  let component: UserPostComponent;
  let fixture: ComponentFixture<UserPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(UserPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display the component's name`, () => {
    const name = component.getName();
    const displayedText = fixture.debugElement
      .query(By.css('p'))
      .nativeElement.textContent.trim();
    expect(displayedText).toEqual(name);
  });
});
