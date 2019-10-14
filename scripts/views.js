function View() {
  this.routes = {
    "#/": recipes.viewAll,
    "#/recipes": recipes.viewAll,
    "#/recipes/:id": recipes.viewSingle,
    "404": () => h("div", {}, "Not Found")
  }


  /**
   * Routes are simple, and don't nest beyond two levels.
   * Returns an object with a route fn and potential currentId
   * 1: resource model / 2: single instance
   */
  this.getRoute = (hash, event) => {
    let rs = hash.split("/");              // route structure
    let out = { view: this.routes["404"], id: rs[2] }   // rdata: routes / route metadata

    // Router --------------------------------------------
    
    switch(hash) {
      case "":
        out.view = this.routes["#/"]
        break;
      case "#/":
        out.view = this.routes["#/"]
        break;
      case "#/recipes":
        out.view = this.routes["#/recipes"]
        break
      // handle more complex routes.
      default:
        if (rs[1] === "recipes" && rs[2] !== undefined) {
          out.view = this.routes["#/recipes/:id"]
        }
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


// ------------------------------------------------------------------------------

/**
 * Common ui functions
 */
function UiFn() {

  /**
   * Displays the timer at the bottom
   */
  this.timer = (state) => {
    let timeStr     = state.timer ? util.secToStr(state.timer) : "00:00:00";
    let centerStyle = { style: { alignSelf: "center", display: "flex" } };
    console.log("state is ", state);
    let stepText    = state.currentRecipeStepText;

    let _class = state.timerRunning
        ? "v_TimerFixed"
        : "v_TimerFixed v_TimerFixed_hidden";

    let v_cancelTimer = () => {
      return h("span", {
        class: "v_TimerFixed_closeBtn",
        onClick: [$act.timerCancel]
      }, this.icon("x-circle-wh.svg"));
    }

    return h("div", { class: _class }, [
      h("span", centerStyle, [
        h("span", { class: "pr1" }, this.icon("watch-wh.svg")),
        h("span", { class: "pr4", style: { alignSelf: "center" } }, `${timeStr}`)
      ]),
      h("span", { class: "v_TimerText" }, `${stepText}`),
      v_cancelTimer()
    ]);
  }

  this.icon = (name, attrs) => {
    return h("img", {...attrs, src: `media/icons/${name}` });
  }

  this.giantQuote = (t) => {
    return h("section", { class: "content" },
      h("div", { class: "v_GiantQuote" }, [
        h("div", { class: "v_giantQuoteText" }, t),
        h("div", { class: "v_giantQuoteSym" }, '"')
      ])
    );
  }

  this.whisper = (t) => {
    return h("div", {class: "v_Whisper"}, t)
  }


  this.blurb = (t) => {
    return h("div", {class: "v_Blurb"}, t)
  }

  this.spacer = (size) => {
    return h("div", {style: {height: size + "px", width: "12px"}}, "")
  }

  this.dialogue = (a) => {
    return h("div", {class: "v_Dialogue"},
        a.map((d, i ) => {
          if (i % 2 === 0 ) {
            return h("div", {class: "v_DialogueItem v_DialogueItem-l"}, d)
          }
            return h("div", {class: "v_DialogueItem v_DialogueItem-r"}, d)
        }))}

  this.haiku = (a) => {
    return h("div", {class: "v_Haiku"},
        a.map((d, index) => {
          return h("div", {class: "v_HaikuItem"}, d)
        }))}

  this.largeText = (t) => {
    return h("h1", { class: "v_LargeText" }, t);
  }

  this.heading = (t) => {
    return h("h1", { class: "v_Heading" }, t);
  }

  this.hero = (bgImage, childFn) => {
    let attrs = {
      class: "v_Hero",
      style: { backgroundImage: `url(${bgImage})` }
    };
    return h("section", attrs, childFn());
  }

  this.navbar = () => {
    return h("nav", {class: "v_Navbar"}, [
      h("div", {style: {alignItems: "center", background: "#222"}}, [
        ui.icon("c_home.svg", {width: 48}),
        h("a", {class: "v_Navbar_text", href: "#/"}, "GO\u00DBT/FOOD")
      ]),

      // random / restaurants
      
      // h("div", {}, [
      //   h("div", $txt, [
      //    h("div", {}, "RNDM"),
      //     ui.icon("shuffle.svg", {width: 16})
      //   ]),
      //   h("div", $txt, "Restaurants")
      // ])
    ])
  }
}
