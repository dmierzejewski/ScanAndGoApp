import { TestBed, async, inject } from '@angular/core/testing';

import { AuthSearchGuard } from './auth-search.guard';

describe('AuthSearchGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthSearchGuard]
    });
  });

  it('should ...', inject([AuthSearchGuard], (guard: AuthSearchGuard) => {
    expect(guard).toBeTruthy();
  }));
});
