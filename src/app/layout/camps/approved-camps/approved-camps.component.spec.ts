import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedCampsComponent } from './approved-camps.component';

describe('ApprovedCampsComponent', () => {
  let component: ApprovedCampsComponent;
  let fixture: ComponentFixture<ApprovedCampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedCampsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedCampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
