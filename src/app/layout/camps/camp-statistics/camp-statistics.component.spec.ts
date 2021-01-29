import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampStatisticsComponent } from './camp-statistics.component';

describe('CampStatisticsComponent', () => {
  let component: CampStatisticsComponent;
  let fixture: ComponentFixture<CampStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
