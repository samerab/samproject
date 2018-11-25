import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostListComponent } from './edit-post-list.component';

describe('EditPostListComponent', () => {
  let component: EditPostListComponent;
  let fixture: ComponentFixture<EditPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
