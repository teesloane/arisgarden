/**
 * Booting point for all state related things.
 */

const $act = {
  updateCurrentRecipeStep: (s, i) => ({ ...s, currentRecipeStep: i }),

  setTimer: (s, p) => ({
    ...s,
    timer: p.time,
    timerRunning: true,
    currentRecipeStepText: p.step
  }),

  moveTo: (s, p) => {
    return [state, pushHistory({ pathname: p.pathName })];
  },

  setRoute: (state, props) => ({ ...state, route: props.route }),

  setId: (s, p) => ({ ...s, currentId: p }),

  cancelTimer: s => ({ ...s, timer: null, timerRunning: false }),

  countDown: (s, t) => {
    if (s.timer == 0) {
      return { ...s, timer: null, timerRunning: false };
    } else {
      return { ...s, timer: s.timer - 1 };
    }
  }
};

var initState = {
  currentRecipe: db.recipes["shakshuka"],
  currentId: null,
  currentRecipeStep: 0,
  currentRecipeStepText: "",
  timer: null,
  timerRunning: false,
  route: undefined
};


var subscriptions = (state) => [
  state.timerRunning && interval($act.countDown, { delay: 1000 })
]
