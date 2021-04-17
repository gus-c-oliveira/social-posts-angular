import { ChangeDetectionStrategy, Component } from '@angular/core';

export const spinnerSelector = 'gus-spinner';

@Component({
  selector: spinnerSelector,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
