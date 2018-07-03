import { Injectable } from '@angular/core';
import {
  ElementRef, ComponentFactoryResolver, ViewContainerRef
} from '@angular/core';
import { SlideComponent } from '../../components/slider/slide/slide.component';

@Injectable()
export class CreateService {

  constructor(
    private resolver: ComponentFactoryResolver,
  ) { }


  createComponent(SlideComponent, viewContainerRef, properties: object) {
    let componentFactory = this.resolver.resolveComponentFactory(SlideComponent);
    //viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    for (let property in properties) {

      (<SlideComponent>componentRef.instance)[property] = properties[property];
    }
  }

  getCurrentOrder(currentOrder, arrayLength): Array<number>{
    let orderArr = [];
    let current = (currentOrder + 1) % arrayLength;
    orderArr.push(current);
    let previous1 = currentOrder == -1 ? arrayLength - 1 : currentOrder;
    orderArr.push(previous1);
    for(let i = 2; i < arrayLength; i++){
      let previous = orderArr[i-1] == 0 ? arrayLength - 1 : orderArr[i-1] - 1;
      orderArr.push(previous);
    }
    return orderArr;
  }


}
