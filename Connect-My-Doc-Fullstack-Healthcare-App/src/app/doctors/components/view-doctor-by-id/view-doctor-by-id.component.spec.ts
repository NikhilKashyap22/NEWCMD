import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorByIdComponent } from './view-doctor-by-id.component';

describe('ViewDoctorByIdComponent', () => {
  let component: ViewDoctorByIdComponent;
  let fixture: ComponentFixture<ViewDoctorByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDoctorByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDoctorByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
