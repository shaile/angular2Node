import { TestBed, inject } from '@angular/core/testing';

import { EmployeDataService } from './employe-data.service';

describe('EmployeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeDataService]
    });
  });

  it('should be created', inject([EmployeDataService], (service: EmployeDataService) => {
    expect(service).toBeTruthy();
  }));
});
