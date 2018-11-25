import { Component, OnInit, Input, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'sam-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  dataSource;

  @Input() displayedColumns: string[];
  @Input() columnAsId;
  @Input() columnsAsDate: string[];
  @Input() set data(dataArray){
    this.dataSource = new MatTableDataSource(dataArray);
  };

  @Output() editClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteClicked: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(MatSort) sort: MatSort;
  
  constructor() {}
  ngOnInit() {}
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: string) {
    this.editClicked.emit(id);
  }
  delete(id: string) {
    this.deleteClicked.emit(id);
  }

  isDate(dateColumn: string) {
    if( this.columnsAsDate ) {
      return this.columnsAsDate.includes(dateColumn) ?  true : false;
 
    }
    return false;
  }

}
