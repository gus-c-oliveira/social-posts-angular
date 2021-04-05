import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
  HostBinding,
} from '@angular/core';
import { SimpleUser } from '@gus/user-store';

export const userCardSelector = 'gus-user-card';

@Component({
  selector: userCardSelector,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @HostBinding('attr.data-test') readonly dataTest = userCardSelector;

  @Input() public user: SimpleUser = null;
  // Emits the user id when card is clicked.
  @Output() public selected = new EventEmitter<number>();
}
