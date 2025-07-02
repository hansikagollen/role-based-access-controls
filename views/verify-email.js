document.addEventListener('DOMContentLoaded', async () => {
  const messageEl = document.getElementById('message');
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  if (!token) {
    messageEl.innerText = "❌ Invalid or missing verification token.";
    return;
  }

  try {
    const response = await fetch(`/api/auth/verify-email?token=${token}`);
    const result = await response.text();

    if (response.ok) {
      // Redirect to success page
      window.location.href = 'email-verified.html';
    } else {
      messageEl.innerText = `❌ Verification failed: ${result}`;
    }
  } catch (error) {
    console.error('Verification error:', error);
    messageEl.innerText = "❌ Server error during verification. Please try again later.";
  }
});
