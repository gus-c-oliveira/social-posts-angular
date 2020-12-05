import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { StatsPageComponent } from './components/index';
import { ROUTES } from './routes/index';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), TranslateModule],
  declarations: [StatsPageComponent],
  exports: [StatsPageComponent],
})
export class StatsShellModule {}
