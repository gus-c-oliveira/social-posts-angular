import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonStubComponent, buttonSelector } from '@gus/ui/testing';
import { getElementBySelector, TranslatePipeStub } from '@gus/testing';

import { ErrorComponent, errorSelector } from './error.component';

@Component({
  selector: 'gus-test-host',
  template: `
    <gus-error (tryAgain)="retry()">
      <span class="error__message">Error</span>
    </gus-error>
  `,
})
class TestHostComponent {
  public retry() {}
}

describe('ErrorComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ButtonStubComponent,
        TestHostComponent,
        ErrorComponent,
        TranslatePipeStub,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const errorComponent = getElementBySelector(fixture, errorSelector);
    expect(errorComponent).toBeTruthy();
  });

  it('should display its content using content projection', () => {
    const errorMessage = getElementBySelector(fixture, '.error__message');
    expect(errorMessage).toBeTruthy();
  });

  it('should display the try again button', () => {
    const tryAgainButton = getElementBySelector(fixture, buttonSelector);
    expect(tryAgainButton).toBeTruthy();
  });

  it('should emit an event when the try again button is clicked', () => {
    spyOn(host, 'retry');
    getElementBySelector(fixture, buttonSelector).click();
    expect(host.retry).toHaveBeenCalled();
  });
});
