import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  pure: true,
})
export class TranslatePipeStub implements PipeTransform {
  public transform(s: string): string {
    return s;
  }
}
