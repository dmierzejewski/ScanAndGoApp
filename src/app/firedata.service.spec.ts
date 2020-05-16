import { TestBed } from '@angular/core/testing';

import { FiredataService } from './firedata.service';

describe('FiredataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiredataService = TestBed.get(FiredataService);
    expect(service).toBeTruthy();
  });
});
