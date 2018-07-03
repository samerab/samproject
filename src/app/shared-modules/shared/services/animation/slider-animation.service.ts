import { Injectable, QueryList } from '@angular/core';
import { ISlideAnimation } from '../../interfaces/animation.interface';
import { SliderDirection, SlideStatus } from '../../enums';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SliderAnimationService {

  animationGroup: ISlideAnimation;

  constructor(
    private http: HttpClient
  ) { }


  setSlides(
    slides: QueryList<any>,
    animations: Array<string>,
    animGroupsArr,
    links: Array<string>,
    currSlide: number,
    prevSlide: number,
    animTime: string,
    direction: SliderDirection
    ) {
    slides.forEach((slide, index) => {
      let linkToOpen = this.getSlideLink(index, links);
      let animation;

      if (index == currSlide) {
        slide.linkToOpen = linkToOpen;
        slide.animationTime = animTime;
        animation = this.getSlideAnimation(
          SlideStatus.enter,
          direction,
          index,
          animations,
          animGroupsArr
        );
        slide.status = SlideStatus.enter;
        slide.showWithAnimation(animation);
      }
      else if (index == prevSlide) {
        slide.linkToOpen = linkToOpen;
        slide.animationTime = animTime;
        animation = this.getSlideAnimation(
          SlideStatus.leave,
          direction,
          index,
          animations,
          animGroupsArr
        );
        slide.status = SlideStatus.leave;
        slide.hideWithAnimation(animation);
      }
      else {
        slide.status = SlideStatus.hidden;
        slide.hide();
      }

    })
  }



  

  getSlideAnimation(status, direction, slideIndex, animations, animGroupsArr): ISlideAnimation {
    let slideAnim = this.getAnimObj(animations, animGroupsArr, slideIndex);
    let animation;

    if (status == SlideStatus.enter) {
      switch (direction) {
        case SliderDirection.Next:
          animation = slideAnim.enterAnimationNext;
          break;
        case SliderDirection.Previos:
          animation = slideAnim.enterAnimationPrev;
          break;
      }
    }
    else if (status == SlideStatus.leave) {
      switch (direction) {
        case SliderDirection.Next:
          animation = slideAnim.leaveAnimationNext;
          break;
        case SliderDirection.Previos:
          animation = slideAnim.leaveAnimationPrev;
          break;
      }
    }

    return animation;

  }

  getAnimObj(animations, animGroupsArr, slideIndex,useDefault: boolean = false) {
    let enterAnimationNext: string;
    let enterAnimationPrev: string;
    let leaveAnimationNext: string;
    let leaveAnimationPrev: string;
    let animGroup;
    let animation;

    if (animations.length == 0) {
      /*
        default Animation
      */
      return {
        enterAnimationNext: 'slidInLeft',
        leaveAnimationNext: 'slidOutRight',
        enterAnimationPrev: 'slidInRight',
        leaveAnimationPrev: 'slidOutLeft'
      }

    }
    else {
      let index = slideIndex % animations.length;
      let groupName = animations[index];
      
      if(animGroupsArr.length == 0){
        animGroup = {};
      }
      let arrayIndex = animGroupsArr.findIndex((item) => {
        return item.groupName == groupName;
      });
      if (index > -1) {
        animGroup = animGroupsArr[arrayIndex];
      }
      else {
        if (useDefault) {
          animGroup = animGroupsArr[0];
        }
        else {
          animGroup = {};
        }

      }
      return {
        enterAnimationNext: animGroup.enterAnimationNext,
        leaveAnimationNext: animGroup.leaveAnimationNext,
        enterAnimationPrev: animGroup.enterAnimationPrev,
        leaveAnimationPrev: animGroup.leaveAnimationPrev
      }

    }
  }



  getSlideLink(slideIndex, linksArray): string {
    let linkToOpen;
    if (linksArray.length == 0) {
      /*
        default Link
      */
      linkToOpen = '#';
    }
    else {
      let index = slideIndex % linksArray.length;
      linkToOpen = linksArray[index];
    }

    return linkToOpen;
  }


  getAnimObservable() {
    return this.http.get<ISlideAnimation>('http://localhost:3000/animations/slider');
  }







}
