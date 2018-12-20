const HTTP_CODE = require("../../constants/httpStatus");
const GithubAuth = require("../utils/GithubAuth");
const AuthToken = require("../utils/AuthToken");

exports.login = async function(req, res) {
  const reqToken = req.body.token;
  const response = await GithubAuth.verifyResponseToken(reqToken);
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
    try {
      const profileResponse = await GithubAuth.getProfile(accessToken);
      const data = profileResponse.data;
      const profile = {
        name: data.name,
        avatar: data.avatar_url,
        url: data.url,
        username: data.login,
        email: data.email,
      };
      const jsonWebToken = AuthToken.generate(profile);
      res.json({
        status: HTTP_CODE.HTTP_SUCCESS,
        data: {
          token: jsonWebToken,
          profile: profile,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
};

exports.logout = function(req, res) {};
