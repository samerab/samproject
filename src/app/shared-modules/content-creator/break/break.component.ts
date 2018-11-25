import { Component, OnInit } from '@angular/core';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'sam-break',
  templateUrl: './break.component.html',
  styleUrls: ['./break.component.css']
})
export class BreakComponent extends BaseContentComponent implements OnInit {

  breakHeight;
  
  constructor() { 
    super();
  }
  
  ngOnInit() {

    this.breakHeight = {
      'height': this.data ? this.data + 'px' : '5px'
    };
  }

}
