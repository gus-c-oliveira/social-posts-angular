import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
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
  @Input() public title = '';
  @Input() public buttonConfigs: HeaderButtonConfig[] = [];

  @Output() public buttonClick = new EventEmitter<{ type: string }>();

  public emitButtonClick(type: string) {
    this.buttonClick.emit({ type });
  }
}
