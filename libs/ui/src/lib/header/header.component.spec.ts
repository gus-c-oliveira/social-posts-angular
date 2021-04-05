import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonStubComponent } from '@gus/ui/testing';
import {
  getAllElementsByDataTest,
  getElementByDataTest,
  getElementTextContentByDataTest,
  TranslatePipeStub,
} from '@gus/testing';

import { HeaderComponent } from './header.component';
import { HeaderButtonConfig } from './header.model';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  const buttonConfigs: HeaderButtonConfig[] = [
    { text: 'User', eventType: 'ClickUserButton' },
    { text: 'Stats', eventType: 'ClickStatsButton' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonStubComponent, HeaderComponent, TranslatePipeStub],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.title = 'TITLE';
    component.buttonConfigs = buttonConfigs;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const title = getElementTextContentByDataTest(fixture, 'header-title');
    expect(title).toEqual('TITLE');
  });

  it('should display the buttons', () => {
    const buttons = getAllElementsByDataTest(fixture, 'ui-button');
    expect(buttons.length).toEqual(buttonConfigs.length);
  });

  it('should emit an event when a button is clicked', () => {
    spyOn(component.buttonClick, 'emit');
    getElementByDataTest(fixture, 'ui-button').click();
    expect(component.buttonClick.emit).toHaveBeenCalledWith({
      type: buttonConfigs[0].eventType,
    });
  });
});
