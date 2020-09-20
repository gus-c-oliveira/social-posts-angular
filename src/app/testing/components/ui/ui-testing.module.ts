import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonStubComponent } from './button.component.stub';
import { ErrorStubComponent } from './error.component.stub';
import { HeaderStubComponent } from './header.component.stub';
import { LanguageSelectorStubComponent } from './language-selector.component.stub';
import { SpinnerStubComponent } from './spinner.component.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonStubComponent,
    ErrorStubComponent,
    HeaderStubComponent,
    LanguageSelectorStubComponent,
    SpinnerStubComponent,
  ],
  exports: [
    ButtonStubComponent,
    ErrorStubComponent,
    HeaderStubComponent,
    LanguageSelectorStubComponent,
    SpinnerStubComponent,
  ],
})
export class UiTestingModule {}
