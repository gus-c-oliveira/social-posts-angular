import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockCommentList, mockPostList } from '@app/mocks';
import {
  COMMENT_STATE_KEY,
  initialCommentState,
  initialPostState,
  LoadComments,
  POST_STATE_KEY,
} from '@app/store';
import {
  getAllElementsTextContentBySelector,
  getElementBySelector,
  getElementTextContentBySelector,
  SpinnerStubComponent,
  TranslatePipeStub,
} from '@app/testing';
import {
  ButtonComponent,
  ErrorComponent,
  errorSelector,
  spinnerSelector,
} from '@app/ui';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { UserPostComponent } from './user-post.component';

@Component({
  selector: 'app-test-host',
  template: ` <app-user-post [overlayRef]="overlayRef"> </app-user-post> `,
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
  const postKey = POST_STATE_KEY;
  const commentKey = COMMENT_STATE_KEY;
  let store$: MockStore<any>;
  const initialState = {
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
        posts: mockPostList,
        loading: false,
        error: false,
        selectedPostID,
      },
    });
    fixture.detectChanges();
    const post = getElementTextContentBySelector(fixture, '.post');
    expect(post).toEqual(selectedPost.title + selectedPost.body);
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
        posts: mockPostList,
        loading: false,
        error: false,
        selectedPostID,
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
    const comments = getAllElementsTextContentBySelector(fixture, '.comment');
    expect(comments).toEqual(expected);
  });
});
