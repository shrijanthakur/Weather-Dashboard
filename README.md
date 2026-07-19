# Weather Dashboard

A full-stack weather application that shows real-time and forecasted weather based on your location, with user accounts to save and revisit favorite cities.

**Live Demo:** https://weather-dashboard-kappa-one.vercel.app/
**Backend API:** https://weather-dashboard-2p9b.onrender.com

> Note: the backend is hosted on Render's free tier, so the first request after a period of inactivity may take 30–50 seconds to respond while the server wakes up.

---

## Features

- **Location-based weather** — automatically detects your location on load and shows current conditions (temperature, humidity, wind speed)
- **City search** — manually search weather for any city
- **User authentication** — register/login with JWT-based access and refresh tokens
- **Favorite locations** — logged-in users can save, view, and remove favorite cities, persisted in MongoDB
- **User lookup** — search for another user by username and view their saved favorite locations
- **Secure API key handling** — all weather API calls are routed through a backend proxy so the third-party API key is never exposed to the browser
- **Backend caching** — repeated weather requests for the same location are served from an in-memory cache for 10 minutes, reducing redundant calls to the third-party API

---

## Tech Stack

**Frontend:** React, Tailwind CSS, Vite
**Backend:** Node.js, Express
**Database:** MongoDB with Mongoose
**Auth:** JWT (access + refresh tokens), bcrypt password hashing
**Weather Data:** OpenWeatherMap API
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB Atlas connection string
- A free OpenWeatherMap API key

### 1. Clone the repo
```bash
git clone https://github.com/shrijanthakur/Weather-Dashboard.git
cd Weather-Dashboard
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENWEATHER_KEY=your_openweathermap_api_key
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
```

Run the server:
```bash
npx nodemon server.js
```

### 3. Frontend setup
```bash
cd client
npm install
```

Create a `.env` file in `client/`:
```
VITE_API_URL=http://localhost:5000
```

Run the client:
```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| GET | `/api/weather/current` | No | Current weather by city or lat/lon |
| GET | `/api/weather/forecast` | No | 5-day forecast by city or lat/lon |
| POST | `/api/users/register` | No | Register a new user |
| POST | `/api/users/login` | No | Log in and receive tokens |
| POST | `/api/users/logout` | Yes | Log out and clear refresh token |
| GET | `/api/users/current-user` | Yes | Get the logged-in user's details |
| GET | `/api/users/search?username=` | No | Search users by username |
| GET | `/api/favorites` | Yes | Get the logged-in user's favorites |
| POST | `/api/favorites` | Yes | Add a favorite location |
| DELETE | `/api/favorites/:id` | Yes | Remove a favorite location |
| GET | `/api/favorites/user/:username` | No | View another user's favorites |

---

## Coming Next

- [ ] 5-day forecast display in the UI
- [ ] Trend chart / data visualization across saved locations

---

## Author

**Shrijan Thakur**
[GitHub](https://github.com/shrijanthakur) · [LinkedIn](https://linkedin.com/in/shrijan-thakur)