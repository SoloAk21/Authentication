# Full-Stack Authentication System

A modern, secure, and scalable authentication system built with **React (Vite + Tailwind CSS)** for the frontend and **Express.js + MongoDB** for the backend. Features include user registration, login, email verification, password reset, Google OAuth, and token-based authentication.

---

## Features

### Frontend
- **User Authentication**: Signup, login, and logout with JWT tokens.
- **Email Verification**: Verify email with a one-time code.
- **Password Management**: Forgot password and secure password reset.
- **Google OAuth**: Sign in with Google.
- **Responsive UI**: Built with Tailwind CSS.
- **Error Handling**: Custom alerts for success and error messages.

### Backend
- **Rate Limiting**: Prevent brute-force attacks on sensitive endpoints.
- **Security**: Password hashing, JWT tokens, and secure cookies.
- **Email Integration**: Send transactional emails with Nodemailer.

---

## Technologies

### Frontend
- React, Vite, Tailwind CSS, Axios, React Router, React Icons.

### Backend
- Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Nodemailer, Passport.js, Express Rate Limit.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/authentication-system.git
   cd authentication-system
   ```

2. **Install Dependencies**:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` directory:
     ```env
     MONGO_URL=mongodb://localhost:27017/your-database-name
     JWT_SECRET=your-jwt-secret-key
     JWT_REFRESH_SECRET=your-jwt-refresh-secret-key
     FRONTEND_URL=http://localhost:3000
     MAILTRAP_TOKEN=your-mailtrap-token
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     ```

4. **Run the Application**:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm run dev
     ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

---

## API Endpoints

### Authentication
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Log in a user.
- **POST /api/auth/logout**: Log out a user.
- **POST /api/auth/verify-email**: Verify email.
- **POST /api/auth/forgot-password**: Request a password reset.
- **POST /api/auth/reset-password/:userId/:token**: Reset password.
- **POST /api/auth/refresh-token**: Refresh access token.
- **GET /api/auth/google**: Initiate Google OAuth.
- **GET /api/auth/google/callback**: Google OAuth callback.

### User
- **GET /api/user/profile**: Fetch user profile (protected route).

---

## Security Features

1. **Rate Limiting**:
   - Prevent brute-force attacks on login and password reset endpoints.
   ```javascript
   const loginLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5, // 5 requests per window
     message: "Too many login attempts. Please try again later.",
   });
   ```
   
---

## Frontend Features

1. **Token Management**:
   - Store `accessToken` in memory and in an HTTP-only cookie.

2. **Error Handling**:
   - Display user-friendly error messages.
   ```javascript
   {error && <Alert message={error} type="error" />}
   ```

3. **Form Validation**:
   - Validate inputs before making API requests.
   ```javascript
   const validateForm = () => {
     if (!email || !password) {
       setError("All fields are required");
       return false;
     }
     return true;
   };
   ```

---

## Contact

For questions or feedback, reach out to [your-email@example.com](mailto:soloasefa6603@gmail.com).

---

Thank you for using this authentication system! 🚀
