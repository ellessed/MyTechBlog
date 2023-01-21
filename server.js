const express = require("express");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3001;

const app = express();

const hbs = exphbs.create({}); // add helpers here if needed

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// here is where I'd put the routes if I had any
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Welcome" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

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
