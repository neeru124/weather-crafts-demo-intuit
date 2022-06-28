import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherByLocationComponent } from './weather-by-location.component';

describe('WeatherByLocationComponent', () => {
  let component: WeatherByLocationComponent;
  let fixture: ComponentFixture<WeatherByLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherByLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
