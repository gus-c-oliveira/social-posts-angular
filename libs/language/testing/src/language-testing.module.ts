import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LanguageSelectorStubComponent } from './language-selector.component.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [LanguageSelectorStubComponent],
  exports: [LanguageSelectorStubComponent],
})
export class LanguageSelectorTestingModule {}
