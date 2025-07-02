module.exports = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Admin Dashboard</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #fdf6e3;
      text-align: center;
      padding: 50px;
    }

    .dashboard {
      background-color: #fff3cd;
      border-radius: 10px;
      border: 1px solid #ffeeba;
      padding: 30px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }

    h1 {
      color: #856404;
      margin-bottom: 10px;
    }

    #adminInfo {
      margin: 15px 0 25px;
      font-size: 17px;
      color: #555;
    }

    .controls {
      text-align: left;
      margin: 0 auto 30px;
      max-width: 400px;
    }

    .controls button {
      display: block;
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      font-size: 15px;
      background-color: #ffc107;
      color: #212529;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
    }

    .controls button:hover {
      background-color: #e0a800;
    }

    .logout-btn {
      background-color: #dc3545;
      color: white;
    }

    .logout-btn:hover {
      background-color: #c82333;
    }
  </style>
</head>
<body>
  <div class="dashboard">
    <h1>🔒 Admin Dashboard</h1>
    <p id="adminInfo">Loading your details...</p>

    <div class="controls">
      <button onclick="fetchUsers()">👥 View All Registered Users</button>
      <button onclick="promoteUser()">⬆️ Promote User to Admin</button>
      <button onclick="deleteUser()">❌ Delete a User</button>
      <button onclick="viewLogs()">📄 View System Logs</button>
      <button onclick="emailAllUsers()">📧 Email All Users</button>
    </div>

    <button class="logout-btn" onclick="logout()">Logout</button>
  </div>

  <script>
    const email = localStorage.getItem('authDemoEmail') || sessionStorage.getItem('authDemoEmail');
    const role = localStorage.getItem('authDemoRole') || sessionStorage.getItem('authDemoRole');
    const remember = localStorage.getItem('authDemoRemember');

    if (email && role === 'Admin') {
      document.getElementById('adminInfo').textContent = \`Logged in as \${email} (\${role})\` +
        (remember ? ' - Stay signed in' : '');
    } else {
      window.location.href = '/login';
    }

    function logout() {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.href = '/login';
    }

    function fetchUsers() { alert("Fetching users... (to be implemented)"); }
    function promoteUser() { alert("Promoting user... (to be implemented)"); }
    function deleteUser() { alert("Deleting user... (to be implemented)"); }
    function viewLogs() { alert("Viewing logs... (to be implemented)"); }
    function emailAllUsers() { alert("Emailing users... (to be implemented)"); }
  </script>
</body>
</html>
`;
