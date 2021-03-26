import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCalificacionComponent } from './listar-calificacion.component';

describe('ListarCalificacionComponent', () => {
  let component: ListarCalificacionComponent;
  let fixture: ComponentFixture<ListarCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
