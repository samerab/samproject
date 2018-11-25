import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadModule } from '../upload/upload.module';
import { MaterialModule } from 'app/material/material.module';

//import components
import { SliderComponent } from './components/slider/slider.component';
import { SlideComponent } from './components/slider/slide/slide.component';

//import services
import { AnimateService,AnimationDataService,CreateService,SliderAnimationService} from './services';


//import directives
import { SlideDirective } from './directives/slide.directive';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UploadModule,
    MaterialModule
  ],
  declarations: [
    SliderComponent,
    SlideComponent,
    SlideDirective,
    SanitizeHtmlPipe,
    
  ],
  exports:      [ 
    CommonModule, 
    FormsModule,
    HttpClientModule,
    SliderComponent,
    SanitizeHtmlPipe
  ],
  entryComponents: [SlideComponent],
})
export class SharedModule { 

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ 
        AnimateService,
        AnimationDataService,
        CreateService,
        SliderAnimationService
       ]
    }
  }

}
