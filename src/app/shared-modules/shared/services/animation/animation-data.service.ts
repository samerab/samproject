import { Injectable } from '@angular/core';
import { slideX, slideY } from '../../animations-def/slide';
import { fade } from '../../animations-def/fade';
import { IAnimationData } from '../../interfaces/animation.interface';

@Injectable()
export class AnimationDataService {

 

  constructor() { }

  getAnimationData(animationName, animationTime): IAnimationData {
    let animArr = this.getAnimationsArray(animationTime);
    let index = animArr.findIndex((item) => {
      return item.animationName == animationName;
    });
    if (index > -1) {
      return animArr[index];
    }
    return animArr[0];
  }

  private getAnimationsArray(time): IAnimationData[] {
    return [
      {  animationName: 'fadeInRight', 
         animationDef: fade, 
         animationParams: {params: {time,start:0, end: 1}}
      },
      {  animationName: 'slideInRight', 
         animationDef: slideX, 
         animationParams: {params:{time,start:100, end: 0, fromOpacity: 1, toOpacity: 1}}
      },
      {  animationName: 'slideInRightFade', 
         animationDef: slideX, 
         animationParams: {params:{time,start:100, end: 0, fromOpacity: 0, toOpacity: 1}}
      },
      {  animationName: 'slideInLeft', 
         animationDef: slideX, 
         animationParams: {params:{time,start:-100, end: 0, fromOpacity: 1, toOpacity: 1}}
      },
      {  animationName: 'slideInLeftFade', 
         animationDef: slideX, 
         animationParams: {params:{time,start:-100, end: 0, fromOpacity: 0, toOpacity: 1}}
      },
      {  animationName: 'slideInUp', 
         animationDef: slideY, 
         animationParams: {params:{time,start:-100, end: 0, fromOpacity: 1, toOpacity: 1}}
      },
      {  animationName: 'slideInUpFade', 
         animationDef: slideY, 
         animationParams: {params:{time,start:-100, end: 0, fromOpacity: 0, toOpacity: 1}}
      },
      {  animationName: 'slideInDown', 
         animationDef: slideY, 
         animationParams: {params:{time,start:100, end: 0, fromOpacity: 1, toOpacity: 1}}
      },
      {  animationName: 'slideInDownFade', 
         animationDef: slideY, 
         animationParams: {params:{time,start:100, end: 0, fromOpacity: 0, toOpacity: 1}}
      },
      {  animationName: 'slideOutRight', 
         animationDef: slideX, 
         animationParams: {params:{time,start:0, end: 100, fromOpacity: 1, toOpacity: 0}}
      },
      {  animationName: 'slideOutLeft', 
         animationDef: slideX, 
         animationParams: {params:{time,start:0, end: -100, fromOpacity: 1, toOpacity: 0}}
      },
      {  animationName: 'slideOutDownFade', 
         animationDef: slideY, 
         animationParams: {params:{time,start:0, end: 100, fromOpacity: 1, toOpacity: 0}}
      },
      {  animationName: 'slideOutUpFade', 
         animationDef: slideY, 
         animationParams: {params:{time,start:0, end: -100, fromOpacity: 1, toOpacity: 0}}
      },
      
    ];
  }
  

}
