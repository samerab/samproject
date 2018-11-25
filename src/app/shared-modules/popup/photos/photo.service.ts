import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photo$ = new Subject<any>();
  photoData = this.photo$.asObservable();

  constructor() { }

  sendPhotoData(data: {photo: any, close: boolean}){
    this.photo$.next(data);
  }
}
