import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllClinicsComponent } from './view-all-clinics.component';

describe('ViewAllClinicsComponent', () => {
  let component: ViewAllClinicsComponent;
  let fixture: ComponentFixture<ViewAllClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllClinicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
