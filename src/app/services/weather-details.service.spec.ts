import { TestBed } from '@angular/core/testing';

import { WeatherDetailsService } from './weather-details.service';

describe('WeatherDetailsService', () => {
  let service: WeatherDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
