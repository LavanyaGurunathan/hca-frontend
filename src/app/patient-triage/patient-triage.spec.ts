import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTriage } from './patient-triage';

describe('PatientTriage', () => {
  let component: PatientTriage;
  let fixture: ComponentFixture<PatientTriage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTriage],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientTriage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
