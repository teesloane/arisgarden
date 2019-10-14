/**
 * Booting point for all state related things.
 */

const $act = {

  updateCurrentRecipeStep: (s, i) => {
    return { ...s, currentRecipeStep: i }
  },


  /* TIMER ------------------------------------------------------------------- */

  timerSet: (s, p) => {
    return {
    ...s,
    timer: p.time,
    timerRunning: true,
    currentRecipeStepText: p.step.map(c => c.val).join(" ")
  }},

  timerCancel: s => ({ ...s, timer: null, timerRunning: false }),

  timerCountDown: (s, t) => {
    if (s.timer == 0) {
      var audio = new Audio('./media/sounds/alarm.wav');
      audio.play();

      return {
        ...s,
        timer: null,
        timerRunning: false,
      };
    } else {
      return { ...s, timer: s.timer - 1 };
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
      currentRecipeStep: 0,
      currentRecipe: db.recipes[newRoute.id] // not optimal?
    })
    return (newState)
  },

};

var initState = {
  currentRecipe: db.recipes["shakshuka"],
  currentRecipeStep: 0,
  currentRecipeStepText: "",
  currentRoute: () => h("div", {}, "loading state"),
  timer: null,
  timerRunning: false,
  route: "/"
};


var subscriptions = (state) => [

  // Routing
  true && v.handleRouter($act.setRoutePath, state),

  // Count down the timer
  state.timerRunning && interval($act.timerCountDown, { delay: 1000 }),

]
