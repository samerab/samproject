import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PopupComponent } from '../popup.component';
import { PhotoService } from './photo.service';

@Component({
  selector: 'sam-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  @Input() photoData;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.photoService.photoData.subscribe( photoData => {
      this.photoData = photoData;
      if ( photoData.close ) {
        this.close(photoData);
      }
    });
  }

  close(data): void {
    this.dialogRef.close(data);
  }

}
