import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { APP_CONSTANTS } from 'src/app/app.constants';

import { ButtonComponent, buttonSelector } from '../button';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  const buttonText = 'Click me!';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.title = APP_CONSTANTS.AppTitle;
    component.buttonText = buttonText;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const title = fixture.debugElement
      .query(By.css('h1'))
      .nativeElement.textContent.trim();
    expect(title).toEqual(APP_CONSTANTS.AppTitle);
  });

  it('should display the button', () => {
    const button = fixture.debugElement.query(By.css(buttonSelector))
      .nativeElement;
    expect(button).toBeTruthy();
  });

  it('should display the button text inside the button', () => {
    const text = fixture.debugElement
      .query(By.css(buttonSelector))
      .nativeElement.textContent.trim();
    expect(text).toEqual(buttonText);
  });

  it('should emit an event when the button is clicked', () => {
    spyOn(component.buttonClick, 'emit');
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});
