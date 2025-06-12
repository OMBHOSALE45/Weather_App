// src/app/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import Observable

@Injectable({
  providedIn: 'root' // This makes the service a singleton and available throughout the app
})
export class WeatherService {
  private apiKey = '3e3b11a6526cd2ba87a54a775d0ed0d5'; // Replace with your actual API key
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  // Method to get current weather by city name
  getCurrentWeather(city: string): Observable<any> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`; // units=metric for Celsius
    return this.http.get(url);
  }

  // Optional: Method to get weather by coordinates
  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}