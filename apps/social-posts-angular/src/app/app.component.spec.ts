import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getElementBySelector } from '@gus/testing';
import { languageComponentSelector } from '@gus/ui';
import { LanguageSelectorStubComponent } from '@gus/ui/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, LanguageSelectorStubComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({}),
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
});
