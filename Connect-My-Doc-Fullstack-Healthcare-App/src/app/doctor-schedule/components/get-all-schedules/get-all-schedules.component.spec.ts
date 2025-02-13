import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllSchedulesComponent } from './get-all-schedules.component';

describe('GetAllSchedulesComponent', () => {
  let component: GetAllSchedulesComponent;
  let fixture: ComponentFixture<GetAllSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
