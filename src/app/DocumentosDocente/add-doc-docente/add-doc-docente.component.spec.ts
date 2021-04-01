import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocDocenteComponent } from './add-doc-docente.component';

describe('AddDocDocenteComponent', () => {
  let component: AddDocDocenteComponent;
  let fixture: ComponentFixture<AddDocDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
