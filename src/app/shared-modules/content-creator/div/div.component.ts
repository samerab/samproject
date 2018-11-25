import { Component, OnInit, ViewChildren, QueryList, ViewContainerRef } from '@angular/core';
import { ActionService } from '@shared/services/action/action.service';
import { CreateContentService } from '../create-content.service';
import { ContainerComponent } from '../container/container.component';
import { BaseContentComponent } from '../base-content/base-content.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'sam-div',
  templateUrl: './div.component.html',
  styleUrls: ['./div.component.css']
})
export class DivComponent extends BaseContentComponent implements OnInit {
  
  @ViewChildren('ContainerComponent') container: QueryList<ContainerComponent>;

  constructor() { 
    super();
  }

  ngOnInit() {}

  getClass(div){
    return `col-${div.class}`
  }

  getHtml() {
    let html = '<div class="row">';
    this.data.forEach((div, index) => {
      html += `<div class="col-${div.class}">`;
      if (this.container) {
        html += this.container.toArray()[index].getHtml();
      }
      html += `</div>`;
    });
    html += `</div>`;
    return html;
  }

  generateId(prefix: string) {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
  }

  

}
