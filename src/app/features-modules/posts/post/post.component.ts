import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'sam-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap( params => {
        const id = params['id'];
        return this.postService.getPost(id);
      })
    ).subscribe( post => {
      this.post = post;
    });
  }

}
