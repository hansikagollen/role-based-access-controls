module.exports = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Register - Auth Demo</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to right, #e0c3fc, #8ec5fc);
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
      width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #6a0dad;
    }

    input, select, button {
      width: 100%;
      padding: 12px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 15px;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }

    .checkbox-wrapper input[type="checkbox"] {
      margin: 0;
      width: auto;
    }

    .checkbox-wrapper label {
      font-size: 14px;
      margin: 0;
      cursor: pointer;
    }

    button {
      background-color: #6a0dad;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s ease-in-out;
    }

    button:hover {
      background-color: #53178f;
    }

    .link {
      text-align: center;
      font-size: 14px;
    }

    .link a {
      color: #6a0dad;
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
    <h2>Register</h2>
    <form id="registerForm">
      <input type="text" id="username" placeholder="Username" required />
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />

      <div class="checkbox-wrapper">
        <input type="checkbox" id="rememberMe" />
        <label for="rememberMe">Remember Me</label>
      </div>

      <label for="role">Register as:</label>
      <select id="role" required>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <button type="submit">Register</button>
      <p class="link">Already registered? <a href="/login">Login here</a></p>
    </form>
  </div>

  <script>
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;
      const rememberMe = document.getElementById('rememberMe').checked;

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, email, password, role, rememberMe })
        });

        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          const text = await res.text();
          console.error('Non-JSON response:', text);
          alert(\`Server error:\\n\${text}\`);
          return;
        }

        if (res.ok) {
          alert('Registration successful! Please check your email to verify.');
          window.location.href = '/login';
        } else {
          alert(data.message || 'Something went wrong during registration.');
        }

      } catch (err) {
        console.error('Fetch error:', err);
        alert('Error during registration');
      }
    });
  </script>
</body>
</html>
`;
