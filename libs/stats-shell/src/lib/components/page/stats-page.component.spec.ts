import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { getElementTextContentBySelector } from '@gus/testing';

import { selector, StatsPageComponent } from './stats-page.component';
import { StoreModule } from '@ngrx/store';
import { LanguageModule } from '@gus/language';

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
    const message = getElementTextContentBySelector(fixture, '.warning');
    expect(message).toEqual('STATS.WARNING');
  });
});
