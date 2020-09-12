import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent, buttonSelector } from '../button';
import { ErrorComponent, errorSelector } from './error.component';

@Component({
  selector: 'app-test-host',
  template: `
    <app-error (tryAgain)="retry()">
      <span class="error__message">Error</span>
    </app-error>
  `,
})
class TestHostComponent {
  public retry() {}
}

describe('ErrorComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent, TestHostComponent, ErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const errorComponent = fixture.debugElement.query(By.css(errorSelector))
      .nativeElement;
    expect(errorComponent).toBeTruthy();
  });

  it('should display its content using content projection', () => {
    const errorMessage = fixture.debugElement.query(By.css('.error__message'))
      .nativeElement;
    expect(errorMessage).toBeTruthy();
  });

  it('should display the try again button', () => {
    const tryAgainButton = fixture.debugElement.query(By.css(buttonSelector))
      .nativeElement;
    expect(tryAgainButton).toBeTruthy();
  });

  it('should emit an event when the try again button is clicked', () => {
    spyOn(host, 'retry');
    fixture.debugElement.query(By.css(buttonSelector)).nativeElement.click();
    expect(host.retry).toHaveBeenCalled();
  });
});
