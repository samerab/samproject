import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'sam-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos = [];
  selected;

  constructor(private afs: AngularFirestore, private photoService: PhotoService) { }

  sendPhotoData(data: {photo: any, close: boolean}, i) {
    this.selected = i;
    this.photoService.sendPhotoData(data);
  }

  getAllPhotos() {
    this.afs.collection('photos', ref => {
      return ref.orderBy('size', 'asc')
    })
    .valueChanges().subscribe( photos => {
      this.photos = photos;
    });
  }

  ngOnInit() {
    this.getAllPhotos();
  }

}
