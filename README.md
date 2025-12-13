# PH-Assignment-11 Website (ScholarStream)

ScholarStream is a full-stack scholarship management platform designed for students, moderators, and administrators. The platform allows users to explore scholarships, apply online, manage applications, submit reviews, and handle secure payments, while admins and moderators can manage scholarships, users, and applications through a role-based dashboard.

---

## Admin Credentials

Email: [admin@mailinator.com](mailto:admin@mailinator.com)
Password: ABC@123abc

## Moderator Credentials

Email: [moderator@mailinator.com](mailto:moderator@mailinator.com)
Password: ABC@123abc

## Student Credentials

Email: [student@mailinator.com](mailto:student@mailinator.com)
Password: ABC@123abc

---

## Links:

- **Live Site:** []()
- **Server Repo:** [https://github.com/nahiyankhan55/b12a11-server](https://github.com/nahiyankhan55/b12a11-server)

---

## Features

### General Features

- User authentication using Firebase
- JWT-based secure API access with httpOnly cookies
- Role-based dashboard (Student, Moderator, Admin)
- Responsive design for desktop and mobile
- Secure Stripe payment integration
- Protected routes and role-based access control

### Student Features

- Browse and search scholarships
- Apply for scholarships
- Pay application fees securely
- View and manage applied applications
- Edit or delete pending applications
- Add, update, and delete reviews
- View personal reviews in a table format

### Moderator Features

- View applications related to assigned scholarships
- Update application status (Pending, Processing, Completed, Rejected)
- Provide feedback on applications
- View reviews posted for their managed scholarships

### Admin Features

- Add new scholarships
- Update and delete existing scholarships
- Manage all users
- Change user roles (Student ↔ Moderator)
- View platform analytics
- Monitor total users, scholarships, applications, and fees collected

### Analytics Dashboard

- Total users count
- Total scholarships count
- Total fees collected
- Application distribution by university (chart-based visualization)

---

## Technologies Used

### Frontend

- React
- React Router
- TanStack Query (React Query)
- Axios
- Material UI (buttons & inputs only)
- Tailwind CSS
- React Icons
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- Stripe API

### Authentication & Hosting

- Firebase Authentication
- Netlify (Frontend)
- MongoDB Atlas
- Node.js server (Backend hosting)

---

## Dependencies

```json
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/material": "^7.3.6",
    "@stripe/react-stripe-js": "^5.4.1",
    "@stripe/stripe-js": "^8.5.3",
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "@tanstack/react-table": "^8.21.3",
    "aos": "^2.3.4",
    "axios": "^1.13.2",
    "dotenv": "^17.2.3",
    "firebase": "^12.6.0",
    "prop-types": "^15.8.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-head": "^3.4.2",
    "react-icons": "^5.5.0",
    "react-router": "^7.10.1",
    "react-toastify": "^11.0.5",
    "recharts": "^3.5.1",
    "sweetalert2": "^11.26.4",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
```

---

## How to Run Locally

### Client

1. Clone the repository
2. Install dependencies
   npm install
3. Create a .env file with required variables
4. Run the client
   npm run dev

### Server

1. Go to server directory
2. Install dependencies
   npm install
3. Add .env file with required variables
4. Run the server
   nodemon index.js or node index.js

## Project Structure

- Client: React-based frontend with role-based dashboards
- Server: Express API with JWT-protected routes
- Database: MongoDB collections for users, scholarships, applications, reviews, and payments
