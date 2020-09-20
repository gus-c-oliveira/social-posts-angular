import { Component, EventEmitter, Input, Output } from '@angular/core';

export const userCardSelector = 'app-user-card';

@Component({
  selector: userCardSelector,
  template: 'User Card Stub',
})
export class UserCardComponent {
  @Input() public user: any = null;
  @Output() public selected = new EventEmitter<number>();
}
