import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button';
import { ErrorComponent } from './error';
import { HeaderComponent } from './header';
import { SpinnerComponent } from './spinner';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent,
    ErrorComponent,
    HeaderComponent,
    SpinnerComponent,
  ],
  exports: [ButtonComponent, ErrorComponent, HeaderComponent, SpinnerComponent],
})
export class UiModule {}
