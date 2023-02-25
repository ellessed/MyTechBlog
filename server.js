const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const expressSession = require("express-session");
const connectSessionSequelize = require("connect-session-sequelize")(
  expressSession.Store
);

const helpers = require("./utils/helpers");
const routes = require("./controllers");
const db = require("./config/connection");
const { sequelize } = require("./models/User");

const PORT = process.env.PORT || 3001;

const app = express();

const hbs = exphbs.create({ helpers });
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  rolling: true,
  store: new connectSessionSequelize({ db }),
  cookie: { maxAge: 600000 },
};

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(expressSession(sessionOptions));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

const init = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`\nServer running on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

init();
