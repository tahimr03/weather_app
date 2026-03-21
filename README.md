# Forecastly 

Forecastly is a React-based weather application that allows users to get weather information either by searching for their city, or by using a quick action get current location button

---

## Features

### Location Search
- Users can type a city, region, or country into the input field (country will return it's capital city)
- Dynamic suggestions appear as the user types
- Suggestions are ranked based on relevance
- Clicking a suggestion automatically fetches weather data

### Current Location
- A "Use Current Location" button retrieves the user's GPS coordinates
- Uses the browser Geolocation API
- Displays weather for the user's exact location

### Weather Display
- Current temperature (°C)
- Weather condition with icon
- Feels like temperature
- Humidity
- Wind speed

### 5-Day Forecast
- Displays upcoming weather for 5 days
- Includes:
  - Day of the week
  - Date
  - Weather condition and icon
  - High and low temperatures
  - Chance of rain

### Error Handling
- Handles empty input
- Displays message for invalid locations
- Handles API failures
- Handles denied or unavailable geolocation

### Reset Functionality
- Clears input field
- Removes weather data
- Resets suggestions and error messages
- Returns app to initial state

---

## Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Tailwind CSS
- WeatherAPI (https://www.weatherapi.com/)

---

## API Usage

### Weather Data
### Location Search
- Users can type a city, region, or country into the input field
- Dynamic suggestions appear as the user types
- Suggestions are ranked based on relevance
- Clicking a suggestion automatically fetches weather data

### Current Location
- A "Use Current Location" button retrieves the user's GPS coordinates
- Uses the browser Geolocation API
- Displays weather for the user's exact location

### Weather Display
- Current temperature (°C)
- Weather condition with icon
- Feels like temperature
- Humidity
- Wind speed

### 5-Day Forecast
- Displays upcoming weather for 5 days
- Includes:
  - Day of the week
  - Date
  - Weather condition and icon
  - High and low temperatures
  - Chance of rain

### Error Handling
- Handles empty input
- Displays message for invalid locations
- Handles API failures
- Handles denied or unavailable geolocation

### Reset Functionality
- Clears input field
- Removes weather data
- Resets suggestions and error messages
- Returns app to initial state

---

## Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Tailwind CSS
- WeatherAPI (https://www.weatherapi.com/)

---

## API Usage

### Weather Data
### Location Search
- Users can type a city, region, or country into the input field
- Dynamic suggestions appear as the user types
- Suggestions are ranked based on relevance
- Clicking a suggestion automatically fetches weather data

### Current Location
- A "Use Current Location" button retrieves the user's GPS coordinates
- Uses the browser Geolocation API
- Displays weather for the user's exact location

### Weather Display
- Current temperature (°C)
- Weather condition with icon
- Feels like temperature
- Humidity
- Wind speed

### 5-Day Forecast
- Displays upcoming weather for 5 days
- Includes:
  - Day of the week
  - Date
  - Weather condition and icon
  - High and low temperatures
  - Chance of rain

### Error Handling
- Handles empty input
- Displays message for invalid locations
- Handles API failures
- Handles denied or unavailable geolocation

### Reset Functionality
- Clears input field
- Removes weather data
- Resets suggestions and error messages
- Returns app to initial state

---

## Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Tailwind CSS
- WeatherAPI (https://www.weatherapi.com/)

---

## API Usage

### Weather Data & Location Search
https://www.weatherapi.com/ (using api key)


## Setup Instructions

1. Clone repository
2. Navigate to project and install dependencies (npm install)
3. Create API key and replace
4. Run development server (npm run dev)

## Notes

- Uses real-time weather data (no static values)  
- Requires internet connection  
- Geolocation requires browser permission  
- API key should not be exposed publicly  

---