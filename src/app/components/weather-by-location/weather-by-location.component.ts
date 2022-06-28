import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { WeatherDetailsService } from 'src/app/services/weather-details.service';
import { Weather } from 'src/interfaces/weather.model';

export interface CurrentWeather {
  date?:string;
  day?: string;
  weatherDescription?: string;
  tempCelcius?: string;
  tempFarenheit?: string;
  pressure?: string;
  humidity?: string;
  wind?: string;
  minTempCelcius?: number;
  maxTempCelcius?: number;
  minTempFarenheit?: number;
  maxTempFarenheit?: number;
}
@Component({
  selector: 'app-weather-by-location',
  templateUrl: './weather-by-location.component.html',
  styleUrls: ['./weather-by-location.component.scss'],
})
export class WeatherByLocationComponent implements OnInit {
  weatherForm!: FormGroup;
  weatherData!: Weather;
  currWeather: CurrentWeather = {};
  currTempMode = 'celcius';
  forecastWeather: CurrentWeather[] = [];
  currLat:number=0;
  currLong:number=0;
  constructor(
    private fb: FormBuilder,
    private weatherDetail: WeatherDetailsService
  ) {}
    currPlace:string='';
  ngOnInit(): void {
    this.weatherForm = this.fb.group({
      city: '',
      zipcode: '',
    });
    this.getCurrentLocation();
    
  }
  getCurrentLocation() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log(position);
    //     this.currLat = position.coords.latitude;
    //     this.currLong = position.coords.longitude;
    //      this.weatherDetail.getCurrentLocationName(this.currLat,this.currLong).subscribe(res=>{
    //       console.log('ressssssssssssssss',res)
    //       this.currPlace = res[2].name;
    //       this.updateCurrPlaceWeather();
    //      });
    //   });
    // } else {
    //   alert('Geolocation is not supported by this browser.');
    // }
  }
  onSubmit(form: FormGroup, days?: string) {
    console.log('Valid?', form.valid);
    console.log('values', form.value.city, form.value.zipcode);
    let noOfDays = 0;
    if (days) {
      noOfDays = 10;
    }
    console.log('heeyey', days, noOfDays);
    if (form.value.city) {
      this.weatherData = this.weatherDetail.getWeatherData(
        noOfDays,
        form.value.city
      );
      // .subscribe((response) => {
      //   this.weatherData = response;
      //   console.log(this.weatherData);
      //   if (noOfDays > 0) {
      //     this.updateForecastData(this.weatherData);
      //   } else {
      //     this.updateData(this.weatherData);
      //   }
      // });
      if (noOfDays > 0) {
        this.updateForecastData(this.weatherData);
      } else {
        this.updateData(this.weatherData);
      }
    } else {
      this.weatherData = this.weatherDetail.getWeatherData(
        noOfDays,
        undefined,
        form.value.zipcode
      );
      // .subscribe((res) => {
      //   console.log(res);
      //   this.weatherData = res;
      // });
    }
  }
  updateData(weatherInfo: Weather) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    console.log(weatherInfo);
    const date = new Date(weatherInfo.location.localtime);
    this.currWeather.day = weekday[date.getDay()];
    this.currWeather.date = weatherInfo.location.localtime;
    this.currWeather.humidity = weatherInfo.current.humidity + '';
    this.currWeather.pressure = weatherInfo.current.pressure_in + '';
    this.currWeather.tempCelcius = weatherInfo.current.temp_c + '';
    this.currWeather.tempFarenheit = weatherInfo.current.temp_f + '';
    this.currWeather.weatherDescription = weatherInfo.current.condition.text;
    this.currWeather.wind = weatherInfo.current.gust_kph + '';
  }
  updateForecastData(weatherForecast: Weather) {
    console.log(this.forecastWeather);
    let forecastData: CurrentWeather = {};
    for (let i in weatherForecast.forecast.forecastday) {
      forecastData.day = weatherForecast.forecast.forecastday[i].date;
      forecastData.weatherDescription =
        weatherForecast.forecast.forecastday[i].day.condition.text;
      forecastData.minTempCelcius =
        weatherForecast.forecast.forecastday[i].day.mintemp_c;
      forecastData.maxTempCelcius =
        weatherForecast.forecast.forecastday[i].day.maxtemp_c;
      forecastData.minTempFarenheit =
        weatherForecast.forecast.forecastday[i].day.mintemp_f;
      forecastData.maxTempFarenheit =
        weatherForecast.forecast.forecastday[i].day.maxtemp_f;
        this.forecastWeather.push(forecastData);
    }
    console.log(this.forecastWeather);
  }
 updateCurrPlaceWeather(){
  this.weatherDetail.getCurrWeatherData(0,this.currPlace).subscribe((res:Weather)=>{
    this.weatherData = res;
    console.log(this.currPlace,res)
    this.updateData(this.weatherData);
  });
 }
}
