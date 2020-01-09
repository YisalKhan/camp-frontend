import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcampsComponent } from './editcamps.component';

describe('EditcampsComponent', () => {
  let component: EditcampsComponent;
  let fixture: ComponentFixture<EditcampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcampsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
