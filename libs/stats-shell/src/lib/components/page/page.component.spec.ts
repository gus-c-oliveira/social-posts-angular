import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageModule } from '@gus/language';
import { getElementTextContentByDataTest } from '@gus/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { StatsPageComponent } from './page.component';

describe('StatsPageComponent', () => {
  let component: StatsPageComponent;
  let fixture: ComponentFixture<StatsPageComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        StoreModule.forRoot({}),
        LanguageModule,
      ],
      declarations: [StatsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display warning message', () => {
    const message = getElementTextContentByDataTest(fixture, 'warning');
    expect(message).toEqual('STATS.WARNING');
  });
});
