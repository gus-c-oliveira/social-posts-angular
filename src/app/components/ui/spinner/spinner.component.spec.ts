import { SpinnerComponent } from './spinner.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let fixture: ComponentFixture<SpinnerComponent>;
  let component: SpinnerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a div with class loader', () => {
    const loader = fixture.debugElement.query(By.css('div.loader'))
      .nativeElement;
    expect(loader).toBeTruthy();
  });
});
