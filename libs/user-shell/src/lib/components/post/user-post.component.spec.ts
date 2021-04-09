import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  initialPostState,
  mapPostsToEntities,
  mockCommentList,
  mockPostList,
  POST_SERVICE_BASE_URL,
  POST_STATE_KEY,
  PostService,
} from '@gus/post-store';
import {
  getAllElementsTextContentByDataTest,
  getElementByDataTest,
  getElementTextContentByDataTest,
  TranslatePipeStub,
} from '@gus/testing';
import { ButtonComponent, ErrorComponent, errorSelector } from '@gus/ui';
import { SpinnerStubComponent } from '@gus/ui/testing';
import {
  mapUsersToEntities,
  mockUserList,
  USER_STATE_KEY,
} from '@gus/user-store';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
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
  const postKey = POST_STATE_KEY;
  let store$: MockStore<any>;
  const initialState = {
    [userKey]: {
      entities: mapUsersToEntities(mockUserList),
      loading: false,
      error: false,
      selectedUserID: 1,
      ids: mockUserList.map((user) => user.id),
    },
    [postKey]: { ...initialPostState },
  };
  const selectedPostID = 3;
  const selectedPost = mockPostList.find((item) => item.id === selectedPostID);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, OverlayModule],
      declarations: [
        ErrorComponent,
        ButtonComponent,
        SpinnerStubComponent,
        UserPostComponent,
        TestHostComponent,
        TranslatePipeStub,
      ],
      providers: [
        provideMockStore({
          initialState,
        }),
        PostService,
        { provide: POST_SERVICE_BASE_URL, useValue: '/' },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    store$ = TestBed.inject(Store) as MockStore<any>;
    service = TestBed.inject(PostService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(host.postComponent).toBeTruthy();
  });

  it('should display the selected post', () => {
    store$.setState({
      [postKey]: {
        entities: mapPostsToEntities(mockPostList),
        loading: false,
        error: false,
        selectedPostID,
        ids: mockPostList.map((post) => post.id),
      },
    });
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
    host.postComponent.comments$ = of({ state: 'loading', comments: [] });
    fixture.detectChanges();
    const spinner = getElementByDataTest(fixture, 'loader');
    expect(spinner).toBeTruthy();
  });

  it('should display the error component if comments fail to load', () => {
    host.postComponent.comments$ = of({ state: 'error', comments: [] });
    fixture.detectChanges();
    const error = getElementByDataTest(fixture, errorSelector);
    expect(error).toBeTruthy();
  });

  it(`should retry loading the post comments
      when clicking the error button`, () => {
    store$.setState({
      [postKey]: {
        entities: mapPostsToEntities(mockPostList),
        loading: false,
        error: false,
        selectedPostID,
        ids: mockPostList.map((post) => post.id),
      },
    });
    spyOn(service, 'loadPostComments');
    host.postComponent.comments$ = of({ state: 'error', comments: [] });
    fixture.detectChanges();
    getElementByDataTest(fixture, 'error-button').click();
    expect(service.loadPostComments).toHaveBeenCalledWith(selectedPost.id);
  });

  it('should display the selected post comments', () => {
    host.postComponent.comments$ = of({
      state: 'loaded',
      comments: mockCommentList,
    });
    fixture.detectChanges();
    const expected = mockCommentList.map((item) => `${item.name}${item.body}`);
    const comments = getAllElementsTextContentByDataTest(fixture, 'comment');
    expect(comments).toEqual(expected);
  });
});
