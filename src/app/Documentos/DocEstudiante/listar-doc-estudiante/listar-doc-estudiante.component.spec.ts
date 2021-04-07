import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDocEstudianteComponent } from './listar-doc-estudiante.component';

describe('ListarDocEstudianteComponent', () => {
  let component: ListarDocEstudianteComponent;
  let fixture: ComponentFixture<ListarDocEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDocEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDocEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
