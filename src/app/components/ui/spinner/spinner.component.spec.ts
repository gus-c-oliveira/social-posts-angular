import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementBySelector } from '@app/utils';
import { TranslateModule } from '@ngx-translate/core';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let fixture: ComponentFixture<SpinnerComponent>;
  let component: SpinnerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [SpinnerComponent],
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

  it('should display a div with class loader', () => {
    const loader = getElementBySelector(fixture, 'div.loader');
    expect(loader).toBeTruthy();
  });
});
