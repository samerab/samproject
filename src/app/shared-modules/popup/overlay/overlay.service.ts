import { Injectable, Type, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { TemplatePortalDirective, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { VideoComponent } from 'app/shared-modules/content-creator/video/video.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(public overlay: Overlay) { }

  openConnected(viewContainerRef: ViewContainerRef, template: TemplateRef<any>, element: ElementRef) {
    let config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay.position().connectedTo(
        element,
        {originX: 'start', originY: 'bottom'},
        {overlayX: 'start', overlayY: 'top'} )
    });

    let overlayRef = this.overlay.create(config);
    if (template) {
      const portal = new TemplatePortal(template, viewContainerRef);
      overlayRef.attach(portal);
    } 
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

  openPanelWithBackdrop(template?: TemplateRef<any>, viewContainerRef?: ViewContainerRef, component?: Type<any>) {
    let config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    let overlayRef = this.overlay.create(config);
    if (template) {
      const portal = new TemplatePortal(template, viewContainerRef);
      overlayRef.attach(portal);
    } else if (component) {
          overlayRef.attach(new ComponentPortal(component));
        }
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

  openTemplate(template: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    this.openPanelWithBackdrop(template, viewContainerRef);
  }
  
  openComponent(component: Type<any>) {
    this.openPanelWithBackdrop(null, null, component);
  }
}
