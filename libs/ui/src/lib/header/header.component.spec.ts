import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonStubComponent, buttonSelector } from '@gus/ui/testing';
import {
  getElementBySelector,
  getElementTextContentBySelector,
  TranslatePipeStub,
} from '@gus/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  const buttonText = 'Click me!';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonStubComponent, HeaderComponent, TranslatePipeStub],
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

  it('should emit an event when the button is clicked', () => {
    spyOn(component.buttonClick, 'emit');
    getElementBySelector(fixture, buttonSelector).click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});
