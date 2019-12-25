require("./styles/main.scss");

const db = require("./scripts/db.js");
const { Elm } = require("./Main");

var app = Elm.Main.init({
  node: document.querySelector("main"),
  flags: {
    recipes: Object.values(db.recipes) // FIXME
  }
});

// Ports

app.ports.playSound.subscribe(function(data) {
  var timers = data.slice(1); // FIXME: temporary hack until I remove "pseudo maybe timer"
  timers.forEach(function(t) {
    if (t.time == 1) {
      // FIXME: this can be set to <= 1 when ^^ is fixed.
      var audio = new Audio("/sounds/alarm.wav");
      audio.play();
    }
  });
});
