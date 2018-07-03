import { TestBed, inject } from '@angular/core/testing';

import { AnimationDataService } from './animation-data.service';

describe('AnimationDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationDataService]
    });
  });

  it('should be created', inject([AnimationDataService], (service: AnimationDataService) => {
    expect(service).toBeTruthy();
  }));
});
