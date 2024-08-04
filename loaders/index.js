const expressLoader = require("./express");
const passportLoader = require("./passport");
const routeLoader = require("../routes");
module.exports = async (app) => {
  const expressApp = await expressLoader(app);
  const passport = await passportLoader(app);
  const routeLoader = await (app, passport);

  // Errors
  app.use((err, req, res, next) => {
    const { message, status } = err;

    return res.status(status).send({ message });
  });
};
