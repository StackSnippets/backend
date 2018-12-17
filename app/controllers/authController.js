const axios = require("axios");

module.login = async function(req, res) {
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
  const accessToken = response.data.accessToken;
  res.json({
    message: "success",
    data: {
      accessToken,
    },
  });
};

module.logout = function(req, res) {};
