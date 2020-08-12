import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SimpleUser } from '@app/store';

export const userCardSelector = 'app-user-card';

@Component({
  selector: userCardSelector,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() user: SimpleUser = null;
}
