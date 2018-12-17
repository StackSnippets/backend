const GitHubStrategy = require("passport-github").Strategy;

const User = require("../app/models/user");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ githubId: profile.id }, function(err, user) {
          return cb(err, user);
        });
      }
    )
  );
};
