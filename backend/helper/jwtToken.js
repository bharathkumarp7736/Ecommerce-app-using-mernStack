export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + Number(process.env.EXPIRE_COOKIE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,        //required for HTTPS (Render)
    sameSite: "none",    //required for cross-origin
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};