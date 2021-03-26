import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalificacionComponent } from './add-calificacion.component';

describe('AddCalificacionComponent', () => {
  let component: AddCalificacionComponent;
  let fixture: ComponentFixture<AddCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
