import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  getElementBySelector,
  getElementTextContentBySelector,
} from '@app/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent, buttonSelector } from '../button';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  const buttonText = 'Click me!';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ButtonComponent, HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.title = 'TITLE';
    component.buttonText = buttonText;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const title = getElementTextContentBySelector(fixture, 'h1');
    expect(title).toEqual('TITLE');
  });

  it('should display the button', () => {
    const button = getElementBySelector(fixture, buttonSelector);
    expect(button).toBeTruthy();
  });

  it('should display the button text inside the button', () => {
    const text = getElementTextContentBySelector(fixture, buttonSelector);
    expect(text).toEqual(buttonText);
  });

  it('should emit an event when the button is clicked', () => {
    spyOn(component.buttonClick, 'emit');
    getElementBySelector(fixture, 'button').click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});
