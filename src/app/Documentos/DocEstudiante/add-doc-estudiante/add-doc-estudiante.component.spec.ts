import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocEstudianteComponent } from './add-doc-estudiante.component';

describe('AddDocEstudianteComponent', () => {
  let component: AddDocEstudianteComponent;
  let fixture: ComponentFixture<AddDocEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
