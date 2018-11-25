import { Component, OnInit } from '@angular/core';
import { PostService, PostWithId } from '../post.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material';
import { PopupComponent } from 'app/shared-modules/popup/popup.component';

@Component({
  selector: 'sam-edit-post-list',
  templateUrl: './edit-post-list.component.html',
  styleUrls: ['./edit-post-list.component.css']
})
export class EditPostListComponent implements OnInit {

  posts: PostWithId[];
  columns: string[] = ['author', 'created','updated','category', 'title', 'Action'];

  constructor(
    private postService: PostService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.postService.getAll().subscribe( posts => {
      this.posts = posts;
    });
  }

  edit(id: string) {
    this.router.navigate(['/posts/', id]);
  }

  delete(id: string) {
    this.postService.deletePost(id);
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '300px',
      position: {top: '300px'},
      data: {
        title: '!!!!!!!!!',
        message: 'sure delete',
        value: null
      }
    });
    dialogRef.afterClosed().subscribe( response => {
      if (response === 'ok') {
        this.delete(id);
      }
    });
  }


}
