import { TestBed } from '@angular/core/testing';

import { ProyectoTareaService } from './proyecto-tarea.service';

describe('ProyectoTareaService', () => {
  let service: ProyectoTareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectoTareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
