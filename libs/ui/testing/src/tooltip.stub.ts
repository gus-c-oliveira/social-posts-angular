import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[gusTooltip]',
})
export class TooltipStubDirective {
  @Input() public tooltipText: any;
}
