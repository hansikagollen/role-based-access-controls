# 🔐 Role-Based Authentication System using Node.js, Express, and MongoDB

This project is a complete authentication system built using **Node.js**, **Express.js**, and **MongoDB**, with support for both **User** and **Admin** roles. It includes login, registration, JWT-based authentication, role-based redirection, and "Remember Me" functionality using localStorage and sessionStorage.

---

## ✅ Features & Explanations

### 🔑 1. Role-Based Login
- Users select a role (User or Admin) during registration and login.
- After logging in:
  - Admins are redirected to `/admin-dashboard`
  - Users are redirected to `/user-dashboard`

### 🔒 2. JWT Authentication
- On successful login, a JWT is issued and stored as an **HTTP-only cookie**.
- This ensures session security and allows protected access to backend routes.

### 🧠 3. Remember Me (Smart Session Storage)
- If "Remember Me" is checked:
  - Email and role are saved in **localStorage**
- If unchecked:
  - Data is saved in **sessionStorage**
- On logout, all storage types (cookies, localStorage, sessionStorage) are cleared.

### 📨 4. Login & Registration Pages
- Clean and responsive login/register forms.
- Basic form validations.
- API endpoints:  
  - `POST /api/auth/register`  
  - `POST /api/auth/login`

### 🧑‍💻 5. User & Admin Dashboards
- After login, users are redirected to a role-specific dashboard.
- Dashboards show basic info and include buttons (functional or placeholder).
- Each page checks role and session before allowing access.

### 🛡️ 6. Protected Access
- Frontend pages check the user's role and session storage.
- If role/email is missing or invalid, the user is redirected back to the login page.

---

## 🚀 How to Run

1. **Install dependencies**
   ```bash
   npm install
