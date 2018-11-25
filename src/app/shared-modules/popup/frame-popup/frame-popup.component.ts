import { Component, OnInit, Input, ContentChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../popup.component';

@Component({
  selector: 'sam-frame-popup',
  templateUrl: './frame-popup.component.html',
  styleUrls: ['./frame-popup.component.css']
})
export class FramePopupComponent implements OnInit {

  @Input() outputData: any;
  @Input() okButtonDisabled: boolean = false;

  @ContentChild('content') content: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onOkClick(): void {
    this.dialogRef.close(this.outputData);
  }

}
