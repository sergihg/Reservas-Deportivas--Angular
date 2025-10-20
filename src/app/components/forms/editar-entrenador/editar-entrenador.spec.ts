import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEntrenador } from './editar-entrenador';

describe('EditarEntrenador', () => {
  let component: EditarEntrenador;
  let fixture: ComponentFixture<EditarEntrenador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEntrenador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEntrenador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
