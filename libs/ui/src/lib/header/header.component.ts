import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { HeaderButtonConfig } from './header.model';

export const headerSelector = 'gus-header';

@Component({
  selector: headerSelector,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @HostBinding('attr.data-test') readonly dataTest = headerSelector;

  @Input() public title = '';
  @Input() public buttonConfigs: HeaderButtonConfig[] = [];

  @Output() public buttonClick = new EventEmitter<{ type: string }>();

  public emitButtonClick(type: string) {
    this.buttonClick.emit({ type });
  }
}
