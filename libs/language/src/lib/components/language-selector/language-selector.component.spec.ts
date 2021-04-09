import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { getElementByDataTest } from '@gus/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LanguageSelectorComponent } from './language-selector.component';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let translateService: TranslateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LanguageSelectorComponent],
        imports: [TranslateModule.forRoot(), StoreModule.forRoot({})],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    translateService.setDefaultLang('en-US');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a flag image', () => {
    const flagImage = getElementByDataTest(fixture, 'flag-image');
    expect(flagImage).toBeTruthy();
  });

  it('should display the pt-BR flag image, if language is en-US', () => {
    translateService.setDefaultLang('en-US');
    fixture.detectChanges();
    const flagImage = getElementByDataTest(fixture, 'flag-image');
    expect(flagImage.src).toContain('pt-BR');
  });

  it('should display the en-US flag image, if language is pt-BR', () => {
    translateService.setDefaultLang('pt-BR');
    fixture.detectChanges();
    const flagImage = getElementByDataTest(fixture, 'flag-image');
    expect(flagImage.src).toContain('en-US');
  });

  it('should toggle language when user clicks flag', () => {
    translateService.setDefaultLang('pt-BR');
    fixture.detectChanges();
    getElementByDataTest(fixture, 'flag-image').click();
    expect(translateService.defaultLang).toEqual('en-US');
  });
});
