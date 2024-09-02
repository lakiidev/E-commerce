const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await AuthServiceInstance.login({
            email,
            password,
          });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  return passport;
};
