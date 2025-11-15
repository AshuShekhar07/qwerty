
#  Smart City Dashboard

### Real-time Weather • Air Quality Index • Traffic Density

A modern, interactive, single-page dashboard with GIF-based dynamic backgrounds.

---

##  Overview

The *Smart City Dashboard* is a *single-page web application* that provides real-time or publicly available data for any major city.
It displays:

*  *Weather Forecast*
*  *Air Quality Index (AQI)*
*  *Traffic Density*

The UI is transparent, minimal, animated, and fully optimized for smooth scrolling with automated background GIF transitions that match real-world weather conditions (sunny, cloudy, rainy, thunder, snow, etc.).

This project is *frontend-only*. APIs and backend integration can be added later.

---

##  Features

###  Live Weather Updates

* Real-time temperature, humidity, wind speed, feels-like temperature
* Weather icons & descriptions
* Automatically changing weather GIF background
* Smooth crossfade transitions between GIFs
* Fully responsive UI

###  Air Quality Index (AQI)

* PM2.5 & PM10 readings
* AQI Category (Good, Moderate, Unhealthy, etc.)
* AQI chart visualization using Chart.js
* Live or fallback simulated AQI data

###  Traffic Density

* Current congestion level
* Visual traffic indicator
* Traffic percentage
* Chart visualization
* Live or simulated data

###  Navigation

* Sticky transparent Navbar
* Smooth scroll to all sections (Weather, AQI, Traffic)
* Mobile-friendly hamburger menu

###  Authentication (Frontend Only)

* Login/Signup button (modal)
* Profile icon showing a pop-up profile box
* No backend — simulation only

###  Modern UI / UX

* Animated GIF backgrounds
* Frosted glass panels
* Light/Dark theme toggle
* Fully mobile responsive
* Smooth animations & transitions

---

##  Technologies Used

### *Frontend*

* HTML5
* CSS3
* JavaScript (Vanilla JS)

### *Libraries*

* [Chart.js](https://www.chartjs.org/) (via CDN)

### *APIs (Optional Live Data)*

The project supports:

* *Open-Meteo API* — Weather
* *OpenAQ API* — Air Quality
* *CityBikes API* — Traffic Density
* If APIs fail → simulated fallback data is auto-generated

---

##  Dynamic Weather Background System

The dashboard uses *GIF-based background animations* that automatically change according to the weather code returned by the API.

Examples:

*  0 → sunny.gif
*  1–3 → cloudy.gif
*  51–67, 80–82 → rainy.gif
*  95–99 → thunder.gif
*   71–86 → snow.gif

Smooth transitions are achieved through a *dual-layer opacity fade system*.

---

##  How to Run Locally

### *Option 1 — VS Code Live Server (Recommended)*

1. Install “Live Server” extension
2. Right-click index.html → *Open with Live Server*
3. Dashboard opens at
   http://localhost:5500/

---

### *Option 3 — Node.js HTTP Server*


npx http-server


Open:
http://localhost:8080/

---

##  Features You Can Test

###  Weather

* Change city → Weather updates
* GIF background changes based on weather condition
* Loading & error UI states

### AQI

* PM2.5 and PM10 updates
* AQI categories (Good, Moderate, Unhealthy, etc.)
* Responsive chart

###  Traffic

* Traffic percentage updates
* Traffic indicator changes color
* Chart updates properly

###  UI

* Navbar smooth-scroll
* Mobile hamburger menu
* Profile box toggle
* Login/Signup modal

---

##  Notes

* *There is no backend.*
  Login, Signup, and Profile are *UI-only simulations*.
* API calls may fail due to CORS or rate limits → fallback simulated data is used.
* GIFs should be optimized to avoid large load times.

---

##  Future Enhancements

* Backend authentication (Node.js / Firebase)
* City auto-suggestion search
* Real-time WebSocket updates
* Interactive map view (Leaflet or Mapbox)
* Multi-day AQI & Traffic forecasting
* Add support for day/night weather GIF variations

---

##  Contributions

Pull requests are welcome!
For major changes, open an issue first to discuss.

---

##  Author

*Smart City Dashboard — 2025*
Built for learning, hackathons, and real-time data visualization.
