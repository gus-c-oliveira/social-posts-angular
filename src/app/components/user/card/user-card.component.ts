import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { SimpleUser } from '@app/store';

export const userCardSelector = 'app-user-card';

@Component({
  selector: userCardSelector,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() public user: SimpleUser = null;
  // Emits the user id when card is clicked.
  @Output() public selected = new EventEmitter<number>();
}
