const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const helpers = require("./utils/helpers");

const routes = require("./controllers");

const PORT = process.env.PORT || 3001;

const app = express();

const hbs = exphbs.create({}); // add helpers here if needed

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

const init = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`\nServer running on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

init();
