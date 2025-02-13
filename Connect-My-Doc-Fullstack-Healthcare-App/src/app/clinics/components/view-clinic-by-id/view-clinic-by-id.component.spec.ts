import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClinicByIdComponent } from './view-clinic-by-id.component';

describe('ViewClinicByIdComponent', () => {
  let component: ViewClinicByIdComponent;
  let fixture: ComponentFixture<ViewClinicByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClinicByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClinicByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
