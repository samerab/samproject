import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sam-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css']
})
export class BaseContentComponent implements OnInit {

  @Input() id: string;
  @Input() parentId: string;
  @Input() level: number;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
