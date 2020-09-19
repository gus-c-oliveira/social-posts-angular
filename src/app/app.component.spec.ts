import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ROUTES } from '@app/router';
import { DataRequestService } from '@app/service';
import {
  COMMENT_STATE_KEY,
  initialCommentState,
  initialPostState,
  initialUserState,
  POST_STATE_KEY,
  USER_STATE_KEY,
} from '@app/store';
import { USER_LIST_PATH, userListSelector, UserModule } from '@app/user';
import { getElementBySelector } from '@app/utils';
import { provideMockStore } from '@ngrx/store/testing';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { HttpLoaderFactory } from './app.module';
import { headerSelector } from './components/ui/header';
import { UiModule } from './components/ui/ui.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  const userKey = USER_STATE_KEY;
  const postKey = POST_STATE_KEY;
  const commentKey = COMMENT_STATE_KEY;
  const initialState = {
    userKey: { ...initialUserState },
    postKey: { ...initialPostState },
    commentKey: { ...initialCommentState },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        UiModule,
        UserModule,
        RouterTestingModule.withRoutes(APP_ROUTES),
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        DataRequestService,
        provideMockStore({
          initialState,
        }),
        TranslateService,
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

  it('should navigate to user list component when clicking the header button', () => {
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
