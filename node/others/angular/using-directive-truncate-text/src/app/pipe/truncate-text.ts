import { Input, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'text',
  standalone: true,
})
export class TruncateText implements PipeTransform {
  transform(value: string = '', truncateText: number = 50): string {

    if (!value) {
       return "";
    }

    if (value.length > truncateText) {
      return value.slice(0, truncateText) + '...';
    } else {
      return value;
    }

  }
}
