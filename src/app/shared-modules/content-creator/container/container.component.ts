import { Component, OnInit, ViewChild, 
  ComponentFactoryResolver, EmbeddedViewRef, Output, EventEmitter, ComponentRef, Input,
  QueryList, ViewChildren, AfterViewInit, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { MainContainerDirective } from '../directives/main-container.directive';
import { MatDialog } from '@angular/material';
import { PopupComponent } from 'app/shared-modules/popup/popup.component';
import { Type } from '@angular/core';
import { ActionService, Action } from '@shared/services/action/action.service';
import { INFO } from './component-info';
import { AnimateService } from '@shared/services';
import { slideY } from '@shared/animations-def/slide';
import { CreateContentService, SenderData } from '../create-content.service';
import { DivComponent } from '../div/div.component';
import { OverlayService } from 'app/shared-modules/popup/overlay/overlay.service';
import { TemplatePortalDirective, TemplatePortal } from '@angular/cdk/portal';
import { VideoComponent } from '../video/video.component';

const ANIMATION_CONFIG = {  
  animationName: 'slideInUp', 
  animationDef: slideY, 
  animationParams: {params:{time:'.5s',start:-100, end: 0, fromOpacity: 1, toOpacity: 1}}
}

export interface itemComponent {
  id: string;
  parentId: string;
  level: number;
  type: Type<any>;
  data: any;
  container: QueryList<ContainerComponent>;
}

@Component({
  selector: 'sam-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, AfterViewInit {

  @ViewChildren(MainContainerDirective) container: QueryList<MainContainerDirective>;
  @ViewChild('tmp') customTemplate: TemplateRef<any>;
  @ViewChild('tmp2') customTemplate2: TemplateRef<any>;
  @ViewChild('xxyy') xxyy: ElementRef;
  @Output() updated: EventEmitter<string> = new EventEmitter<string>();
  @Input() containerId: string;
  @Input() level: number;
  childrenArray: ComponentRef<any>[] = [];
  space;

  test = 'testooo';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public dialog: MatDialog,
    private actionService: ActionService,
    private animateService: AnimateService,
    private createContentService: CreateContentService,
    private overlayService: OverlayService,
    private vcr: ViewContainerRef
  ) {
  }


  ngOnInit() {
    this.getAction(); 
    
  }

  ngAfterViewInit() {
  }

  openOverlay() {
    this.overlayService.openTemplate(this.customTemplate, this.vcr);
    // this.overlayService.openComponent(VideoComponent);
  }
  openOverlay2() {
    this.overlayService.openConnected(this.vcr, this.customTemplate2, this.xxyy);
    // this.overlayService.openComponent(VideoComponent);
  }


  
  buttonsToHide() {
    if(this.level === 0) {
      return ['edit', 'hide', 'delete', 'move', 'paste'];
    } else {
      return ['edit', 'hide', 'delete', 'move']
    }
  }

  getContainer(id: string): MainContainerDirective {
    return this.container.find( con => {
      return con.containerRefId === id;
    });
  }

  getAction() {
    this.actionService.action$.subscribe( action => {
      if ( action.id === this.containerId) { 
        if ( action.action === 'add' ) { 
          // this.openDialog(this.getContainer(action.id));
          this.openDialog(action.id);
          this.space = false;
        } else if ( action.action === 'paste' ) { 
          const data = this.createContentService.senderData;
          // this.paste(data.componentId,data.containerId, action.id);
          this.paste(data, action.id);
        }
        this.createContentService.sendHTML();
      } else if ( action.parentId === this.containerId ) { 
        if ( action.action === 'delete' ) { 
          this.delete(action);
        } else if ( action.action === 'moveUp' ) { 
          this.move(action.id, this.getContainer(action.parentId), 'up');
          // this.moveUp(action);
        } else if ( action.action === 'moveDown' ) { 
          this.move(action.id, this.getContainer(action.parentId), 'down');
          // this.moveDown(action);
        } else if ( action.action === 'moveToStart' ) { 
          this.move(action.id, this.getContainer(action.parentId), 'start');
          // this.moveToStart(action);
        } else if ( action.action === 'moveToEnd' ) { 
          this.move(action.id, this.getContainer(action.parentId), 'end');
          // this.moveToEnd(action);
        } else if ( action.action === 'moveToContainer' ) { 
          this.createContentService.senderData = {
            componentId: action.id,
            containerId: action.parentId,
            componentRef: this.getComRef(action.id)
          };
        } else if ( action.action === 'detach' ) { 
          this.detach(action);
        }
        // this.createContentService.sendHTML();
      }   
      
    })
  }

  getComRef(componentId: string): ComponentRef<any> {
    return this.childrenArray.find(componentRef => {
      return (<itemComponent>componentRef.instance).id === componentId;
    })
  }
  private detach(action: Action) {
    this.delete(action);
    this.createContentService.senderData = null;
    this.createContentService.sendHTML();
  }

  openDialog(containerId: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '75%',
      data: {
        type: 'select-component'
      }
    });
    dialogRef.afterClosed().subscribe( componentName => {
      if (componentName) {
        this.getComponentData(componentName, containerId);
      }
    });
  }

  getComponentData(componentName: string, containerId: string) {
    const dialogRef = this.dialog.open(PopupComponent, INFO[componentName].config);
    dialogRef.afterClosed().subscribe( componentData => {
      if (componentData) {
        this.loadComponent(INFO[componentName].type, componentData, containerId);
        this.createContentService.sendHTML();
      }
    });

  }

  loadComponent(componentName: Type<any>, data: any, containerId: string) {
    console.log('faaaaat');
    // const container = this.getContainer(containerId);
    const container = this.getContainer(this.containerId);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentName);
    let componentRef = container.viewContainerRef.createComponent(componentFactory);
    this.setProperties(componentRef, componentName, container, data);
    this.childrenArray.push(componentRef);
    // const index = this.createContentService.allChildren.findIndex(child => child.containerId === this.containerId)
    // if (index > -1) {
    //   this.createContentService.allChildren[index].children.push(componentRef)
    // } else {
    //   this.createContentService.allChildren.push({containerId: containerId, children: this.childrenArray})
    // }
    this.animateComponent(componentRef, ANIMATION_CONFIG); 
  }

  private setProperties(componentRef: ComponentRef<any>, componentName: Type<any>, container: MainContainerDirective, data: any) {
    const instance = <itemComponent>componentRef.instance;
    instance.id = this.generateId(componentName.name);
    instance.parentId = container.containerRefId;
    instance.level = container.containerLevel + 1;
    // instance.type = componentName;
    instance.data = data;
    
  }

  move(id: string, container: MainContainerDirective, direction: string) {
    const componentRef = this.getComRef(id);
    const componentIndex = this.childrenArray.indexOf(componentRef);

    if (componentIndex !== -1) {
      const vcrIndex = container.viewContainerRef.indexOf(componentRef.hostView);
      if (direction === 'up' && vcrIndex > 0) {
        this.moveTo(container, componentRef, componentIndex, componentIndex - 1);
      } else if (direction === 'down' && vcrIndex < container.viewContainerRef.length-1) {
        this.moveTo(container, componentRef, componentIndex, componentIndex + 1);
      } else if (direction === 'start' && vcrIndex !== 0) {
        this.moveTo(container, componentRef, componentIndex, 0);
      } else if (direction === 'end' && vcrIndex !== container.viewContainerRef.length-1) {
        this.moveTo(container, componentRef, componentIndex, container.viewContainerRef.length-1);
      }
    }
  }

  paste(senderData: SenderData, hostContainerId: string) {
    // const componentRef = this.getComponentRef(sendercomponentId);
    const componentRef = senderData.componentRef;
    const data = (<itemComponent>componentRef.instance).data;
    this.loadComponent(componentRef.componentType, data, hostContainerId);
    this.actionService.send({
      action: 'detach',
      id: senderData.componentId,
      parentId: senderData.containerId,
    });
    this.createContentService.sendHTML();
  }



  private moveTo(container: MainContainerDirective, componentRef: ComponentRef<any>, 
    componentIndex: number, newIndex: number) {
    container.viewContainerRef.move(componentRef.hostView, newIndex);
    this.moveInArray(this.childrenArray, componentIndex, newIndex);
    // const index = this.createContentService.allChildren.findIndex(child => child.containerId === this.containerId)
    // if (index > -1) {
    //   this.moveInArray(this.createContentService.allChildren[index].children, componentIndex, newIndex);
    // }
    this.animateComponent(componentRef, ANIMATION_CONFIG);
    this.createContentService.sendHTML();
  }

  moveInArray(arr, old_index, new_index) {
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };

  // private moveUp(action: Action) {
  //   this.createContentService.moveUp(action.id, this.getContainer(action.parentId));
  //   this.addSpace();
  // }

  // private moveDown(action: Action) {
  //   this.createContentService.moveDown(action.id, this.getContainer(action.parentId));
  //   this.addSpace();
  // }

  // private moveToStart(action: Action) {
  //   this.createContentService.moveToStart(action.id, this.getContainer(action.parentId));
  //   this.addSpace();
  // }

  // private moveToEnd(action: Action) {
  //   this.createContentService.moveToEnd(action.id, this.getContainer(action.parentId));
  //   this.addSpace();
  // }

  // private moveToContainer(data: any, hostContainerId: string) {
  //   this.createContentService.moveToContainer(data.id, data.container, hostContainerId);
  //   this.addSpace();
  //   this.createContentService.senderData = null;
  // }

  // private delete(action: Action) {
  //   this.createContentService.delete(action.id, this.getContainer(action.parentId));
  //   this.addSpace();
  // }

  delete(action: Action) {
    const container = this.getContainer(action.parentId);
    const componentRef = this.childrenArray.find((componentRef) => {
      return (<itemComponent>componentRef.instance).id === action.id;
    });
    const componentIndex = this.childrenArray.indexOf(componentRef);

    if (componentIndex !== -1) {
      container.viewContainerRef.remove(container.viewContainerRef.indexOf(componentRef.hostView));
      this.childrenArray.splice(componentIndex, 1);
      // const index = this.createContentService.allChildren.findIndex(child => child.containerId === this.containerId)
      // if (index > -1) {
      //   this.createContentService.allChildren[index].children.splice(componentIndex, 1);
      // }
    }
    this.createContentService.sendHTML();
  }

  private addSpace() {
    // if (this.container.first.viewContainerRef.length === 0) {
    //   this.space = true;
    // }
  }

  // private getComponentRef(id: string) {
  //   return this.createContentService.getAllChildren().find((componentRef) => {
  //     return (<itemComponent>componentRef.instance).id === id;
  //   });
  // }

  getHtml() {
    let html = '';
    this.childrenArray.forEach(child => {
      const instance = <itemComponent>child.instance;
      const parentId = instance.parentId;
      // if (parentId === this.containerId) {
        if (instance instanceof DivComponent) {
          html += instance.getHtml();
        } else {
          html += this.getChildHtml(child, html);
        }
      // }
    });
    return html;
  }

  private getChildHtml(child: ComponentRef<any>, html: string) {
    const component = (child.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const frame = component.firstChild as HTMLElement;
    const target = frame.querySelector('.target');
    html = target.innerHTML;
    // console.log('each html ', html);
    return html;
  }

  private animateComponent(componentRef: ComponentRef<any>, config) {
    const component = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const frame = component.firstChild as HTMLElement;
    const target = frame.querySelector('#wrapper');
    this.animateService.animateElement(target, config, false);
  }

  generateId(prefix: string) {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
  }

}
