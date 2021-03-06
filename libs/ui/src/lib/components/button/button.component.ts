import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export const buttonSelector = 'gus-button';

@Component({
  selector: buttonSelector,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() public buttonText = '';
}
