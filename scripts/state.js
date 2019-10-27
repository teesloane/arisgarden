/**
 * Booting point for all state related things.
 */

const $fx = {
  // Example effect (no longer used)
  // tempModal: (dispatch, props) => {
  //   setTimeout(() => {
  //     dispatch($act.modalClose)
  //   }, props.delay)
  //   return
  // }
}

const $act = {
  // actions
  setRecipeStep: (s, i) => ({...s, currentRecipeStep: i}),
  modalClose:    (s, _) => ({...s, currentModal: null}),
  modalSet:      (s, p) => {return ({...s, currentModal: () => p.fn(s, p.val)})},
  heroSetImg: (s, p) => {
    return ({...s, heroImg: p})
  },


  /* TIMER ------------------------------------------------------------------- */

  timerSet: (s, p) => {
    let message = "Hi! In order to use the timer on this site, you must ensure that your computer does not go to sleep or you do not leave this page (otherwise the timer will not work!"
    let rdata = {
      ...s,
      timer: p.time,
      timerRunning: true,
      currentRecipeStepText: p.step.map(c => c.val).join(" ")
    }

    if(!localStorage.getItem("hasConfirmedTimer")) {
      let hasConfirmed = window.confirm(message);
      if (hasConfirmed) {
        localStorage.setItem("hasConfirmedTimer", "true")
        return rdata
      } else {
        return {...s,}
      }
    } else {
      return rdata
    }
  } ,

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
      currentRecipe: db.recipes[newRoute.id], // not optimal?
  heroImg: null,
    })
    return (newState)
  },

};

var initState = {
  currentRecipe: db.recipes["shakshuka"],
  currentRecipeStep: 0,
  currentRecipeStepText: "",
  currentRoute: () => ui.loadingState(),
  currentModal: null,
  heroImg: null,
  timer: null,
  timerRunning: false,
  route: "/"
};


var subscriptions = (state) => [
  true && v.handleRouter($act.setRoutePath, state),                        // Routing
  state.timerRunning && interval($act.timerCountDown, { delay: 1000 }), // Timer

]
