import {Component, Directive, OnInit, QueryList, ViewChildren, Input, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {ActiveDescendantKeyManager, Highlightable} from '@angular/cdk/a11y';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { fromEvent, Observable } from 'rxjs';
import { filter, tap, switchMap, merge } from 'rxjs/operators';

@Directive({
  selector: '[role="option"]',
  host: {
    '[class.active-option]' : 'isActive'
  }
})
export class ColorOption implements Highlightable {
  isActive = false;

  setActiveStyles(): void {
    this.isActive = true;
  }

  setInactiveStyles(): void {
    this.isActive = false;
  }
}

@Component({
  selector: 'sam-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnDestroy, OnInit {

  @Input() overlayOrigin: CdkOverlayOrigin;
  @Input() closeOnClickOut: boolean = true;
  @ViewChild('dialog') dialog: ElementRef;
  isOpen = false;
  keyManager: ActiveDescendantKeyManager<ColorOption>;

  addEventOnOpen() {
    const origin = this.overlayOrigin.elementRef.nativeElement;
    const open$ = fromEvent(origin, 'click').pipe(
      filter(() => !this.isOpen),
      tap( () => this.isOpen = true),
      switchMap(() => this.close(origin)),
    );
    return open$;
  }

  // addEvent(): Observable<any> {
  //   return merge(this.close(origin), this.addEventToDocument());
  // }

  close(origin): Observable<any> {
    return fromEvent(origin, 'click').pipe(
              filter(() => this.isOpen),
              tap(() => this.isOpen = false)
            );
  }

  addEventToDocument(): Observable<any> {
    const origin = this.overlayOrigin.elementRef.nativeElement;
    return fromEvent(document, 'click').pipe(
      filter(() => this.closeOnClickOut),
      filter((event) => this.isOpen && this.isOut(origin, event)),
      tap( () => this.isOpen = false )
    );
  }

  private isOut(origin: any, event: Event): boolean {
    return origin !== event['target'] && !this.dialog.nativeElement.contains(event['target'] as HTMLElement);
  }

  ngOnInit() {
    this.addEventOnOpen().subscribe();
    this.addEventToDocument().subscribe();
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {
    // this.keyManager = new ActiveDescendantKeyManager(this.options).withWrap();
  }

  keydownHandler(event: KeyboardEvent) {
    this.keyManager.onKeydown(event);
  }
  
}
