/* =====================================
   SMART CITY DASHBOARD - MAIN JAVASCRIPT
   ===================================== */

/* =====================================
   1. API CONFIGURATION & PLACEHOLDERS
   ===================================== */

// 🔹 PASTE YOUR API KEYS AND URLS HERE:
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
const WEATHER_API_KEY = "eb0d89fc0720bd3ed928c4ccb167e677";
const AQI_API_URL = "PASTE-YOUR-AQI-API-URL";
const AQI_API_KEY = "PASTE-YOUR-AQI-API-KEY";
const TRAFFIC_API_URL = "PASTE-YOUR-TRAFFIC-API-URL";
const TRAFFIC_API_KEY = "PASTE-YOUR-TRAFFIC-API-KEY";

// Default city to load on page start
const DEFAULT_CITY = "London";

/* =====================================
   2. DOM ELEMENTS & GLOBAL VARIABLES
   ===================================== */

// Search elements
const citySearchInput = document.getElementById('citySearch');
const searchBtn = document.getElementById('searchBtn');

// Theme toggle
const themeToggle = document.getElementById('themeToggle');

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Weather elements
const weatherSection = document.getElementById('weather');
const weatherLoading = document.getElementById('weatherLoading');
const weatherError = document.getElementById('weatherError');
const weatherErrorText = document.getElementById('weatherErrorText');
const weatherContent = document.getElementById('weatherContent');
const cityNameEl = document.getElementById('cityName');
const weatherDateEl = document.getElementById('weatherDate');
const temperatureEl = document.getElementById('temperature');
const weatherDescEl = document.getElementById('weatherDescription');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const feelsLikeEl = document.getElementById('feelsLike');
const weatherIconEl = document.getElementById('weatherIcon');

// AQI elements
const aqiLoading = document.getElementById('aqiLoading');
const aqiError = document.getElementById('aqiError');
const aqiErrorText = document.getElementById('aqiErrorText');
const aqiContent = document.getElementById('aqiContent');
const aqiValueEl = document.getElementById('aqiValue');
const aqiCategoryEl = document.getElementById('aqiCategory');
const aqiChartCanvas = document.getElementById('aqiChart');

// Traffic elements
const trafficLoading = document.getElementById('trafficLoading');
const trafficError = document.getElementById('trafficError');
const trafficErrorText = document.getElementById('trafficErrorText');
const trafficContent = document.getElementById('trafficContent');
const trafficLevelEl = document.getElementById('trafficLevel');
const trafficPercentageEl = document.getElementById('trafficPercentage');
const trafficIndicatorEl = document.getElementById('trafficIndicator');
const trafficChartCanvas = document.getElementById('trafficChart');

// Chart instances
let aqiChart = null;
let trafficChart = null;

// Current city
let currentCity = DEFAULT_CITY;

/* =====================================
   3. THEME MANAGEMENT
   ===================================== */

// Load theme from memory on page load
function loadTheme() {
  // Check if user previously selected a theme
  const savedTheme = getThemeFromMemory();
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    // Default to light theme
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// Toggle between light and dark mode
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  saveThemeToMemory(newTheme);
  
  // Update charts with new theme colors
  updateChartThemes();
}

// Simple in-memory theme storage (since localStorage is not available)
let themeMemory = 'light';

function saveThemeToMemory(theme) {
  themeMemory = theme;
}

function getThemeFromMemory() {
  return themeMemory;
}

// Update chart colors based on theme
function updateChartThemes() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#F1F5F9' : '#1F2937';
  const gridColor = isDark ? '#334155' : '#E5E7EB';
  
  if (aqiChart) {
    aqiChart.options.scales.x.ticks.color = textColor;
    aqiChart.options.scales.y.ticks.color = textColor;
    aqiChart.options.scales.x.grid.color = gridColor;
    aqiChart.options.scales.y.grid.color = gridColor;
    aqiChart.update();
  }
  
  if (trafficChart) {
    trafficChart.options.scales.x.ticks.color = textColor;
    trafficChart.options.scales.y.ticks.color = textColor;
    trafficChart.options.scales.x.grid.color = gridColor;
    trafficChart.options.scales.y.grid.color = gridColor;
    trafficChart.update();
  }
}

/* =====================================
   4. WEATHER FUNCTIONS
   ===================================== */

// Fetch weather data from API
async function fetchWeatherData(city) {
  try {
    // Show loading state
    showElement(weatherLoading);
    hideElement(weatherError);
    hideElement(weatherContent);
    
    // Example API URL construction (adjust based on your actual API)
    // const url = ${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric;
    
    // For demonstration, we'll show how to make the fetch call
    // Uncomment and modify this when you add your API:
    /*
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    renderWeatherData(data);
    */
    
    // Since no real API is connected, show example data after 1 second
    setTimeout(() => {
      const exampleData = {
        name: city,
        main: {
          temp: 22,
          feels_like: 21,
          humidity: 65
        },
        weather: [{
          main: 'Clear',
          description: 'clear sky'
        }],
        wind: {
          speed: 3.5
        }
      };
      renderWeatherData(exampleData);
    }, 1000);
    
  } catch (error) {
    showWeatherError(error.message);
  }
}

// Display weather data on the page
function renderWeatherData(data) {
  hideElement(weatherLoading);
  showElement(weatherContent);
  
  // Update city name
  cityNameEl.textContent = data.name;
  
  // Update date
  const now = new Date();
  weatherDateEl.textContent = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Update temperature
  temperatureEl.textContent = Math.round(data.main.temp);
  
  // Update description
  weatherDescEl.textContent = data.weather[0].description;
  
  // Update details
  humidityEl.textContent = data.main.humidity + '%';
  windSpeedEl.textContent = data.wind.speed + ' km/h';
  feelsLikeEl.textContent = Math.round(data.main.feels_like) + '°C';
  
  // Update weather icon
  updateWeatherIcon(data.weather[0].main);
  
  // Change background based on weather
  updateWeatherBackground(data.weather[0].main);
  
  // Add fade-in animation
  weatherContent.classList.add('fade-in');
}

// Update weather icon based on condition
function updateWeatherIcon(condition) {
  const iconMap = {
    'Clear': '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
    'Clouds': '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>',
    'Rain': '<line x1="16" y1="13" x2="16" y2="17"></line><line x1="8" y1="13" x2="8" y2="17"></line><line x1="12" y1="15" x2="12" y2="19"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>',
    'Snow': '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>',
    'Haze': '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>',
    'Fog': '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>'
  };
  
  const iconSVG = iconMap[condition] || iconMap['Clear'];
  weatherIconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + iconSVG + '</svg>';

}

// Update weather section background based on condition
function updateWeatherBackground(condition) {
  // Remove all weather classes
  weatherSection.classList.remove('sunny', 'cloudy', 'rainy', 'haze', 'snow');
  
  // Add appropriate class
  const classMap = {
    'Clear': 'sunny',
    'Clouds': 'cloudy',
    'Rain': 'rainy',
    'Haze': 'haze',
    'Fog': 'haze',
    'Snow': 'snow'
  };
  
  const weatherClass = classMap[condition] || 'sunny';
  weatherSection.classList.add(weatherClass);
}

// Show weather error message
function showWeatherError(message) {
  hideElement(weatherLoading);
  hideElement(weatherContent);
  showElement(weatherError);
  weatherErrorText.textContent = message || 'Failed to load weather data';
}

/* =====================================
   5. AQI (AIR QUALITY INDEX) FUNCTIONS
   ===================================== */

// Fetch AQI data from API
async function fetchAQIData(city) {
  try {
    // Show loading state
    showElement(aqiLoading);
    hideElement(aqiError);
    hideElement(aqiContent);
    
    // Example API URL construction (adjust based on your actual API)
    // const url = AQI_API_URL + '?city=' + city + '&key=' + AQI_API_KEY;
    
    // For demonstration, show example data after 1 second
    setTimeout(() => {
      const exampleData = {
        aqi: 85,
        category: 'Moderate',
        pollutants: {
          pm25: 35,
          pm10: 50,
          no2: 25,
          o3: 45,
          so2: 15
        }
      };
      renderAQIData(exampleData);
    }, 1200);
    
  } catch (error) {
    showAQIError(error.message);
  }
}

// Display AQI data and chart
function renderAQIData(data) {
  hideElement(aqiLoading);
  showElement(aqiContent);
  
  // Update AQI value
  aqiValueEl.textContent = data.aqi;
  
  // Update category
  aqiCategoryEl.textContent = data.category;
  
  // Update AQI number color based on value
  if (data.aqi <= 50) {
    aqiValueEl.style.color = '#10B981'; // Good - Green
  } else if (data.aqi <= 100) {
    aqiValueEl.style.color = '#F59E0B'; // Moderate - Yellow
  } else if (data.aqi <= 150) {
    aqiValueEl.style.color = '#F97316'; // Unhealthy for Sensitive - Orange
  } else if (data.aqi <= 200) {
    aqiValueEl.style.color = '#EF4444'; // Unhealthy - Red
  } else {
    aqiValueEl.style.color = '#A855F7'; // Very Unhealthy - Purple
  }
  
  // Create or update chart
  createAQIChart(data.pollutants);
  
  // Add fade-in animation
  aqiContent.classList.add('fade-in');
}

// Create Chart.js bar chart for pollutants
function createAQIChart(pollutants) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#F1F5F9' : '#1F2937';
  const gridColor = isDark ? '#334155' : '#E5E7EB';
  
  // Destroy existing chart if it exists
  if (aqiChart) {
    aqiChart.destroy();
  }
  
  const ctx = aqiChartCanvas.getContext('2d');
  
  aqiChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['PM2.5', 'PM10', 'NO₂', 'O₃', 'SO₂'],
      datasets: [{
        label: 'Pollutant Levels (µg/m³)',
        data: [
          pollutants.pm25,
          pollutants.pm10,
          pollutants.no2,
          pollutants.o3,
          pollutants.so2
        ],
        backgroundColor: [
          '#1FB8CD',
          '#FFC185',
          '#B4413C',
          '#5D878F',
          '#DB4545'
        ],
        borderRadius: 8,
        barThickness: 50
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor,
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: gridColor,
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        },
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

// Show AQI error message
function showAQIError(message) {
  hideElement(aqiLoading);
  hideElement(aqiContent);
  showElement(aqiError);
  aqiErrorText.textContent = message || 'Failed to load air quality data';
}

/* =====================================
   6. TRAFFIC DENSITY FUNCTIONS
   ===================================== */

// Fetch traffic data from API
async function fetchTrafficData(city) {
  try {
    // Show loading state
    showElement(trafficLoading);
    hideElement(trafficError);
    hideElement(trafficContent);
    
    // Example API URL construction (adjust based on your actual API)
    // const url = TRAFFIC_API_URL + '?city=' + city + '&key=' + TRAFFIC_API_KEY;
    
    // For demonstration, show example data after 1 second
    setTimeout(() => {
      const exampleData = {
        level: 'Medium',
        percentage: 65,
        hourlyData: [45, 50, 55, 60, 70, 75, 80, 75, 70, 65, 60, 55]
      };
      renderTrafficData(exampleData);
    }, 1400);
    
  } catch (error) {
    showTrafficError(error.message);
  }
}

// Display traffic data and chart
function renderTrafficData(data) {
  hideElement(trafficLoading);
  showElement(trafficContent);
  
  // Update traffic level
  trafficLevelEl.textContent = data.level;
  
  // Update percentage
  trafficPercentageEl.textContent = data.percentage + '%';
  
  // Update indicator color based on level
  const indicatorColors = {
    'Low': '#10B981',
    'Medium': '#F59E0B',
    'High': '#F97316',
    'Congested': '#EF4444'
  };
  trafficIndicatorEl.style.backgroundColor = indicatorColors[data.level] || '#10B981';
  
  // Create or update chart
  createTrafficChart(data.hourlyData);
  
  // Add fade-in animation
  trafficContent.classList.add('fade-in');
}

// Create Chart.js line chart for traffic density
function createTrafficChart(hourlyData) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#F1F5F9' : '#1F2937';
  const gridColor = isDark ? '#334155' : '#E5E7EB';
  
  // Destroy existing chart if it exists
  if (trafficChart) {
    trafficChart.destroy();
  }
  
  const ctx = trafficChartCanvas.getContext('2d');
  
  // Generate labels for past 12 hours
  const labels = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    labels.push(hour.getHours() + ':00');
  }
  
  trafficChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Traffic Density (%)',
        data: hourlyData,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor,
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: gridColor,
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: textColor,
            callback: function(value) {
              return value + '%';
            }
          },
          grid: {
            color: gridColor
          }
        },
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

// Show traffic error message
function showTrafficError(message) {
  hideElement(trafficLoading);
  hideElement(trafficContent);
  showElement(trafficError);
  trafficErrorText.textContent = message || 'Failed to load traffic data';
}

/* =====================================
   7. SEARCH HANDLER
   ===================================== */

// Handle city search
function handleSearch() {
  const city = citySearchInput.value.trim();
  
  if (!city) {
    alert('Please enter a city name');
    return;
  }
  
  currentCity = city;
  
  // Fetch all data for the new city
  fetchWeatherData(city);
  fetchAQIData(city);
  fetchTrafficData(city);
  
  // Scroll to weather section
  weatherSection.scrollIntoView({ behavior: 'smooth' });
}

/* =====================================
   8. UTILITY FUNCTIONS
   ===================================== */

// Show element
function showElement(element) {
  element.style.display = 'flex';
}

// Hide element
function hideElement(element) {
  element.style.display = 'none';
}

// Toggle mobile menu
function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
}

/* =====================================
   9. EVENT LISTENERS
   ===================================== */

// Search button click
searchBtn.addEventListener('click', handleSearch);

// Search on Enter key press
citySearchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Hamburger menu toggle
hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleMobileMenu();
  });
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =====================================
   10. INITIALIZATION
   ===================================== */

// Initialize app on page load
function initApp() {
  // Load theme preference
  loadTheme();
  
  // Load default city data
  fetchWeatherData(DEFAULT_CITY);
  fetchAQIData(DEFAULT_CITY);
  fetchTrafficData(DEFAULT_CITY);
  
  console.log('Smart City Dashboard initialized!');
  console.log('Please add your API keys to fetch real data.');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}