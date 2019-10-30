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
    let timers = s.timers.concat([p])
    let rdata = {
      ...s,
      timer: p.time,
      timerRunning: true,
      timers,
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

  timerCancel: (s, p) => {
    let newTimers = s.timers.filter(t => {return t.step[0].val !== p.step[0].val})
    let timerRunning = newTimers.length === 0 ? false : true
    return ({...s, timers: newTimers, timerRunning})
  },

  /**
   * Loop through all timers and count down each one.
   * If any of them are at 0, ring the bell and remove it from the timer queue.
   */
  timerCountDown: (s, t) => {
    let newTimers = []

    s.timers.forEach(t => {
      if (t.time == 0) {
        var audio = new Audio('./media/sounds/alarm.wav');
        audio.play();
      } else {
        t.time -= 1
        newTimers.push(t)
      }
    })
    return {...s,
       timer: s.timer - 1,
       timers: newTimers,
       timerRunning: newTimers.length === 0 ? false : true
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
  timers: [],
  timerRunning: false,
  route: "/"
};


var subscriptions = (state) => [
  true && v.handleRouter($act.setRoutePath, state),                        // Routing
  state.timerRunning && interval($act.timerCountDown, { delay: 1000 }), // Timer

]
