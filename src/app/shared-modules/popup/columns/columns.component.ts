import { Component, OnInit, Inject, ViewChildren, ElementRef, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../popup.component';
import { of, Observable } from 'rxjs';
import { Grid } from '../data.interface';

@Component({
  selector: 'sam-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit, AfterViewInit {

  divs = [1,2,3,4,5,6,7,8,9,10,11,12];
  inputsData: Grid[] = [];
  @ViewChildren('input') inputs: QueryList<ElementRef>;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private changeDetectorRef: ChangeDetectorRef
    ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {}

  array(n: number): any[] {
    return Array(n);
  }



  getInputs() {
    setTimeout(() => {
      if(!this.inputs){
        return null;
      }
      this.inputsData = this.inputs.toArray().map( input => {
        return { class: input.nativeElement.value, id: this.generateId('container')};
      });         
    }, 0);
  }

  generateId(prefix: string) {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
  }

}
