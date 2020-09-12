import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button';
import { HeaderComponent } from './header';
import { SpinnerComponent } from './spinner';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, HeaderComponent, SpinnerComponent],
  exports: [HeaderComponent, SpinnerComponent],
})
export class UiModule {}
