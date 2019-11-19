function Recipe() {

  // Getters -------------------------------------------------------------------

  this.getProps = (state) => state.currentRecipe.meta.properties
  this.getSlug = (state) => this.getProps(state).slug
  this.getImg = (img) => `media/imgs/${img}`;
  this.getPhotos = (state) => {
    let imgs = this.getProps(state).imgs
    if (imgs == "false") {
      return false
    } else {
      return imgs.split(",")
    }
  }


  // Full Views ----------------------------------------------------------------

  this.viewSingle = (state) => {
    try {
      var heroImg = this.getImg(this.getSlug(state) + "-hero.jpg")
    } catch {
      return ui.fourOhFour()
    }

    // TODO handle invalid reciple currentId; make a gotoview func

    return h("section", {}, [
      ui.hero(heroImg, () => this._viewMetaData(state)),
      this._viewContent(state),
      this._viewPhotos(state),
      h("div", {style: {marginTop: "8px"}}, ui.colourBand(4)),
      h("div", { class: "rs_ingr-inst" }, [
        h("div", {class: "rs_spacer"}, ui.largeText("INGREDIENTS / INSTRUCTIONS"),),
        h("div", { class: "rs_ingr-instr-content" }, [
          this._viewIngredients(state),
          this._viewInstructions(state),
        ])])])
  }

  this.viewAll = (state) => {
    let rndRecipe;
    let sortedRecipes = Object.keys(db.recipes).reduce((acc, curr) => {
      let recipe = db.recipes[curr]
      let belongs_to = recipe.meta.properties.belongs_to
      if (!(belongs_to in acc)) { acc[belongs_to] = [] }
      acc[belongs_to] = acc[belongs_to].concat([recipe]);
      return acc
    }, {})


    // Get the hero for the view All. Make it static if the timer is running.
    // FIXME -- should be randon only on page load.
    if (state.timerRunning || state.recipeSearch !== "") {
      rndRecipe = db.recipes[Object.keys(db.recipes)[3]]
    } else {
      rndRecipe = util.rndObjProp(db.recipes);
    }

    let rndHero = this.getImg(rndRecipe.meta.properties.slug + "-hero.jpg")

    return h("section", { class: "rL" }, [
      ui.hero(rndHero, () => this._viewAllHero(rndRecipe)),
      h("div", { class: "rl_columns" }, [
        h("input", {type: "text", onInput: $act.setFilter, value: state.recipeSearch }),
        Object.keys(sortedRecipes).map(group => {
          return h("div", {class: "rl_list"}, [
            h("h2", {class: "v_Heading-grey"}, group + "-ish"),
            sortedRecipes[group].map(k => {
            let p = k.meta.properties;
            let link = "#/recipes/" + p.slug;
            return h("li", { class: "" }, [
              h("a", { class: "rl_link", href: link }, p.name)
            ])
          })
          ])})])])
  }

  // SUB VIEWS -----------------------------------------------------------------


  /**
   * Renders inside the view All recipes hero header
   */
  this._viewAllHero = (recipe) => {
    let liAttr = { class: "rl_hero_li" }
    let p = recipe.meta.properties

    return h("div", {}, [
      h("div", { class: "rl_hero_data" }, [
        h("img", {src: "media/imgs/_aris_garden.png"})
      ])
    ])
  }

  /**
   * Renders inside the recipeSingle view hero head.er
   */
  this._viewMetaData = (state) => {
    let liClass = { class: "rs_metadatum" };
    let { original_recipe, day_made, name, is_vegan, rating, serves, time } = state.currentRecipe.meta.properties;
    let mealType = is_vegan === "true" ? "Vegan" : "Vegetarian"

    return h("div", { class: "rs_props" }, [
    h("h1", { class: "v_LargeText rs_recipe-name" }, name),

      h("ul", { class: "rs_metadata" }, [
        h("li", liClass,
          h("a", { href: original_recipe, target: "_blank", class: "ext-link-light" }, "Original Recipe")),
        h("li", liClass, mealType),
        h("li", liClass, `Serves: ${serves}`),
        h("li", liClass, `Time: ${time}`),
        h("li", liClass, `Rating: ${rating}`),
        h("li", liClass, day_made)
      ])
    ]);
  }

  this._viewContent = (state) => {
    try {
      let content = state.currentRecipe.content
      let contentType = content.props.type
      let val = content.value

      switch (contentType) {
        case "big-quote":
          return ui.giantQuote(val[0])
        case "whisper":
          return ui.whisper(val[0])
        case "dialogue":
          return ui.dialogue(val)
        case "haiku":
          return ui.haiku(val)
        case "blurb":
          return ui.blurb(val)
        default:
          return ui.spacer(100)
      }
    }

    catch {
      return ui.spacer(128)
    }
  }

  /**
   * Looks for photos of the recipe to display
   * If no photos, return a hidden span.
   */
  this._viewPhotos = (state) => {
    if (this.getPhotos(state) == false) {
      return h("span", {}, "")
    } else {
      return h("section", { class: "rs_photos" }, [
        this.getPhotos(state).map(i => {
          let img = `media/imgs/${this.getSlug(state)}-${i}`;
          let style = { class: "rs_photo", style: { backgroundImage: `url(${img})` } }
          return h("div", style, "")
        })])
    }
  }

  /**
   * Creates a table to view the recipes ingredients
   * Ingredients are spread in an object that has the table keys and the table value separately
   * TODO: remove the meta columns!
   */
  this._viewIngredients = (state) => {
    let ingredients = state.currentRecipe.ingredients;
    let $tr = { style: { padding: "16px 8px" } };
    let $td = { style: { height: "20px" } };
    let $btn = (i) => ({class: "rs_ingr-quant-button", width: 16, onClick: [$act.changeQuant, i]})

    let render_quantity_th = () => {
      return h("th", {style: {display: "flex", padding: "16px 8px", marginLeft: "-48px"}}, [
        ui.icon("minus.svg", $btn(-1)),
        h("span", {style: {padding: "0 8px"}}, [
          h("span", {}, "Quantity"),
          h("sup", {class: "rs_ingr-quant-sup"}, state.recipeQuantMult + "x")
        ]),
        ui.icon("plus.svg", $btn(1)),
      ])

    }

    return h("div", { class: "rs_ingr" }, [
      h("table", { class: "rs_ingr-Table", style: { width: "100%" } }, [
        h("thead", { class: "rs_ingr-headrow" },
          h("th", $tr, "Ingredient"),
          render_quantity_th(),
          h("th", $tr, "Unit")
        ),
        h('tbody', { class: "rs_ingr-TableBody" }, [
          ingredients.data.map(e => {
            return h("tr", { class: "rs_ingr-tablerow" }, [
              h("td", $td, e.Ingredient),
              // h("td", $td, e.Quantity),
              this._renderQuantity(e.Quantity, state.recipeQuantMult),
              h("td", $td, e.Unit)
            ])
          })])])])
  }

  /**
   * If a user doubles &c., multiply quantity for each ingredient.
   */
  this._renderQuantity = (quant, mult) => {
    if(quant[1] === "/") {
      let numerator = quant[0];
      let numeratorMultd = numerator * mult;
      let denominator = quant[2];

      if (numeratorMultd >= denominator) {
        let factored = numeratorMultd / denominator
        let rounded = Math.round(factored * 10) / 10
        return h("td", {}, rounded)
      }
      return h("td", {}, (quant[0] * mult) + "/" + quant[2])
    }
    return h("td", {}, quant * mult || "")
  }

  this._viewInstructions = (state) => {
    let steps = state.currentRecipe.instructions;

    return h("div", { class: "rs_inst" }, [
      steps.map((s, index) => {
        let stepClass =
          index == state.currentRecipeStep
            ? "rs_step rs_step--active"
            : "rs_step";

        // Timer ---
        let renderTimer = () => {
          let colours = ["#cde4f7", "#ffd397", "#e2e0ed", "#f4bac0", "#c7d6c7" ]
          let newColour = state.timers.length === 0 ?
            colours[0] :
            colours.filter(c => state.timers.every(t => t.colour !== c))[0];

          if (s.timer) {
            let setTimerPayload = { time: util.strToSec(s.timer), step: s.f, colour: newColour };
            return h("div", { class: "rs_stepTimer", onClick: [$act.timerSet, setTimerPayload] }, ui.icon("watch.svg"));
          }
        };

        // Rendered ingredient step
        // activates a modal with the ingredients quantity in it.
        let renderStep = (f) => {
          return f.map(c => {
            let rejoinedVal = c.val === "," ? "" : " "

            if (typeof (c.attr) === "undefined") {
              return h("span", {}, c.val.trim() + rejoinedVal)
            }

            return h("span", { class: "rs_stepSingleIngredient", onClick: [$act.modalSet, { fn: ui.modalShowIngredient, val: c.attr, state }] }, c.val.trim() + rejoinedVal)
          })
        }


        // Template ---
        return h("li",
          { class: stepClass, onClick: [$act.setRecipeStep, index] }, [
          h("div", { class: "rs_step-wrap" }, [
            h("div",
              { class: "rs_step-textcontent", style: { alignContent: "center" } },
              [
                h("span", {}, index + 1 + ". "),
                renderStep(s.f)
              ]
            ),
          ]),
          renderTimer()
        ])
      })])
  } // I miss lisp
}
