import { 
  Component, Renderer2,
  OnInit, AfterViewInit, OnDestroy,
  Input, HostBinding, ViewChild, 
  ElementRef, TemplateRef, HostListener, ChangeDetectorRef
} from '@angular/core';
import { AnimateService } from '../../../services/animation/animate.service'
import { AnimationDataService } from '../../../services/animation/animation-data.service'
import { SlideStatus } from '../../../../shared/enums'

@Component({
  selector: 'sam-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, AfterViewInit, OnDestroy {

  /********************************************************
  * Inputs
  *********************************************************/
  @Input() width;
  @Input() height;
  @Input() overflow;

  @ViewChild('img') img: ElementRef;
  @ViewChild('showArea') showArea: ElementRef;
  @Input() file: string;

  linkToOpen: string;
  animationTime: string;
  visible: boolean = true;
  status: SlideStatus; // hidden || enter || leave
  

  /********************************************************
  * Constructor
  *********************************************************/

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private animateService: AnimateService,
    private animationDataService: AnimationDataService
  ) { }

  /********************************************************
  * Lifecycle Hooks
  *********************************************************/

  ngOnInit() {
    
  }

  ngOnChanges(){
    this.setStyle();
  }

  ngAfterViewInit() {
    this.setStyle();
  }

  ngOnDestroy(){
    this.setStyle();
  }

  /********************************************************
  * Methods
  *********************************************************/

 setStyle(){
  let el = this.showArea.nativeElement;
  this.renderer.setStyle(el,'width',this.width);
  this.renderer.setStyle(el,'height',this.height);
  this.renderer.setStyle(el,'overflow',this.overflow);
  this.renderer.setStyle(el,'margin','0 auto');
  //this.renderer.setStyle(el,'border','5px solid green');
}
  

  showWithAnimation(animation: string){
    /* show */
    this.show();
    /* refresh */
    this.detectChanges();
    
    /* get animation details or infos */
    let animationData = this.animationDataService.getAnimationData(
      animation,
      this.animationTime
    )

    /* run animation */
    if (this.img) {
      this.animateService.animateElement(
        this.img.nativeElement, 
        animationData
      )
    }

  }

  hideWithAnimation(animation: string){
    if (this.img) {
      /* get animation details or infos */
      let animationData = this.animationDataService.getAnimationData(
        animation,
        this.animationTime
      )
      /* run animation */
      this.animateService.animateElement(
        this.img.nativeElement, 
        animationData
      ).then(() => {
        /* hide then refresh */
        this.hide();
        this.detectChanges();
      })
    }
  }

  show(){
    this.visible = true;
    
    
  }

  hide(){
    this.visible = false;
  }

  detectChanges(){
    this.changeDetectorRef.detach();
    this.changeDetectorRef.detectChanges();
  }

}
