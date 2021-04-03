import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  mockCommentList,
  COMMENT_STATE_KEY,
  initialCommentState,
  LoadComments,
} from '@gus/comment-store';
import {
  initialPostState,
  POST_STATE_KEY,
  mockPostList,
  mapPostsToEntities,
} from '@gus/post-store';
import { SpinnerStubComponent } from '@gus/ui/testing';
import {
  getAllElementsTextContentBySelector,
  getElementBySelector,
  getElementTextContentBySelector,
  TranslatePipeStub,
} from '@gus/testing';
import {
  ButtonComponent,
  ErrorComponent,
  errorSelector,
  spinnerSelector,
} from '@gus/ui';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { UserPostComponent } from './user-post.component';
import {
  mockUserList,
  USER_STATE_KEY,
  mapUsersToEntities,
} from '@gus/user-store';

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
  const userKey = USER_STATE_KEY;
  const postKey = POST_STATE_KEY;
  const commentKey = COMMENT_STATE_KEY;
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
    [commentKey]: { ...initialCommentState },
  };
  const selectedPostID = 3;
  const selectedPost = mockPostList.find((item) => item.id === selectedPostID);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OverlayModule],
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    store$ = TestBed.inject(Store) as MockStore<any>;
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
    const postTitle = getElementTextContentBySelector(fixture, '.post__title');
    const postBody = getElementTextContentBySelector(fixture, '.post__body');
    expect(postTitle).toEqual(selectedPost.title);
    expect(postBody).toEqual(selectedPost.body);
  });

  it('should display the close icon', () => {
    const close = getElementBySelector(fixture, '.close');
    expect(close).toBeTruthy();
  });

  it('should close the overlay after clicking the close icon', () => {
    spyOn(host.postComponent.overlayRef, 'dispose');
    getElementBySelector(fixture, '.close').click();
    expect(host.postComponent.overlayRef.dispose).toHaveBeenCalled();
  });

  it(`should display the spinner while the post's comments are loading`, () => {
    store$.setState({
      [commentKey]: { ...initialCommentState, loading: true },
    });
    fixture.detectChanges();
    const spinner = getElementBySelector(fixture, spinnerSelector);
    expect(spinner).toBeTruthy();
  });

  it('should display the error component if comments fail to load', () => {
    store$.setState({
      [commentKey]: { ...initialCommentState, error: true },
    });
    fixture.detectChanges();
    const error = getElementBySelector(fixture, errorSelector);
    expect(error).toBeTruthy();
  });

  it(`should retry loading the post comments
      when clicking the error button`, () => {
    spyOn(store$, 'dispatch');
    store$.setState({
      [postKey]: {
        entities: mapPostsToEntities(mockPostList),
        loading: false,
        error: false,
        selectedPostID,
        ids: mockPostList.map((post) => post.id),
      },
      [commentKey]: { ...initialCommentState, error: true },
    });
    fixture.detectChanges();
    getElementBySelector(fixture, '.error__button').click();
    expect(store$.dispatch).toHaveBeenCalledWith(
      new LoadComments(selectedPost.id)
    );
  });

  it('should display the selected post comments', () => {
    store$.setState({
      [commentKey]: {
        comments: mockCommentList,
        loading: false,
        error: false,
      },
    });
    fixture.detectChanges();
    const expected = mockCommentList.map((item) => `${item.name}${item.body}`);
    const comments = getAllElementsTextContentBySelector(
      fixture,
      '.comment__item'
    );
    expect(comments).toEqual(expected);
  });
});
