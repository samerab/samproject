import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {MatDialog} from '@angular/material';
import { PageService } from '../page.service';
import { PopupComponent } from 'app/shared-modules/popup/popup.component';
import { MainContainerDirective } from 'app/shared-modules/content-creator/directives/main-container.directive';

@Component({
  selector: 'sam-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  ids: string[];
  photoURL: string;
  isHTML = false;
  @ViewChild('content') content: ElementRef;
  @ViewChild('html') htmlContent: ElementRef;
  @ViewChild('popupTemplate') popupTemplate: ElementRef;
  @ViewChild(MainContainerDirective) creationAria: ElementRef;

  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private pageService: PageService,
    public dialog: MatDialog,
  ) { 
    this.ids = [];
  }

  ngOnInit() {
  }

  toggleHTML(){
    if (this.isHTML) {
      this.content.nativeElement.innerHTML = this.htmlContent.nativeElement.value;
    } else {
      this.htmlContent.nativeElement.value = this.content.nativeElement.innerHTML;
    }
    this.isHTML = !this.isHTML;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '50%',
      data: {
        type: 'select-photo'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.photoURL = data.photo.url;
      }
    });
  }

  getTemplate() {
    return `
    <img width="1000px;height:1500px;" src="https://cdn1.thr.com/sites/default/files/imagecache/NFE_portrait/2011/02/palicki-2011-a-p.jpg" alt="">
    `
  }

  testDiv(){
      // const linkURL = prompt('<th scope="col">#</th>Enter the URL for this link:', "https://");
      this.focus();
      document.execCommand('insertHTML', false, `
      <div id="x" class="card" style="height:200px;">
            <div class="card-body">
              <h5 class="card-title">Add Photo</h5>
              <button onClick="testDiv2(x)" type="button" class="btn btn-outline-primary">add</button>
            </div>
        </div>
      `);
  }

  testDiv2(x){
    // const linkURL = prompt('<th scope="col">#</th>Enter the URL for this link:', "https://");
    this.focusIn(x);
    document.execCommand('insertHTML', false, `
    <div id="xx" class="card" style="height:200px;">
          <div class="card-body">
            <h5 class="card-title">Add Photo</h5>
            <button (click)="focusIn(x)" type="button" class="btn btn-outline-primary">add</button>
          </div>
      </div>
    `);
}

  private focus() {
    const content = document.querySelector('#content');
    // content.focus();
  }

  private focusIn(id) {
    const content = document.querySelector(`#${id}`);
    // content.focus();
  }
}
