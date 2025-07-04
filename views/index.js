module.exports = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Login - Auth Demo</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to right, #e0eafc, #cfdef3);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      background-color: #fff;
      padding: 35px 40px;
      border-radius: 12px;
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
      width: 380px;
    }

    h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #0077cc;
    }

    input, select, button {
      width: 100%;
      padding: 12px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 15px;
    }

    select {
      background-color: #f8f8f8;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      font-size: 14px;
    }

    .checkbox-wrapper input[type="checkbox"] {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    button {
      background-color: #0077cc;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s ease-in-out;
    }

    button:hover {
      background-color: #005fa3;
    }

    .link {
      text-align: center;
      font-size: 14px;
    }

    .link a {
      color: #0077cc;
      text-decoration: none;
      font-weight: 500;
    }

    .link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Login</h2>
    <form id="loginForm">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />

      <div class="checkbox-wrapper">
        <input type="checkbox" id="rememberMe" />
        <label for="rememberMe">Remember Me</label>
      </div>

      <label for="role">Login as:</label>
      <select id="role" required>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <button type="submit">Login</button>
      <p class="link">Not registered yet? <a href="/register">Register here</a></p>
    </form>
  </div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const rememberMe = document.getElementById('rememberMe').checked;

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password, rememberMe })
        });

        const data = await res.json();

        if (res.ok) {
          if (rememberMe) alert('✅ Stay signed in');
          alert('Login successful!');

          localStorage.clear();
          sessionStorage.clear();

          if (rememberMe) {
            localStorage.setItem('authDemoEmail', data.email);
            localStorage.setItem('authDemoRole', data.role);
            localStorage.setItem('authDemoRemember', true);
          } else {
            sessionStorage.setItem('authDemoEmail', data.email);
            sessionStorage.setItem('authDemoRole', data.role);
          }

          if (data.role === 'Admin') {
            window.location.href = '/admin-dashboard';
          } else if (data.role === 'User') {
            window.location.href = '/user-dashboard';
          } else {
            alert('Unknown role');
          }
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        console.error(err);
        alert('Error during login');
      }
    });
  </script>
</body>
</html>
`;
