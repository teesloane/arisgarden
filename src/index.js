require("./styles/main.scss");

const db = require("./scripts/db.json");
const { Elm } = require("./Main");

window.recipes = db

var app = Elm.Main.init({
  node: document.querySelector("main"),
  flags: {
    recipes: Object.values(db.recipes)
  }
});

// Ports

app.ports.playSound.subscribe(function(data) {
  let msg =
    "To use the timer on this site, make sure you keep the page open and your computer on, or it won't work!";

  var hasConfirmedTimer = localStorage.getItem("hasConfirmedTimer");

  if (hasConfirmedTimer === null) {
    let hasConfirmed = window.confirm(msg);
    if (hasConfirmed) {
      localStorage.setItem("hasConfirmedTimer", "true");
    } else {
      localStorage.setItem("hasConfirmedTimer", "false");
    }
  }

  data.forEach(function(t) {
    if (t.time == 0) {
      var audio = new Audio("/sounds/alarm.wav");
      audio.play();
    }
  });
});
