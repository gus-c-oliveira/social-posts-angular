import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockCommentList, mockPostList } from '@app/mocks';
import {
  COMMENT_STATE_KEY,
  initialCommentState,
  initialPostState,
  POST_STATE_KEY,
} from '@app/store';
import { spinnerSelector, UiModule } from '@app/ui';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { UserPostComponent } from './user-post.component';
import { Component, ViewChild } from '@angular/core';
import { Overlay, OverlayRef, OverlayModule } from '@angular/cdk/overlay';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, OverlayModule],
      declarations: [UserPostComponent, TestHostComponent],
      providers: [
        provideMockStore({
          initialState: {
            [postKey]: { ...initialPostState },
            [commentKey]: { ...initialCommentState },
          },
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    store$ = TestBed.inject(Store) as MockStore<any>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(host.postComponent).toBeTruthy();
  });

  it('should display the selected post', () => {
    const selectedPostID = 3;
    const selectedPost = mockPostList.find(
      (item) => item.id === selectedPostID
    );
    store$.setState({
      [postKey]: {
        posts: mockPostList,
        loading: false,
        error: false,
        selectedPostID,
      },
    });
    fixture.detectChanges();
    const post = fixture.debugElement
      .query(By.css('.post'))
      .nativeElement.textContent.trim();
    expect(post).toEqual(selectedPost.title + selectedPost.body);
  });

  it('should display the close icon', () => {
    const close = fixture.debugElement.query(By.css('.close')).nativeElement;
    expect(close).toBeTruthy();
  });

  it('should close the overlay after clicking the close icon', () => {
    spyOn(host.postComponent.overlayRef, 'dispose');
    fixture.debugElement.query(By.css('.close')).nativeElement.click();
    expect(host.postComponent.overlayRef.dispose).toHaveBeenCalled();
  });

  it(`should display the spinner while the post's comments are loading`, () => {
    store$.setState({
      [commentKey]: { ...initialCommentState, loading: true },
    });
    fixture.detectChanges();
    const spinner = fixture.debugElement
      .query(By.css(spinnerSelector))
      .nativeElement.textContent.trim();
    expect(spinner).toBeTruthy();
  });

  it('should display the error message if comments fail to load', () => {
    store$.setState({
      [commentKey]: { ...initialCommentState, error: true },
    });
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.error')).nativeElement;
    expect(error).toBeTruthy();
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
    const expected = mockCommentList.map(
      (item) => `Name: ${item.name}${item.body}`
    );
    const comments = fixture.debugElement
      .queryAll(By.css('.comment'))
      .map((item) => item.nativeElement.textContent.trim());
    expect(comments).toEqual(expected);
  });
});
