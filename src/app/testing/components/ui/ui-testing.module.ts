import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component.stub';
import { ErrorComponent } from './error.component.stub';
import { HeaderComponent } from './header.component.stub';
import { LanguageSelectorComponent } from './language-selector.component.stub';
import { SpinnerComponent } from './spinner.component.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent,
    ErrorComponent,
    HeaderComponent,
    LanguageSelectorComponent,
    SpinnerComponent,
  ],
  exports: [
    ButtonComponent,
    ErrorComponent,
    HeaderComponent,
    LanguageSelectorComponent,
    SpinnerComponent,
  ],
})
export class UiTestingModule {}
