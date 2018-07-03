import { Injectable } from '@angular/core';
import { 
  trigger,useAnimation, state, style, 
  transition, animate, keyframes, AnimationBuilder, 
  AnimationPlayer, AnimationFactory
} from '@angular/animations';
import { IAnimationData } from '../../interfaces/animation.interface';


@Injectable()
export class AnimateService {

  constructor(
    private builder: AnimationBuilder
  ) { }

  
  animateElement(element, animationData: IAnimationData, infinite?: boolean){
    return new Promise((resolve, reject) => {
      const player = this.getPlayer(element, animationData);
      player.play();
      player.onDone( () => {
        player.destroy();
        resolve();    
        if (infinite && infinite === true) {
          this.animateElement(element, animationData, infinite);
        }
      });
    })
  }


  getPlayer(element, animationData: IAnimationData): AnimationPlayer{
    const animationDef = animationData.animationDef;
    const animationParams = animationData.animationParams;
    const player = this.getAnimationFactory(animationDef, animationParams).create(element);
    return player;
  }


  private getAnimationFactory(animationDef, animationParams): AnimationFactory{
    const animationFactory = this.builder.build([
      useAnimation(animationDef, animationParams)
    ]);
    return animationFactory;
  }

}
