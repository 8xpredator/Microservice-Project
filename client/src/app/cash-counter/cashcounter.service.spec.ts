import { TestBed } from '@angular/core/testing';

import { CashcounterService } from './cashcounter.service';

describe('CashcounterService', () => {
  let service: CashcounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashcounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
