import { Component, EventEmitter, Output } from '@angular/core';

export const errorSelector = 'app-error';

@Component({
  selector: errorSelector,
  template: 'Error Stub',
})
export class ErrorComponent {
  @Output() public tryAgain = new EventEmitter<void>();
}
