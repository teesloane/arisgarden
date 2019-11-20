function View() {
  this.routes = {
    "#/": recipes.viewAll,
    "#/recipes": recipes.viewAll,
    "#/recipes/:id": recipes.viewSingle,
    "#/about": ui.about,
    "404": ui.fourOhFour
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
      case "#/about":
        out.view = this.routes["#/about"]
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
    let _class = state.timerRunning
        ? "v_TimerFixed"
        : "v_TimerFixed v_TimerFixed_hidden";


    let v_cancelTimer = (timer) => {
      return h("span", {
        class: "v_TimerFixed_closeBtn",
        onClick: [$act.timerCancel, timer]
      }, this.icon("x-circle.svg"));
    }

    return h("div", { class: _class },
      state.timers.map((t, index) => {
        let timeStr = t ? util.secToStr(t.time) : "00:00:00";

        return h("div", {class: "v_TimerBlock", style: {backgroundColor: t.colour}}, [
          h("span", {class: "v_TimerText"}, timeStr),
         v_cancelTimer(t)
        ])
      })
    );
  }

  this.icon = (name, attrs) => {
    return h("img", {...attrs, src: `media/icons/${name}` });
  }

  this.colourBand = (size, mul) => {
    return ["#cde4f7", "#ffd397", "#e2e0ed", "#f4bac0", "#c7d6c7" ].map((c, i) => {
      let g = mul ? (size * i) * mul + "px" : size + "px"
      return h("hr", {style: {margin: "8px auto", maxWidth: "100px", height: g, backgroundColor: c}})
    })
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


  this.hero = (state, heroImgPath, childFn) => {
    if (state.heroImg == null) {
      let attrs  = {class: "v_Hero v_Hero-loading",};
      let img    = new Image();
      img.onload = () => {dispatch($act.heroSetImg, img)}
      img.src    = heroImgPath;

      return h("section", attrs, childFn());
    } else {
      let attrs = {
        class: "v_Hero v_Hero-loaded",
        style: { backgroundImage: `url(${state.heroImg.src})`}
      };
      return h("section", attrs, childFn());
    }
  }


  this.modal = (state) => {
    if (state.currentModal) {
      return h("section", {class: "v_Modal", onClick: [$act.modalClose]}, [
        h("div", {
          class: "v_Modal--close_btn",
          onClick: [$act.modalClose]
        }, "X"),
        state.currentModal()
        ]
      )
    } else {
      return h("section", {class: "v_Modal--empty"}, "")
    }
  }

  /**
   * @param props: ingredient-id for fetching quantity from.
   * Shows how much of an ingredient to use;
   * fetches value from current recipe ingredients table.
   */
  this.modalShowIngredient = (state, props) => {
    let ingredients = state.currentRecipe.ingredients.data
    let f           = ingredients.filter(i => i.Id === props)[0]
    let rdata;
    try {rdata       = f.Quantity + " " + f.Unit}
    catch {alert("Value missing!")}

    return h("section", {class: "v_Modal--ingredient"}, [
      h("div", {class: "v_Modal--ingredientHeading"}, f.Ingredient),
      h("div", {class: "v_Modal--ingredientQuant"}, rdata),
    ])
  }

  this.navbar = () => {
    return h("nav", {class: "v_Navbar"}, [
      h("div", {class: "v_Navbar_icon-text"}, [
        ui.icon("c_home.svg", {width: 48}),
        h("a", {class: "v_Navbar_text", style: {paddingLeft: "4px"}, href: "#/"}, "ARI'S GARDEN"),
      ]),
      h("span", {}, [
        h("a", {class: "v_Navbar_text", href: "#/about"}, "ABOUT"),
        // h("a", {class: "v_Navbar_text", href: "#/"}, "SUPPORT!"),
      ])
    ])}

  this.loadingState = () => {
    return h("main", {class: "v_LoadingState"}, [
      h("div", {class: "spinner"}, "")
    ])
  }


  this.getImg = (img) => `media/imgs/${img}`;

  this.fourOhFour = (state) => {

    return h("div", {}, [
      ui.hero(state, this.getImg("404.png"), () => h("span", {}, "")),
      h("div", {class: "v_fourOhFour"}, [
        h("h1", {style: {fontSize: "14px"}}, "Page not found!")
      ])
    ])
  }

  /**
   * Page: About
   */
  this.about = (state) => {
    let $li = {style: {padding: "8px 0"}};
    return h("main", {}, [
      ui.hero(state, "media/imgs/_aris_about.png", () => h("span", {}, "") ),
      h("div", {class: "content", style: {padding: "48px"}}, [
        h("h2", {class: "v_Heading-grey"}, "About Ari"),
        h("p", {}, "Ari is a racoon. He used to eat a lot of trash but over time he decided it was time to eat less trash and eat more healthy things. Nowadays, Ari is working to hard to get better at cooking, mostly with vegetables and no longer with meat. Ari eats vegetables that are orange, light yellow, green, lighter green, darker green, red, light red, beet red, and other colours too. He has yet to find a blue vegetable."),
        h("h2", {class: "v_Heading-grey"}, "About Ari's Garden"),
        h("p", {}, "Ari’s Garden is an online cookbook that Ari cultivates whenever he gets a chance to try a new meal—here he writes out the steps and ingredients for a meal, adds photos, and other useful things to make the process of preparing a meal easier. Here are some things you can do on Ari’s Garden:"),
        h("ul", {}, [
          h("li", $li, "Pick a recipe and quickly see what’s in it and what the steps to make it are."),
          h("li", $li, [
            h("div", {style: {display: "flex"}}, [
              h("span", {}, "Set a timer for a particular step in a recipe—look for the watch icon:"),
              h("span", {style: {paddingLeft: "4px"}}, this.icon("watch.svg")),
            ])
          ]),
          h("li", $li, "Set the current step you are on so you don’t forget what you are doing (this happens to Ari sometimes)."),
          h("li", $li, "And some other stuff."),
        ]),
        h("h4", {}, "There are a few pests that Ari does not like having in his garden:"),
        h("ul", {}, [
          h("li", $li, "No advertisements!"),
          h("li", $li, "No tracking you or taking your personal data!"),
        ]),
        h("p", {}, "The recipes on Ari’s Garden come from all over the place. If you see your recipe on Ari’s Garden and are not ok with that, please let us know and Ari will give it the boot!"),
        h("p", {}, [
          h("span", {}, "Ari’s Garden is an open source project. That means if you see something not working or you have suggestion to make, you can do that by going over to the "),
          h("a", {class: "ext-link", href: "https://github.com/theiceshelf/arisgarden"}, " Github Project"),
          h("span", {}, " and filing an issue or making a PR."),
        ])
      ])
    ])
  }

}
