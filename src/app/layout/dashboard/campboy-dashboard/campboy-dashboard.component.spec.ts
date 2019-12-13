import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampboyDashboardComponent } from './campboy-dashboard.component';

describe('CampboyDashboardComponent', () => {
  let component: CampboyDashboardComponent;
  let fixture: ComponentFixture<CampboyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampboyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampboyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
