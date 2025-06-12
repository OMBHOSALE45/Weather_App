// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for directives like ngIf, ngFor
import { FormsModule } from '@angular/forms'; // Needed for ngModel (two-way data binding)
import { WeatherService } from './weather.service'; // Import our WeatherService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Add FormsModule here
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather App';
  city: string = ''; // To store user input for city
  weatherData: any | null = null; // To store weather data
  errorMessage: string = ''; // To store any error messages

  constructor(private weatherService: WeatherService) { }

  getWeather(): void {
    if (!this.city) {
      this.errorMessage = 'Please enter a city name.';
      this.weatherData = null;
      return;
    }

    this.errorMessage = ''; // Clear previous errors

    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log('Weather Data:', this.weatherData); // For debugging
      },
      error: (error) => {
        console.error('Error fetching weather:', error);
        if (error.status === 404) {
          this.errorMessage = 'City not found. Please check the spelling.';
        } else if (error.error && error.error.message) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
        this.weatherData = null; // Clear weather data on error
      }
    });
  }
}