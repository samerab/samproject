import { Injectable, ComponentFactoryResolver, Type, ComponentRef, EmbeddedViewRef, ViewContainerRef, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ActionService, Action } from '@shared/services/action/action.service';
import { AnimateService } from '@shared/services';
import { PopupComponent } from '../popup/popup.component';
import { INFO } from './container/component-info';
import { itemComponent, ContainerComponent } from './container/container.component';
import { slideY, slideX } from '@shared/animations-def/slide';
import { MainContainerDirective } from './directives/main-container.directive';
import { Grid } from '../popup/data.interface';
import { DivComponent } from './div/div.component';
import { ContentComponent } from './content/content.component';

const ANIMATION_CONFIG = {  
  animationName: 'slideInUp', 
  animationDef: slideY, 
  animationParams: {params:{time:'.5s',start:-100, end: 0, fromOpacity: 1, toOpacity: 1}}
}

export interface SenderData {
  componentId:string,
  containerId: string,
  componentRef: ComponentRef<any>
} 

@Injectable({
  providedIn: 'root'
})
export class CreateContentService {

  dataSubject: Subject<number> = new Subject<number>();
  data$ = this.dataSubject.asObservable();

  htmlSubject: Subject<null> = new Subject<null>();
  html$ = this.htmlSubject.asObservable();

  // childrenArray: ComponentRef<any>[] = [];
  // allChildren: {containerId: string, children: ComponentRef<any>[]}[] = [{containerId: 'root', children: []}];
  container: ViewContainerRef
  senderData: SenderData = null;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public dialog: MatDialog,
    private actionService: ActionService,
    private animateService: AnimateService
  ) { }

  // getAllChildren(): ComponentRef<any>[] {
  //   const arr = [];
  //   this.allChildren.forEach(child => {
  //     arr.push(...child.children);
  //   });
  //   // console.log('arr ', arr);
  //   return arr;
  // }

  // openDialog(container: MainContainerDirective): void {
  //   const dialogRef = this.dialog.open(PopupComponent, {
  //     width: '75%',
  //     data: {
  //       type: 'select-component'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe( componentName => {
  //     if (componentName) {
  //       this.getComponentData(componentName, container);
  //     }
  //   });
  // }

  // getComponentData(componentName: string, container: MainContainerDirective) {
  //   const dialogRef = this.dialog.open(PopupComponent, INFO[componentName].config);
  //   dialogRef.afterClosed().subscribe( componentData => {
  //     if (componentData) {
  //       this.loadComponent(INFO[componentName].type, componentData, container);
  //     }
  //   });

  // }

  // loadComponent(componentName: Type<any>, data: any, container: MainContainerDirective) {
  //   let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentName);
  //   let componentRef = container.viewContainerRef.createComponent(componentFactory);
  //   this.setProperties(componentRef, componentName, container, data);
  //   this.childrenArray.push(componentRef);
  //   this.animateComponent(componentRef, ANIMATION_CONFIG); 
  //   this.sendHTML();
  // }

  // loadComponent(componentName: Type<any>, data: any, container: MainContainerDirective) {
  //   let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContentComponent);
  //   let componentRef = container.viewContainerRef.createComponent(componentFactory);
  //   this.setProperties(componentRef, componentName, container, data);
  //   this.childrenArray.push(componentRef);
  //   this.animateComponent(componentRef, ANIMATION_CONFIG); 
  //   // this.sendHTML();
  // }

  // private setProperties(componentRef: ComponentRef<any>, componentName: Type<any>, container: MainContainerDirective, data: any) {
  //   const instance = <itemComponent>componentRef.instance;
  //   instance.id = this.generateId(componentName.name);
  //   instance.parentId = container.containerRefId;
  //   instance.level = container.containerLevel + 1;
  //   // instance.type = componentName;
  //   instance.data = data;
    
  // }

  // getHtml() {
  //   let html = '';
  //   this.getAllChildren().forEach(child => {
  //     const instance = <itemComponent>child.instance;
  //     const parentId = instance.parentId;
  //     if (parentId === 'root') {
  //       if (instance instanceof DivComponent) {
  //         html += instance.getHtml();
  //       } else {
  //         html += this.getChildHtml(child, html);
  //       }
  //     }
  //   });
  //   return html;
  // }

  // private getChildHtml(child: ComponentRef<any>, html: string) {
  //   const component = (child.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  //   const frame = component.firstChild as HTMLElement;
  //   const target = frame.querySelector('.target');
  //   html = target.innerHTML;
  //   return html;
  // }

  sendHTML() {
    this.htmlSubject.next();
    // console.log('Hoon HTML ', this.getHtml())
  }

  // private animateComponent(componentRef: ComponentRef<any>, config) {
  //   const component = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  //   const frame = component.firstChild as HTMLElement;
  //   const target = frame.querySelector('#wrapper');
  //   this.animateService.animateElement(target, config, false);
  // }

//   moveInArray(arr, old_index, new_index) {
//     if (new_index >= arr.length) {
//         var k = new_index - arr.length + 1;
//         while (k--) {
//             arr.push(undefined);
//         }
//     }
//     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
// };



  // delete(id: string, container: MainContainerDirective) {
  //   const componentRef = this.childrenArray.find((componentRef) => {
  //     return (<itemComponent>componentRef.instance).id === id;
  //   });
  //   const componentIndex = this.childrenArray.indexOf(componentRef);

  //   if (componentIndex !== -1) {
  //     // const config = {  
  //     //   animationName: 'slideOutRight', 
  //     //   animationDef: slideX, 
  //     //   animationParams: {params:{time: '1s',start:0, end: 100, fromOpacity: 1, toOpacity: 0}}
  //     // }
  //     // this.animateComponent(componentRef, config);
  //       container.viewContainerRef.remove(container.viewContainerRef.indexOf(componentRef.hostView));
  //       this.childrenArray.splice(componentIndex, 1);
  //   }
  //   this.sendHTML();
  // }

  // moveUp(id: string, container: MainContainerDirective) {
  //   const componentRef = this.getComponentRef(id);
  //   const componentIndex = this.childrenArray.indexOf(componentRef);

  //   if (componentIndex !== -1) {
  //     const vcrIndex = container.viewContainerRef.indexOf(componentRef.hostView);
  //     if (vcrIndex > 0) {
  //       container.viewContainerRef.move(componentRef.hostView, vcrIndex-1);
  //       this.animateComponent(componentRef, ANIMATION_CONFIG);
  //     }
  //     this.moveInArray(this.childrenArray, componentIndex, componentIndex-1);
  //   }
  // }

  

  
  // moveDown(id: string, container: MainContainerDirective) {
  //   const componentRef = this.getComponentRef(id);
  //   const componentIndex = this.childrenArray.indexOf(componentRef);
    
  //   if (componentIndex !== -1) {
  //     const vcrIndex = container.viewContainerRef.indexOf(componentRef.hostView);
  //     if (vcrIndex < container.viewContainerRef.length-1) {
  //       container.viewContainerRef.move(componentRef.hostView, vcrIndex+1);
  //       this.animateComponent(componentRef, ANIMATION_CONFIG);
  //     }
  //     // this.childrenArray.splice(componentIndex, 1);
  //   }
  // }

  // moveToStart(id: string, container: MainContainerDirective) {
  //   const componentRef = this.getComponentRef(id);
  //   const componentIndex = this.childrenArray.indexOf(componentRef);
    
  //   if (componentIndex !== -1) {
  //     const vcrIndex = container.viewContainerRef.indexOf(componentRef.hostView);
  //     if (vcrIndex !== 0) {
  //       container.viewContainerRef.move(componentRef.hostView, 0);
  //       this.animateComponent(componentRef, ANIMATION_CONFIG);
  //     }
  //     // this.childrenArray.splice(componentIndex, 1);
  //   }
  //   this.sendHTML();
  // }

  // moveToEnd(id: string, container: MainContainerDirective) {
  //   const componentRef = this.getComponentRef(id);
  //   const componentIndex = this.childrenArray.indexOf(componentRef);
    
  //   if (componentIndex !== -1) {
  //     const vcrIndex = container.viewContainerRef.indexOf(componentRef.hostView);
  //     if (vcrIndex !== container.viewContainerRef.length-1) {
  //       container.viewContainerRef.move(componentRef.hostView, container.viewContainerRef.length-1);
  //       this.animateComponent(componentRef, ANIMATION_CONFIG);
  //     }
  //     // this.childrenArray.splice(componentIndex, 1);
  //   }
  // }

  // moveToContainer(id: string, container: MainContainerDirective, hostContainerId: string) {
  //   const componentRef = this.getComponentRef(id);
  //   const componentIndex = this.childrenArray.indexOf(componentRef);
    
  //   if (componentIndex !== -1) {
  //     const vcrIndex = container.viewContainerRef.indexOf(componentRef.hostView);
  //     const data = (<itemComponent>componentRef.instance).data;
  //     // const type = (<itemComponent>componentRef.instance).type;
  //     this.loadComponent(componentRef.componentType, data, this.getContainer(hostContainerId));
  //     // this.loadComponent(type, data, this.getContainer(hostContainerId));
  //     // this.getContainer(hostContainerId).viewContainerRef.insert(componentRef.hostView);
  //     // container.viewContainerRef.detach(vcrIndex);
  //     container.viewContainerRef.remove(vcrIndex);
  //     this.animateComponent(componentRef, ANIMATION_CONFIG);
  //     this.childrenArray.splice(componentIndex, 1);
  //   }
  // }
  
  // private getComponentRef(id: string) {
  //   return this.childrenArray.find((componentRef) => {
  //     return (<itemComponent>componentRef.instance).id === id;
  //   });
  // }

  // getContainer(id: string): MainContainerDirective {
  //   const con = this.getAllContainers().find( con1 => {
  //       return con1.id === id;
  //     });
  //   return con.container;
  // }

  // getAllContainers(): {container: MainContainerDirective, id: string}[] {
  //   const containers = [];
  //   this.childrenArray
  //   .filter( child => {
  //     console.log('ins ', (<itemComponent>child.instance).type)
  //     return (<itemComponent>child.instance).type.name  === 'DivComponent';
  //   })
  //   .map( divCom => {
  //     const instance = <ContentComponent>divCom.instance;
  //     const idsArr = (<Grid[]>instance.data).map( grid => grid.id);
  //     const containersArr = instance.grid.container.map( (con, i) => {
  //       return {container: con.container.first, id: idsArr[i]} ;
  //     });
  //     return containersArr;
  //   })
  //   .forEach(arr => {
  //     containers.push(...arr);
  //   });
  //   return containers;
  // }

  // getAllContainers(): {container: MainContainerDirective, id: string}[] {
  //   const containers = [];
  //   this.childrenArray
  //   .filter( child => {
  //     return child.componentType.name === 'DivComponent';
  //   })
  //   .map( divCom => {
  //     const instance = <DivComponent>divCom.instance;
  //     const idsArr = (<Grid[]>instance.data).map( grid => grid.id);
  //     const containersArr = instance.container.map( (con, i) => {
  //       return {container: con.container.first, id: idsArr[i]} ;
  //     });
  //     return containersArr;
  //   })
  //   .forEach(arr => {
  //     containers.push(...arr);
  //   });
  //   return containers;
  // }

  // generateId(prefix: string) {
  //   return prefix + '_' + Math.random().toString(36).substr(2, 9);
  // }

  
}
