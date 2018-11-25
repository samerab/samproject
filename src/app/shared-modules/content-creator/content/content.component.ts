import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { CreateContentService } from '../create-content.service';

@Component({
  selector: 'sam-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Output() updated: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private createContentService: CreateContentService) {
   }

   @ViewChild(ContainerComponent) rootContainer: ContainerComponent; 

  ngOnInit() {
    this.createContentService.html$.subscribe(_ => {
      this.updated.emit(this.rootContainer.getHtml());
    })
  }

}
