import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { EditPostListComponent } from './edit-post-list/edit-post-list.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path: 'posts',
    children: [ 
      {     
        path:'',
        component: PostListComponent
      },
      {     
          path:'add',
          component: AddPostComponent
      },
      {
          path:'edit',
          component: EditPostListComponent
      },
      {
          path:':id',
          component: PostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
