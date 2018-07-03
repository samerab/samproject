import { TestBed, inject } from '@angular/core/testing';

import { SliderAnimationService } from './slider-animation.service';

describe('SliderAnimationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SliderAnimationService]
    });
  });

  it('should be created', inject([SliderAnimationService], (service: SliderAnimationService) => {
    expect(service).toBeTruthy();
  }));
});
