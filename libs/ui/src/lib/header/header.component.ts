import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

export const headerSelector = 'gus-header';

@Component({
  selector: headerSelector,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() public title = '';
  @Input() public buttonText = '';
  @Output() public buttonClick = new EventEmitter<void>();

  public emitButtonClick() {
    this.buttonClick.emit();
  }
}
