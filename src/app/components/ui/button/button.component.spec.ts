import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  getElementBySelector,
  getElementTextContentBySelector,
} from '@app/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  const buttonText = 'Click me!';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
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
    const button = getElementBySelector(fixture, 'button');
    expect(button).toBeTruthy();
  });

  it('should display the button text inside the button', () => {
    const displayedText = getElementTextContentBySelector(fixture, 'button');
    expect(displayedText).toEqual(buttonText);
  });
});
