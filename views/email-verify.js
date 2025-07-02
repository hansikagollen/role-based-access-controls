document.addEventListener('DOMContentLoaded', () => {
  const message = document.getElementById('status');

  // Show countdown and redirect to login page
  let secondsLeft = 5;
  message.innerText = `Redirecting to login in ${secondsLeft} seconds...`;

  const countdown = setInterval(() => {
    secondsLeft--;
    message.innerText = `Redirecting to login in ${secondsLeft} seconds...`;

    if (secondsLeft <= 0) {
      clearInterval(countdown);
      window.location.href = 'index.html';
    }
  }, 1000);
});
