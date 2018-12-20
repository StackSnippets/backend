const axios = require("axios");
const HTTP_CODE = require("../../constants/httpStatus");

exports.login = async function(req, res) {
  const reqToken = req.body.token;
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const response = await axios({
    method: "POST",
    headers: {
      accept: "application/json",
    },
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${reqToken}`,
  });
  if (response.data.error) {
    res.json({
      status: HTTP_CODE.HTTP_FAILURE,
      data: {
        error: response.data.error,
        errorDescription: response.data.error_description,
      },
    });
  } else {
    const accessToken = response.data.access_token;
  }
};

exports.logout = function(req, res) {};
