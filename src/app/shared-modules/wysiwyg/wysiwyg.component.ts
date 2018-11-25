import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'sam-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css']
})
export class WysiwygComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '600px',
      position: {top: '300px'},
      data: {
        type: 'message',
        title: 'Add Link',
        message: 'Enter the URL for this link',
      }
    });
    const sText = document.getSelection();
    const x = document.getElementById("content") as HTMLTextAreaElement;
    dialogRef.afterClosed().subscribe( data => {
      if (data) {
        this.divide();
      }
    });
  }

  bold(){
    document.execCommand('bold',false,null); 
  }

  foreColor(color: string){
    document.execCommand('ForeColor',false, color);
  }

  link(){
    const linkURL = prompt("Enter the URL for this link:", "https://"); 
    const sText = document.getSelection();
    this.focus();
    document.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + sText + '</a>');
  }

  insertImage(){
    let imgSrc = prompt('Enter image url', '');
      if(imgSrc != null){
          //document.execCommand('insertimage', false, imgSrc); 
          this.focus();
          document.execCommand('insertHTML', false, `<img src="${imgSrc}" width="500" >`);
      }
  }

  alignLeft() {
    document.execCommand('justifyLeft',false,null); 
  }
  alignRight() {
    document.execCommand('justifyRight',false,null); 
  }
  alignCenter() {
    document.execCommand('justifyCenter',false,null); 
  }

  divide(){
    // const linkURL = prompt('<th scope="col">#</th>Enter the URL for this link:', "https://");
    this.focus();
    document.execCommand('insertHTML', false, `
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    `);
  }


  private focus() {
    const content = document.querySelector('#content');
    // content.focus();
  }
}
