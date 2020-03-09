import { TestBed } from '@angular/core/testing';

import { TutsService } from './tuts.service';

describe('TutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TutsService = TestBed.get(TutsService);
    expect(service).toBeTruthy();
  });
});
