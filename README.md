# 🌟 Sumu's Project - Personal Dashboard

A sleek, interactive, and personalized web-based dashboard designed to help manage productivity, track finances, and seamlessly navigate the university campus. The project features a soft beige and light brown theme with customizable accent colors.

## ✨ Key Features

### ⏱️ Focus Zone (Productivity)
- **Pomodoro Timer**: A customizable sleek timer to track focus sessions (Start, Reset, Skip).
- **Task Manager**: Add, cross off, and delete high-priority tasks.
- *Data is saved locally so you don't lose your tasks upon refreshing.*

### 💰 Finances (Budget Tracker)
- **Budget Management**: Set and modify your total budget.
- **Expense Logging**: Log your daily expenses (Food, Travel, Books, Rent) with amount and description.
- **Dynamic Stats**: Real-time calculation of "Remaining Balance" and "Total Spent".
- *Expenses and budget data are persisted in the browser's Local Storage.*

### 📍 Campus Guide (UIU Navigator)
- **Interactive Map**: Built-in OpenStreetMap focused on the **United International University (UIU)** campus in Dhaka.
- **Campus Directory**: A detailed list of key campus locations including the Central Library, Canteen, Medical Center, and Study Lounges.
- **Smart Filtering & Search**: Instantly find places by category (Libraries, Cafes, Hospitals, etc.) or via the search bar.
- **Real-time Directions**: Click "Get Directions" on any location to automatically open Google Maps with the shortest route from your current real-time GPS location!

### 🎨 Personalization
- **Theme Switcher**: Change the accent color of the entire dashboard with a single click (default is Light Brown / Soft Beige).
- **Live Clock**: Real-time clock display integrated into the header.

## 🚀 Technologies Used
- **HTML5**: Structure and semantics.
- **CSS3**: Styling, Flexbox/Grid layouts, glassmorphism effects, and CSS variables for theming.
- **Vanilla JavaScript**: DOM manipulation, LocalStorage integration, Geolocation API, and Google Maps URL construction.

## 🛠️ How to Run Locally

1. **Clone or Download** the project files to your local machine.
2. **Open the project folder** in your preferred code editor (e.g., VS Code).
3. **To enable GPS/Location Features**: 
  - Browsers often block Geolocation requests from raw `file://` URLs. 
  - For the "Get Directions" feature to work perfectly, launch the project using a local server (like the **Live Server** extension in VS Code).
4. Navigate to the local URL (usually `http://127.0.0.1:5500/index.html`) and enjoy the dashboard!

## 📌 Note on Map Directions
When clicking **"Get Directions"**, the browser will ask for Location Access. 
- If you click **Allow**, it will open a new Google Maps tab routing you from your current location to the selected UIU campus destination.
- If you click **Block** or location is unavailable, it will safely fall back to searching the destination directly on Google Maps.

---
*Designed & Developed by Sumu*
