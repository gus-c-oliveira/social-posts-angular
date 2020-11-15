import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  UserListStubComponent,
  UserProfileStubComponent,
  UserTestingModule,
} from '@app/testing';
import { LanguageSelectorStubComponent } from '@gus/ui/testing';
import { getElementBySelector } from '@gus/testing';
import {
  ButtonComponent,
  HeaderComponent,
  languageComponentSelector,
  headerSelector,
} from '@gus/ui';
import { USER_LIST_PATH, USER_PROFILE_PATH, userListSelector } from '@app/user';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { HttpLoaderFactory } from './app.module';

const APP_ROUTES: Routes = [
  { path: USER_LIST_PATH, component: UserListStubComponent },
  { path: '**', component: UserListStubComponent },
  { path: USER_PROFILE_PATH, component: UserProfileStubComponent },
];

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        ButtonComponent,
        LanguageSelectorStubComponent,
      ],
      imports: [
        UserTestingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(APP_ROUTES),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
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

  it(`should display the app header`, () => {
    const header = getElementBySelector(fixture, headerSelector);
    expect(header).toBeTruthy();
  });

  it('should display the language selector', () => {
    const langComponent = getElementBySelector(
      fixture,
      languageComponentSelector
    );
    expect(langComponent).toBeTruthy();
  });

  it(`should navigate to user list component
      when clicking the header button`, () => {
    router = TestBed.inject(Router);
    const route = TestBed.inject(ActivatedRoute);
    spyOn(router, 'navigate');
    getElementBySelector(fixture, 'button').click();
    expect(router.navigate).toHaveBeenCalledWith([USER_LIST_PATH], {
      relativeTo: route.parent,
    });
  });

  it('should scroll to top when NavigationEnd events occur', () => {
    router = TestBed.inject(Router);
    const route = TestBed.inject(ActivatedRoute);
    spyOn(window, 'scrollTo');
    getElementBySelector(fixture, 'button').click();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should initially display the user list component', () => {
    const userList = getElementBySelector(fixture, userListSelector);
    expect(userList).toBeTruthy();
  });
});
