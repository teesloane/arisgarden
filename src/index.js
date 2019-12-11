require("./styles/main.scss");

const db = require("./scripts/db.js");
const { Elm } = require("./Main");

Elm.Main.init({
  node: document.querySelector("main"),
  flags: {
    recipes: db.recipes // [db.recipes["breakfast-quinoa"]]
  }
});
