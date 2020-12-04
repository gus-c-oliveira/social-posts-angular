import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsPageComponent } from './components/index';

@NgModule({
  imports: [CommonModule],
  declarations: [StatsPageComponent],
  exports: [StatsPageComponent],
})
export class StatsShellModule {}
