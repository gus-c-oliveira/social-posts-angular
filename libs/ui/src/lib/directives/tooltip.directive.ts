import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { animate, style, transition, trigger } from '@angular/animations';

@Directive({
  selector: '[gusTooltip]',
})
export class TooltipDirective implements OnInit {
  @Input() public tooltipText = '';

  private overlayRef: OverlayRef;
  private portal: ComponentPortal<TooltipComponent>;

  @HostListener('mouseenter') public show() {
    const tooltip: TooltipComponent = this.overlayRef.attach(this.portal)
      .instance;
    tooltip.text = this.tooltipText;
  }

  @HostListener('mouseleave') public hide() {
    this.overlayRef.detach();
  }

  public constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private positionBuilder: OverlayPositionBuilder
  ) {}

  public ngOnInit() {
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
        },
      ]);
    this.overlayRef = this.overlay.create({ positionStrategy });
    this.portal = new ComponentPortal(TooltipComponent);
  }
}

@Component({
  selector: 'gus-tooltip',
  template: '<span @tooltip>{{ text }}</span>',
  styles: [
    `
      span {
        position: relative;
        top: -1rem;
        padding: 0.5rem 1rem;
        color: #fff;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 0.5rem;
        transition: all 0.3s;
        animation-fill-mode: forwards;
      }
    `,
  ],
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0, top: '1rem' }),
        animate(300, style({ opacity: 1, top: '-1rem' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  @Input() public text = '';
}
