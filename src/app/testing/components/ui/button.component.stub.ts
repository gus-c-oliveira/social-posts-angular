import { Component, Input } from '@angular/core';

export const buttonSelector = 'app-button';

@Component({
  selector: buttonSelector,
  template: 'Button Stub',
})
export class ButtonComponent {
  @Input() public buttonText: any = '';
}
