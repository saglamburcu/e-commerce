// create token, send the token to FE and save the JWT token to cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  return res.status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
      httpOnly: true
    })
    .json({
      success: true,
      token,
      user
    })
}

module.exports = sendToken;