import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthComponent } from './components/index';
import { AuthGuardService, AuthService } from './service/index';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthComponent],
  exports: [AuthComponent],
  providers: [AuthService, AuthGuardService],
})
export class AuthModule {}
