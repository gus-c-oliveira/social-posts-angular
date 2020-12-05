import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageModule } from '@gus/language';
import { getElementBySelector } from '@gus/testing';
import { headerSelector, languageComponentSelector, UiModule } from '@gus/ui';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({}),
        UiModule,
        LanguageModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should setup translations', () => {
    const translate = TestBed.inject(TranslateService);
    expect(translate.getLangs()).toEqual(['en-US', 'pt-BR']);
    expect(translate.getDefaultLang()).toEqual(navigator.language);
  });

  it('should display the language selector', () => {
    const langComponent = getElementBySelector(
      fixture,
      languageComponentSelector
    );
    expect(langComponent).toBeTruthy();
  });

  it('should display the header', () => {
    const header = getElementBySelector(fixture, headerSelector);
    expect(header).toBeTruthy();
  });
});
