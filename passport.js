const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");


const GOOGLE_CLIENT_ID ="1060635552815-86evbfmps5f88kuht3hb33u5b9hbd8la.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

FACEBOOK_APP_ID = "325362769189348";
FACEBOOK_APP_SECRET = "1abc20c577cc2421c3d4526760123205";


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
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  // Magically resolved itself after giving it half a day.
  

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });