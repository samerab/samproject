import { Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AnimateService } from '@shared/services';
import { fade } from '@shared/animations-def/fade';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'sam-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent extends BaseContentComponent implements OnInit {

  url = 'https://www.youtube.com/watch?v=5OwNo3aih-4';

  constructor(
    private sanitizer: DomSanitizer, 
    ) {
      super();
    // if (this.data) {

    //   this.url = 'https://www.youtube.com/watch?v=5OwNo3aih-4'; // sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=5OwNo3aih-4')
    // }
   }

  ngOnInit() {    
  }


  // html = `<div style="display:block" class="col-12">
  //   <iframe 
  //   width="100%" 
  //   height="315" 
  //   src="https://www.youtube.com/embed/ul4z6sLnXYY?start=120" 
  //   frameborder="0" 
  //   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
  //   allowfullscreen>
  //   </iframe>
  //   </div>
  //   <button (click)="onClick()">remove</button>
  //   <br>`
}
