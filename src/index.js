require("./styles/main.scss");

const db = require("./scripts/db.js");
const { Elm } = require("./Main");

var app = Elm.Main.init({
  node: document.querySelector("main"),
  flags: {
    recipes: Object.values(db.recipes) // FIXME - convert.js should hand a list, not an object.
  }
});

// Ports

app.ports.playSound.subscribe(function(data) {
  let msg =
    "To use the timer on this site, make sure you keep the page open and your computer on, or it won't work!";

  var hasConfirmedTimer = localStorage.getItem("hasConfirmedTimer")

  if (hasConfirmedTimer === null) {
    let hasConfirmed = window.confirm(msg);
    if (hasConfirmed) {
      localStorage.setItem("hasConfirmedTimer", "true");
    } else {
      localStorage.setItem("hasConfirmedTimer", "false");
    }
  }

  data.forEach(function(t) {
    if (t.time == 1) {
      // FIXME: this can be set to <= 1 when ^^ is fixed.
      var audio = new Audio("/sounds/alarm.wav");
      audio.play();
    }
  });
});
