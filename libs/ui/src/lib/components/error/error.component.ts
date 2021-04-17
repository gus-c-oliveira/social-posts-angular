import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Output,
} from '@angular/core';

export const errorSelector = 'gus-error';

@Component({
  selector: errorSelector,
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @HostBinding('attr.data-test') readonly dataTest = errorSelector;

  @Output() public tryAgain = new EventEmitter<void>();
}
