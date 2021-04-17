import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  getAllElementsTextContentByDataTest,
  getElementByDataTest,
  getElementTextContentByDataTest,
  TranslatePipeStub,
} from '@gus/testing';
import { ButtonComponent, ErrorComponent, errorSelector } from '@gus/ui';
import { SpinnerStubComponent, TooltipStubDirective } from '@gus/ui/testing';
import {
  mapUsersToEntities,
  mockCommentList,
  mockPostList,
  mockUserList,
  PostService,
  SERVICE_BASE_URL,
  USER_STATE_KEY,
} from '@gus/user-store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { UserPostComponent } from './user-post.component';

@Component({
  selector: 'gus-test-host',
  template: ` <gus-user-post [overlayRef]="overlayRef"> </gus-user-post> `,
})
export class TestHostComponent {
  @ViewChild(UserPostComponent) public postComponent: UserPostComponent;
  public overlayRef: OverlayRef;

  public constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create();
  }
}

describe('UserPostComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let service: PostService;
  const userKey = USER_STATE_KEY;
  const initialState = {
    [userKey]: {
      entities: mapUsersToEntities(mockUserList),
      loading: false,
      error: false,
      selectedUserID: 1,
      ids: mockUserList.map((user) => user.id),
    },
  };
  const selectedPostID = 3;
  const selectedPost = mockPostList.find((item) => item.id === selectedPostID);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, OverlayModule],
        declarations: [
          ErrorComponent,
          ButtonComponent,
          SpinnerStubComponent,
          UserPostComponent,
          TestHostComponent,
          TranslatePipeStub,
          TooltipStubDirective,
        ],
        providers: [
          provideMockStore({
            initialState,
          }),
          PostService,
          { provide: SERVICE_BASE_URL, useValue: '/' },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    service = TestBed.inject(PostService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(host.postComponent).toBeTruthy();
  });

  it('should display the selected post', () => {
    host.postComponent.post$ = of(selectedPost);
    fixture.detectChanges();
    const postTitle = getElementTextContentByDataTest(fixture, 'post-title');
    const postBody = getElementTextContentByDataTest(fixture, 'post-body');
    expect(postTitle).toEqual(selectedPost.title);
    expect(postBody).toEqual(selectedPost.body);
  });

  it('should display the close icon', () => {
    const close = getElementByDataTest(fixture, 'post-close');
    expect(close).toBeTruthy();
  });

  it('should close the overlay after clicking the close icon', () => {
    spyOn(host.postComponent.overlayRef, 'dispose');
    getElementByDataTest(fixture, 'post-close').click();
    expect(host.postComponent.overlayRef.dispose).toHaveBeenCalled();
  });

  it(`should display the spinner while the post's comments are loading`, () => {
    host.postComponent.comments$ = of({ state: 'loading', data: [] });
    fixture.detectChanges();
    const spinner = getElementByDataTest(fixture, 'loader');
    expect(spinner).toBeTruthy();
  });

  it('should display the error component if comments fail to load', () => {
    host.postComponent.comments$ = of({ state: 'error', data: [] });
    fixture.detectChanges();
    const error = getElementByDataTest(fixture, errorSelector);
    expect(error).toBeTruthy();
  });

  it(`should retry loading the post comments
      when clicking the error button`, () => {
    spyOn(service, 'loadPostComments');
    host.postComponent.comments$ = of({ state: 'error', data: [] });
    fixture.detectChanges();
    getElementByDataTest(fixture, 'error-button').click();
    expect(service.loadPostComments).toHaveBeenCalled();
  });

  it('should display the selected post comments', () => {
    host.postComponent.comments$ = of({
      state: 'loaded',
      data: mockCommentList,
    });
    fixture.detectChanges();
    const expected = mockCommentList.map((item) => `${item.name}${item.body}`);
    const comments = getAllElementsTextContentByDataTest(fixture, 'comment');
    expect(comments).toEqual(expected);
  });
});
