import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ROUTES } from '@app/router';
import { UserService } from '@app/service';
import {
  POST_STATE_KEY,
  USER_STATE_KEY,
  COMMENT_STATE_KEY,
  initialCommentState,
  initialPostState,
  initialUserState,
} from '@app/store';
import {
  userListSelector,
  UserModule,
  userPostSelector,
  userProfileSelector,
} from '@app/user';
import { provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { APP_CONSTANTS } from './app.constants';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  const userKey = USER_STATE_KEY;
  const postKey = POST_STATE_KEY;
  const commentKey = COMMENT_STATE_KEY;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        UserModule,
        RouterTestingModule.withRoutes(APP_ROUTES),
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
        provideMockStore({
          initialState: {
            [userKey]: {
              ...initialUserState,
            },
            [postKey]: {
              ...initialPostState,
            },
            [commentKey]: {
              ...initialCommentState,
            },
          },
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should display the app title`, () => {
    const title = APP_CONSTANTS.AppTitle;
    const displayedTitle = fixture.debugElement
      .query(By.css('h1'))
      .nativeElement.textContent.trim();
    expect(displayedTitle).toEqual(title);
  });

  it('should render the route links', () => {
    const routeLinks = component.links;
    const displayedLinks = fixture.debugElement
      .queryAll(By.css('a'))
      .map((item) => item.nativeElement.textContent.trim());
    displayedLinks.forEach((link, index) => {
      expect(link).toEqual(routeLinks[index].title);
    });
  });

  it('should navigate to user components using links', async(() => {
    fixture.ngZone.run(() => {
      const selectors = [
        { path: APP_ROUTES[0].path, selector: userListSelector },
        { path: APP_ROUTES[1].path, selector: userPostSelector },
        { path: APP_ROUTES[2].path, selector: userProfileSelector },
      ];
      const displayedLinks = fixture.debugElement
        .queryAll(By.css('a'))
        .map((item) => item.nativeElement);
      displayedLinks.forEach((linkElement) => {
        linkElement.click();
        fixture.detectChanges();
        const userComponentSelector = selectors.filter(
          (item) => '/' + item.path === router.url
        )[0].selector;
        const userComponent = fixture.debugElement.query(
          By.css(userComponentSelector)
        );
        expect(userComponent).toBeTruthy();
      });
    });
  }));

  it('should initially display the user list component', () => {
    const userList = fixture.debugElement.query(By.css(userListSelector));
    expect(userList).toBeTruthy();
  });
});
