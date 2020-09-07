import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header';
import { SpinnerComponent } from './spinner';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent, SpinnerComponent],
  exports: [HeaderComponent, SpinnerComponent],
})
export class UiModule {}
