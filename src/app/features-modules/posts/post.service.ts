import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  created: number,
  updated: number,
  author: string,
  title: string,
  description: string,
  content: string,
  photo: string,
  category: string
}
export interface PostWithId extends Post {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts$: Subject<PostWithId[]> = new Subject<PostWithId[]>();
  isCalled = false;

  constructor(private afs: AngularFirestore) { }

  getAll(): Observable<PostWithId[]> {
    if (!this.isCalled) {
      this.getPosts().subscribe( posts => {
        this.posts$.next(posts);
        this.isCalled = true;
      });
    }
    return this.posts$.asObservable();
      
  }

  private getPosts(): Observable<PostWithId[]> {
    return this.afs.collection<PostWithId>('posts').snapshotChanges().pipe(
      map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return Object.assign(data, { id });
        });
    }));
  }

  getPost(postId: string): Observable<Post> {
    return this.afs.doc<Post>('posts/'+postId).valueChanges();
  }

  addPost(post: Post, id: string) {
    return this.afs.collection('posts').doc(id).set(post);
  }

  deletePost(postId: string) {
    this.afs.doc('posts/'+postId).delete();
  }

}
