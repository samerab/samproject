import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PostService, Post } from '../post.service';
import { map } from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import { PopupComponent } from 'app/shared-modules/popup/popup.component';
import { ContainerComponent } from 'app/shared-modules/content-creator/container/container.component';

@Component({
  selector: 'sam-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  ids: string[];
  photoURL: string;
  isHTML = false;
  creation;
  @ViewChild('content') content: ElementRef;
  @ViewChild('html') htmlContent: ElementRef;
  @ViewChild(ContainerComponent) creationAria: ContainerComponent;


  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private postService: PostService,
    public dialog: MatDialog,
  ) { 
    this.ids = [];
  }

  ngOnInit() {
    this.postService.posts$.pipe(
      map( posts => posts.map( post => post.id))
    ).subscribe( ids => {
        this.ids = ids;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '75%',
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

  onUpdate(html: string){
    this.creation = html;
    console.log('html creation', this.creation);
  }

  removePhoto(){
    this.photoURL = null;
  }

  toggleHTML(){
    if (this.isHTML) {
      this.content.nativeElement.innerHTML = this.htmlContent.nativeElement.value;
    } else {
      this.htmlContent.nativeElement.value = this.content.nativeElement.innerHTML;
    }
    this.isHTML = !this.isHTML;
  }

  getPost(postForm: FormGroup): Post {
    return {
      created: Date.now(),
      updated: Date.now(),
      author: 'tahsin',
      title: postForm.controls['title'].value,
      description: postForm.controls['description'].value,
      // content: this.content.nativeElement.innerHTML,
      content: this.creation,
      photo: this.photoURL,
      category: 'cat'
    }
  }

  onSubmit() {
    const post = this.getPost(this.postForm);
    const id = this.generateId(post.title);
    if (id !== null) {
      this.postService.addPost(post, id)
        .then( _ => {
          this.reset();
          // TODO: Message 
        })
        .catch( err => {
          // TODO: Message 
        });
    }
    else {
      // TODO: Message 
    }
  }

  private reset() {
    this.content.nativeElement.innerHTML = '';
    this.postForm.reset();
    this.removePhoto();
  }

  generateId(title: string) {
    let id = title.split(' ').filter( word => word.length > 0).join('-');
    const exists = this.ids.filter( ID => ID === id ).length > 0;
    if ( exists ) {
      id = null;
    }
    return id;
  }

}
