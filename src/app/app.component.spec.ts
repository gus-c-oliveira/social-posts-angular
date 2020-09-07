import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
import { provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        UiModule,
        UserModule,
        RouterTestingModule.withRoutes(APP_ROUTES),
        HttpClientTestingModule,
      ],
      providers: [
        DataRequestService,
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

  it(`should display the app header`, () => {
    const header = fixture.debugElement.query(By.css(headerSelector))
      .nativeElement;
    expect(header).toBeTruthy();
  });

  it('should navigate to user list component when clicking the header button', () => {
    router = TestBed.inject(Router);
    const route = TestBed.inject(ActivatedRoute);
    spyOn(router, 'navigate');
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(router.navigate).toHaveBeenCalledWith([USER_LIST_PATH], {
      relativeTo: route.parent,
    });
  });

  it('should initially display the user list component', () => {
    const userList = fixture.debugElement.query(By.css(userListSelector));
    expect(userList).toBeTruthy();
  });
});
