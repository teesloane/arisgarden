/**
 * Booting point for all state related things.
 */

const $fx = {
  tempModal: (dispatch, props) => {
    setTimeout(() => {
      dispatch($act.modalClose)
    }, props.delay)
    return
  }
}

const $act = {
  // actions
  setRecipeStep: (s, i) => ({...s, currentRecipeStep: i}),
  modalClose:    (s, _) => ({...s, currentModal: null}),
  modalSet:      (s, p) => {
    if (p.type === "temp") {
      return [({...s, currentModal: () => p.fn(s, p.val)}),
         [$fx.tempModal, {delay: 3000}]]
    }
    return ({...s, currentModal: () => p.fn(s, p.val)})
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
  currentModal: null,
  timer: null,
  timerRunning: false,
  route: "/"
};


var subscriptions = (state) => [
  true && v.handleRouter($act.setRoutePath, state),                        // Routing
  state.timerRunning && interval($act.timerCountDown, { delay: 1000 }), // Timer

]
