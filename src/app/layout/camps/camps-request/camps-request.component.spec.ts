import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsRequestComponent } from './camps-request.component';

describe('CampsRequestComponent', () => {
  let component: CampsRequestComponent;
  let fixture: ComponentFixture<CampsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
