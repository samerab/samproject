import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FramePopupComponent } from './frame-popup.component';

describe('FramePopupComponent', () => {
  let component: FramePopupComponent;
  let fixture: ComponentFixture<FramePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FramePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
