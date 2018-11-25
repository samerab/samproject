import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'sam-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts;
  columns = 'col-12'
  
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAll().subscribe( posts => {
      this.posts = posts;
    });
  }

}
