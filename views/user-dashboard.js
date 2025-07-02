module.exports = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>User Dashboard</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #e3f2fd;
      text-align: center;
      padding: 50px;
    }

    .dashboard {
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      padding: 30px;
      max-width: 600px;
      margin: 0 auto;
    }

    h1 {
      color: #0d6efd;
      margin-bottom: 10px;
    }

    #userInfo {
      margin: 15px 0 25px;
      font-size: 17px;
      color: #444;
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
      background-color: #0d6efd;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
    }

    .controls button:hover {
      background-color: #0a58ca;
    }

    .logout-btn {
      background-color: #dc3545;
    }

    .logout-btn:hover {
      background-color: #c82333;
    }
  </style>
</head>
<body>
  <div class="dashboard">
    <h1>👋 Welcome, User!</h1>
    <p id="userInfo">Loading your details...</p>

    <div class="controls">
      <button onclick="viewProfile()">👤 View Profile</button>
      <button onclick="editProfile()">✏️ Edit Profile</button>
      <button onclick="changePassword()">🔑 Change Password</button>
      <button onclick="submitFeedback()">📝 Submit Feedback</button>
      <button onclick="contactSupport()">📞 Contact Support</button>
    </div>

    <button class="logout-btn" onclick="logout()">Logout</button>
  </div>

  <script>
    const email = localStorage.getItem('authDemoEmail') || sessionStorage.getItem('authDemoEmail');
    const role = localStorage.getItem('authDemoRole') || sessionStorage.getItem('authDemoRole');
    const remember = localStorage.getItem('authDemoRemember');

    if (email && role === 'User') {
      document.getElementById('userInfo').textContent = \`Logged in as \${email} (\${role})\` + 
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

    function viewProfile() { alert("View Profile (to be implemented)"); }
    function editProfile() { alert("Edit Profile (to be implemented)"); }
    function changePassword() { alert("Change Password (to be implemented)"); }
    function submitFeedback() { alert("Submit Feedback (to be implemented)"); }
    function contactSupport() { alert("Contact Support (to be implemented)"); }
  </script>
</body>
</html>
`;
