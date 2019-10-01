function View() {
  this.routes = {
    "#": recipes.viewAll,
    "#/recipes": recipes.viewAll,
    "#/recipes/:id": recipes.viewSingle,
    "404": () => h("div", {}, "not found")
  }


  /**
   * Routes are simple, and don't nest beyond two levels.
   * Returns an object with a route fn and potential currentId
   * 1: resource model / 2: single instance
   */
  this.getRoute = (hash, state) => {
    // TODO: handle invalid route at the gate
    let rs = hash.split("/");
    let out = { view: "404", id: rs[2] }

    // FIXME: Clean this up.
    if (rs[1] === "recipes" && rs[2] !== undefined) {
      out.view = this.routes["#/recipes/:id"]
    } else if (rs[1] === "recipes") {
      out.view = this.routes["#/recipes"]
    } else {
      return out
    }
    return out
  }


  /** Subscription middleware for handling routing with state */
  this.handleRouter = (action, state) => {
    // the main functions purpose
    const subFn = (dispatch, options) => {
      addEventListener("hashchange", (e) => { dispatch(action, { event: e, state }) })
      addEventListener("load", (e) => { dispatch(action, { event: e, state }) })
      return () => null // run on removal of subscription?
    }
    return [subFn, { action }]
  }
}





/**
 * Common ui functions
 */
function UiFn() {

  this.timer = (state) => {
    let timeStr     = state.timer ? time.secToStr(state.timer) : "00:00:00";
    let centerStyle = { style: { alignSelf: "center", display: "flex" } };
    let stepText    = state.currentRecipeStepText;

    let _class = state.timerRunning
        ? "v_TimerFixed"
        : "v_TimerFixed v_TimerFixed_hidden";

    let v_CloseBtn = () =>
        h(
          "span",
          { class: "v_TimerFixed_closeBtn", onClick: [$act.cancelTimer] },
          this.icon("x-circle-wh.svg")
        );

    return h("div", { class: _class }, [
      h("span", centerStyle, [
        h("span", { class: "pr1" }, this.icon("watch-wh.svg")),
        h("span", { class: "pr4", style: { alignSelf: "center" } }, `${timeStr}`)
      ]),
      h("span", { class: "v_TimerText" }, `${stepText}`),
      v_CloseBtn()
    ]);
  }


  this.icon = (name) => {
    return h("img", { src: `media/icons/${name}` });
  }


  this.giantQuote = (t) => {
    return h(
      "section",
      { class: "content" },
      h("div", { class: "v_GiantQuote" }, [
        h("div", { class: "v_giantQuoteText" }, t),
        h("div", { class: "v_giantQuoteSym" }, '"')
      ])
    );
  }


  this.largeText = (t) => {
    return h("h1", { class: "v_LargeText" }, t);
  }


  this.hero = (bgImage, childFn) => {
    let attrs = {
      class: "v_Hero",
      style: { backgroundImage: `url(${bgImage})` }
    };
    return h("section", attrs, childFn());
  }

}
