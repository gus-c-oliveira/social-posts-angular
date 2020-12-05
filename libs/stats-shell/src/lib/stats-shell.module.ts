import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StatsPageComponent } from './components/index';
import { ROUTES } from './routes/index';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [StatsPageComponent],
  exports: [StatsPageComponent],
})
export class StatsShellModule {}
