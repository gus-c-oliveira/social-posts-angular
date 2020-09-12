import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  const buttonText = 'Click me!';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.buttonText = buttonText;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a button', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button).toBeTruthy();
  });

  it('should display the button text inside the button', () => {
    const displayedText = fixture.debugElement
      .query(By.css('button'))
      .nativeElement.textContent.trim();
    expect(displayedText).toEqual(buttonText);
  });
});
