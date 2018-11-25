
import { 
  Component,QueryList,Renderer2,
  OnInit, AfterViewInit, OnDestroy,
  Input, HostBinding, ViewChild, ViewChildren,
  ElementRef, TemplateRef, HostListener, ChangeDetectorRef, ViewContainerRef
} from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { SlideDirective } from '../../directives/slide.directive';
import { CreateService, SliderAnimationService } from '../../services';
import { SliderDirection, SlideStatus } from '../../enums';
import { promise } from 'protractor';




@Component({
  selector: 'sam-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  //@ViewChild(SlideDirective, { read: ViewContainerRef}) viewContainer: ViewContainerRef;
  @ViewChildren(SlideComponent) slides: QueryList<SlideComponent>;
  @ViewChild('arrowsDiv') arrowsDiv: ElementRef;
  @ViewChild('leftArrow') leftArrow: ElementRef;
  @ViewChild('rightArrow') rightArrow: ElementRef;

  /////
  @Input() files = [
    'https://s-media-cache-ak0.pinimg.com/originals/58/de/ec/58deec91641a43a1495ea59897935be5.jpg',
    'http://assets.rebelcircus.com/blog/wp-content/uploads/2015/02/HEADER-P2.jpg',
    'https://i.pinimg.com/originals/a6/15/f8/a615f8abdba966ed7010d870308867b7.jpg',
    'https://mindbodygreen-res.cloudinary.com/image/upload/c_fill,w_700,h_400,g_auto,q_90,fl_lossy,f_jpg/crp/lauren_bongiorno_oct2017-850x478.jpg',
    'https://imageresizer.static9.net.au/BtemqV8kpdG2KEDbSgP1VavIEN8=/http%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2FNetwork%2FImages%2F2017%2F02%2F08%2F15%2F57%2FActivewearHeader.jpg',
    'http://www.readunwritten.com/wp-content/uploads/thigh-highs-e1456295125996.jpg'
  ];
  @Input() links = [];
  @Input() animations = [];
  @Input() showTime: number = 3000;
  @Input() animationTime: string = '1s';
  @Input() width:string;
  @Input() height:string;  
  @Input() overflow = 'visible';
  ////
  private interval: any;
  private currentSlide: number = -1;
  private previosSlide: number;
  private stopped: boolean = false;
  private animGroupsArr;
  /********************************************************
  * Constructor
  *********************************************************/

  constructor(
    private renderer: Renderer2,
    private createService: CreateService,
    private sliderAnimationService: SliderAnimationService
  ) { }

  /********************************************************
  * LifeCycle
  *********************************************************/

  setStyle(){
    let el = this.arrowsDiv.nativeElement;
    this.renderer.setStyle(el,'width',this.width);
    this.renderer.setStyle(el,'height',this.height);
  }
  
  ngOnInit() {
    
    this.setSliderDimensions().then((size) => {
      if (!this.width) {
        this.width = size['width'] + 'px';
      }
      if (!this.height) {
        this.height = size['height'] + 'px';
      }
    });
    this.setShortcuts();
    this.sliderAnimationService.getAnimObservable().subscribe( arr => {
      this.animGroupsArr = arr['groups'];
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.runSlider(SliderDirection.Next);
      this.setStyle();
    }, 0);

    
  }

  /********************************************************
  * Methods
  *********************************************************/

 setSliderDimensions(){
  return new Promise((resolve,reject) => {
    let img = new Image();
    img.src = this.files[0];
    img.onload = function() {
       resolve({width: img.width, height: img.height})
    };  
  });
    
}


  onLeftArrowClick(){
    this.goToPrevios();
  }

  onRightArrowClick(){
    this.goToNext()
  }
  
  goToNext() {
    clearInterval(this.interval);
    this.runSlider(SliderDirection.Next);
  }
  
  goToPrevios() {
    clearInterval(this.interval);
    this.runSlider(SliderDirection.Previos,-1);
  }
  
  selectSlide(slideToGo: number){
    clearInterval(this.interval);
    this.runSlider(SliderDirection.Next,slideToGo);
  }
  
  stopSlider(){
    clearInterval(this.interval);
    this.stopped = true;
  }
  /*
    runSlider can take one of 3 parameters
       nothing => go to next slide
       -1      => go to previos slide
       number  => index in dataArray
  */ 
  runSlider(direction: SliderDirection,slideToGo?: number) {
    this.stopped = false;
    this.showSlide(direction,slideToGo);
    this.interval = setInterval(() => {
      this.showSlide(direction,slideToGo)
    }, this.showTime);
  }

  toggleSlider(){
    this.stopped === true ? this.goToNext() : this.stopSlider()
  }
  

  
  showSlide(direction: SliderDirection,slideToGo?: number){
    /*
      change current slide
    */
    this.previosSlide = this.currentSlide ;
    this.currentSlide = this.setCurrentSlide(this.currentSlide, this.files.length,slideToGo);
    /*
      get current slide data
    */
    this.sliderAnimationService.setSlides(
      this.slides,
      this.animations,
      this.animGroupsArr,
      this.links,
      this.currentSlide,
      this.previosSlide,
      this.animationTime,
      direction
    );
    
  }

  

  setCurrentSlide(currentSlide: number,arrayLength: number, slideToGo?: number): number {
    let order,
        newCurrentSlide;
    if (!slideToGo) {
      order = this.createService.getCurrentOrder(currentSlide, arrayLength);
      newCurrentSlide = order[0];
    }
    else if (slideToGo && slideToGo == -1) {
      newCurrentSlide = arrayLength - 1 - ((arrayLength - currentSlide) % arrayLength);  
    }
    // if (!slideToGo) {
    //   newCurrentSlide = order[0];
    // }
    // else if (slideToGo && slideToGo == -1) {
    //   newCurrentSlide = order[1];
    // }
    // else if(slideToGo && slideToGo > -1 && slideToGo < this.files.length){
    //   newCurrentSlide = slideToGo;
    // }
    // else {
    //   throw new Error('slideToGo in setCurrentSlide function is wrong');     
    // }
    return newCurrentSlide;
  }

  setShortcuts(){
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 39 || event.keyCode === 40) {
        this.goToNext();
      }
      else if (event.keyCode === 37 || event.keyCode === 38) {
        this.goToPrevios();
      }
      else if (event.keyCode === 32) {
        this.toggleSlider();
      }
    });
  }

  

  
}
