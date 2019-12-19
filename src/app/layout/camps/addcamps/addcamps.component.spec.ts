import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampsComponent } from './addcamps.component';

describe('AddCampsComponent', () => {
  let component: AddCampsComponent;
  let fixture: ComponentFixture<AddCampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCampsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
