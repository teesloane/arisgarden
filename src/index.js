require("./styles/main.scss");

const db = require("./scripts/db.js");
const { Elm } = require("./Main");

var app = Elm.Main.init({
  node: document.querySelector("main"),
  flags: {
    recipes: db.recipes // [db.recipes["breakfast-quinoa"]]
  }
});

// Ports

app.ports.playSound.subscribe(function(data) {
  var timers = data.slice(1); // FIXME: temporary hack until I remove "pseudo maybe timer"
  timers.forEach(function(t) {
    console.log("timer time is", t.time);
    if (t.time == 1) {
      var audio = new Audio("/sounds/alarm.wav");
      audio.play();
    }
  });

  // FIXME: LEAVING OFF: IF any timers are 0 in the timers, remove them. (in Main.elm update.)
});
