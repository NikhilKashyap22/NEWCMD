import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetScheduleByIdComponent } from './get-schedule-by-id.component';

describe('GetScheduleByIdComponent', () => {
  let component: GetScheduleByIdComponent;
  let fixture: ComponentFixture<GetScheduleByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetScheduleByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetScheduleByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
