import { Pipe, PipeTransform } from '@angular/core';
import {SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'safeHtmlToString'
})
export class SafeHtmlToStringPipe implements PipeTransform {
  transform(value?: SafeHtml): string {
    if (value) {
      return (value as any).changingThisBreaksApplicationSecurity;
    }

    return '';
  }
}
