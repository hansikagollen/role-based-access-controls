exports.setCookie = (res, name, value, days) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  res.cookie(name, value, {
    httpOnly: true,
    secure: false, // Set to true only if using HTTPS
    sameSite: 'Lax',
    expires,
  });
};
