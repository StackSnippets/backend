const axios = require("axios");

exports.verifyResponseToken = function(token) {
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  return axios({
    method: "POST",
    headers: {
      accept: "application/json",
    },
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${token}`,
  });
};

exports.getEmailAddress = function(token) {
  const url = "https://api.github.com";
  return axios({
    url: `${url}/user/emails`,
    headers: {
      Authorization: `token ${token}`,
    },
  });
};

exports.getProfile = function(token) {
  const url = "https://api.github.com";
  return axios({
    url: `${url}/user`,
    headers: {
      Authorization: `token ${token}`,
    },
  });
};
