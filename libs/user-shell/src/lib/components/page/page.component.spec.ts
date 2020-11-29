import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { getElementBySelector } from '@gus/testing';
import { headerSelector, UiModule } from '@gus/ui';
import { UserListStubComponent } from '@gus/user-shell/testing';
import { TranslateModule } from '@ngx-translate/core';

import { USER_LIST_PATH } from '../list';
import { UserPageComponent } from './page.component';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
      ],
      declarations: [UserPageComponent, UserListStubComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header', () => {
    const header = getElementBySelector(fixture, headerSelector);
    expect(header).toBeTruthy();
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
});
