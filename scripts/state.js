/**
 * Booting point for all state related things.
 */

const $act = {

  updateCurrentRecipeStep: (s, i) => {
    return { ...s, currentRecipeStep: i }
  },


  /* TIMER ------------------------------------------------------------------- */

  timerSet: (s, p) => ({
    ...s,
    timer: p.time,
    timerRunning: true,
    currentRecipeStepText: p.step
  }),

  timerCancel: s => ({ ...s, timer: null, timerRunning: false }),

  timerStopAlarm: s => {
    return ({
      ...s,
      timer: null,
      timerRunning: false,
      timerAlarmPlaying: false,
      timerMode: "countdown",
    })
  },

  timerCountDown: (s, t) => {
    if (s.timer == 0) {
      return {
        ...s,
        timer: null,
        timerRunning: false,
        timerAlarmPlaying: true,
        timerMode: "finished",
      };
    } else {
      return { ...s, timer: s.timer - 1 };
    }
  },

  timerRingFX: (s, p) => {
    var audio = new Audio('./media/sounds/alarm.wav');
    audio.play();
    return {
      ...s,
    }
  },


  /* ROUTING ------------------------------------------------------------------- */

  setRoutePath: (a, s) => {
    let { event, state } = s;
    let hash = location.hash;
    let newRoute = v.getRoute(hash, event) // fetch new route based on url vals
    window.scrollTo(0, 0)

    let newState = ({
      ...state,
      route: hash,
      currentRoute: newRoute.view,
      currentId: newRoute.id,
      currentRecipeStep: 0,
      currentRecipe: db.recipes[newRoute.id] // not optimal?
    })
    return (newState)
  },

};

var initState = {
  currentRecipe: db.recipes["shakshuka"],
  currentId: null,
  currentRecipeStep: 0,
  currentRecipeStepText: "",
  currentRoute: () => h("div", {}, "loading state"),
  timer: null,
  timerAudio: null,
  timerRunning: false,
  timerAlarmPlaying: false,
  timerMode: "countdown",
  route: "/"
};


var subscriptions = (state) => [

  // Routing
  true && v.handleRouter($act.setRoutePath, state),

  // Count down the timer
  state.timerRunning && interval($act.timerCountDown, { delay: 1000 }),

  // Alarm player - Plays alarm when timer is counted down.
  state.timerAlarmPlaying && timeout($act.timerRingFX, {delay: 1000})
]
