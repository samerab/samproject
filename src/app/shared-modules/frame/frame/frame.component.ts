import { Component, OnInit, ContentChild, ElementRef, AfterContentInit, Input } from '@angular/core';
import { ActionService } from '@shared/services/action/action.service';
import { FrameContentDirective } from 'app/shared-modules/content-creator/frame-content.directive';
import { PopupComponent } from 'app/shared-modules/popup/popup.component';
import { MatDialog } from '@angular/material';
import { CreateContentService } from 'app/shared-modules/content-creator/create-content.service';

@Component({
  selector: 'sam-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit, AfterContentInit {

  @ContentChild(FrameContentDirective) content: FrameContentDirective;

  @Input() set buttonsToHide(toHide: string[]){
    toHide.forEach ( cmd => this.buttons[cmd] = false)
  }

  buttons = {
    delete: true,
    edit: true,
    hide: true,
    add: true,
    move: true,
    paste: true
  };
  @Input() level;
  hidden: boolean;
  frame;

  constructor(
    private actionService: ActionService, 
    public dialog: MatDialog,
    private createContentService: CreateContentService) { }

  ngOnInit() {
  }
  
  ngAfterContentInit() {
    this.hidden = this.content.frameId === '0' ? false : true;
  }

  isPaste() {
    return this.createContentService.senderData !== null;
  }
  
  setClass() {
    switch (this.level) {
      case 0:
        this.frame = {'frame0': !this.hidden, 'card': !this.hidden}
        break;
      case 1:
        this.frame = {'frame1': !this.hidden, 'card': !this.hidden}
        break;
      case 2:
        this.frame = {'frame2': !this.hidden, 'card': !this.hidden}
        break;
      default:
        this.frame = {'frame0': !this.hidden, 'card': !this.hidden}
        break;
    }    
  }

  show() {
    this.hidden = false;
    this.setClass();
  }

  hideFrame() {
    this.hidden = this.content.frameId === '0' ? false : true;
    this.setClass();
  }

  add() {
    this.sendAction('add');
  }
 
  delete() {
    this.sendAction('delete');
  }
  
  edit() {
    this.sendAction('edit');
  }
  
  hide() {
    this.sendAction('hide');
  }

  moveUp() {
    this.sendAction('moveUp');
  }

  moveDown() {
    this.sendAction('moveDown');
  }

  moveToStart() {
    this.sendAction('moveToStart');
  }

  moveToEnd() {
    this.sendAction('moveToEnd');
  }

  // moveToContainer(): void {
  //   const dialogRef = this.dialog.open(PopupComponent, {
  //     width: '75%',
  //     data: {
  //       type: 'prompt'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe( hostContainerId => {
  //     if (hostContainerId) {
  //       this.sendAction('moveToContainer', hostContainerId);
  //     }
  //   });
  // }

  moveToContainer(): void {
    this.sendAction('moveToContainer');
  }

  paste() {
    this.sendAction('paste');
  }

  private sendAction(actionName: string, data = null) {
    this.actionService.send({
      action: actionName,
      id: this.content.frameId,
      parentId: this.content.parentFrameId,
      data: data
    });
  }
}
