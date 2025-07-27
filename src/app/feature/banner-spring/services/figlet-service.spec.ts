import { TestBed } from '@angular/core/testing';

import { FigletService } from './figlet-service';

describe('FigletService', () => {
  let service: FigletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FigletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
