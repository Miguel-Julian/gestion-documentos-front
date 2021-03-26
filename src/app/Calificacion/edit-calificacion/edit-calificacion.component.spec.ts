import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalificacionComponent } from './edit-calificacion.component';

describe('EditCalificacionComponent', () => {
  let component: EditCalificacionComponent;
  let fixture: ComponentFixture<EditCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
