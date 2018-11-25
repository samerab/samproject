import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[samFrameContent]'
})
export class FrameContentDirective {

  @Input() frameId: string;
  @Input() parentFrameId: string;


  constructor() {}

}
