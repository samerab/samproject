import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[samMainContainer]'
})
export class MainContainerDirective {

  @Input() containerRefId: string;
  @Input() containerLevel: number;

  constructor(public viewContainerRef: ViewContainerRef) { }

}
