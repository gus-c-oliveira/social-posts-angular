import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByDataTest, TranslatePipeStub } from '@gus/testing';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let fixture: ComponentFixture<SpinnerComponent>;
  let component: SpinnerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent, TranslatePipeStub],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a div representing the spinner', () => {
    const loader = getElementByDataTest(fixture, 'loader');
    expect(loader).toBeTruthy();
  });
});
