import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import {
  ButtonComponent,
  ErrorComponent,
  HeaderComponent,
  SpinnerComponent,
} from './components/index';
import { TooltipDirective } from './directives';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [
    ButtonComponent,
    ErrorComponent,
    HeaderComponent,
    SpinnerComponent,
    TooltipDirective,
  ],
  exports: [
    ButtonComponent,
    ErrorComponent,
    HeaderComponent,
    SpinnerComponent,
    TooltipDirective,
  ],
})
export class UiModule {}
