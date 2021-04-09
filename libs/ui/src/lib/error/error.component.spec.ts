import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonStubComponent } from '@gus/ui/testing';
import { getElementByDataTest, TranslatePipeStub } from '@gus/testing';

import { ErrorComponent, errorSelector } from './error.component';

@Component({
  selector: 'gus-test-host',
  template: `
    <gus-error (tryAgain)="retry()">
      <span [attr.data-test]="'error-message'">Error</span>
    </gus-error>
  `,
})
class TestHostComponent {
  public retry() {}
}

describe('ErrorComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ButtonStubComponent,
          TestHostComponent,
          ErrorComponent,
          TranslatePipeStub,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const errorComponent = getElementByDataTest(fixture, errorSelector);
    expect(errorComponent).toBeTruthy();
  });

  it('should display its content using content projection', () => {
    const errorMessage = getElementByDataTest(fixture, 'error-message');
    expect(errorMessage).toBeTruthy();
  });

  it('should display the try again button', () => {
    const tryAgainButton = getElementByDataTest(fixture, 'ui-button');
    expect(tryAgainButton).toBeTruthy();
  });

  it('should emit an event when the try again button is clicked', () => {
    spyOn(host, 'retry');
    getElementByDataTest(fixture, 'ui-button').click();
    expect(host.retry).toHaveBeenCalled();
  });
});
