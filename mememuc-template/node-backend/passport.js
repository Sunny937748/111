const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "987679160804-bm6tlcdcl0td071i773dri0qu9ks78rp.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "61ed998a0c8b444dbf59";
GITHUB_CLIENT_SECRET = "4a1ba12e5c1de05bba3a5f2fe4bcefafb7062c15";


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
