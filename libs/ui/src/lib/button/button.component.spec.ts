import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  getElementByDataTest,
  getElementTextContentByDataTest,
  TranslatePipeStub,
} from '@gus/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  const buttonText = 'Click me!';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ButtonComponent, TranslatePipeStub],
      }).compileComponents();
    })
  );

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
    const button = getElementByDataTest(fixture, 'ui-button');
    expect(button).toBeTruthy();
  });

  it('should display the button text inside the button', () => {
    const displayedText = getElementTextContentByDataTest(fixture, 'ui-button');
    expect(displayedText).toEqual(buttonText);
  });
});
