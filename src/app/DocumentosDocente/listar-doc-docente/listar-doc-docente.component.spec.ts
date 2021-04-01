import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDocDocenteComponent } from './listar-doc-docente.component';

describe('ListarDocDocenteComponent', () => {
  let component: ListarDocDocenteComponent;
  let fixture: ComponentFixture<ListarDocDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDocDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDocDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
