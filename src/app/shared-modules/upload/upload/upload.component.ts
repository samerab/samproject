import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'sam-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  url;
  bytesTransferred;
  totalBytes;

  constructor(private afStorage: AngularFireStorage, private db: AngularFirestore) { }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.savePhoto();
  }

  private savePhoto() {
    this.task
      .then(snapshot => {
        this.totalBytes = snapshot.totalBytes;
        this.bytesTransferred = snapshot.bytesTransferred;
        return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
      })
      .then(downloadURL => {
        this.url = downloadURL;
        if (this.bytesTransferred === this.totalBytes) {
          this.db.collection('photos').add({
            url: downloadURL,
            size: this.totalBytes
          });
        }
        return downloadURL;
      })
      .catch(error => {
        console.log(`Failed to upload file and get link - ${error}`);
      });
  }

  ngOnInit() {
  }

}
