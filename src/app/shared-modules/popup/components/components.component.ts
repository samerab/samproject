import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../popup.component';

@Component({
  selector: 'sam-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  components = [
    {type: 'VideoComponent', url: 'https://www.freeiconspng.com/uploads/video-icon-1.png', alt: 'video symbole', title: 'Video'},
    {type: 'BreakComponent', url: 'https://image.flaticon.com/icons/svg/29/29515.svg', alt: 'video symbole', title: 'Break'},
    {type: 'DivComponent', url: 'https://image.flaticon.com/icons/svg/60/60701.svg', alt: 'video symbole', title: 'Divs'}
  ];

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }

  send(componentName) {
    this.dialogRef.close(componentName);
  }

}
