import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'noSanitize'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }
  // الغاء التطهير و التنقية تبع انجولار
  transform(val:string, type: string):SafeHtml {
    if (type === 'url') {
      return this._sanitizer.bypassSecurityTrustResourceUrl(val);
    } else {
      return this._sanitizer.bypassSecurityTrustHtml(val);
    } 
  }
}