import {Pipe, PipeTransform} from '@angular/core';
import {Roadwork, toIconName} from '@autobahn/roadworks';

@Pipe({
  name: 'maticon',
  standalone: true
})
export class MaticonPipe implements PipeTransform {

  transform(value: Roadwork.Icon): string {
    return toIconName(value);
  }

}
