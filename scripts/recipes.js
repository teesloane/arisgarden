/**
 * Wrapping recipeView
 */



function Recipe() {

  // Logic
  // Null.


  // Full Views ----------------------------------------------------------------

  this.viewSingle = (state) => {
    // TODO handle invalid reciple currentId; make a gotoview func
    // 
    return h("section", {}, [
      ui.hero("media/002.jpg"),
      this._viewMetaData(state),
      ui.giantQuote("...I've made a tornado of dates."),
      h("div", { class: "recipeIngredients-Instructions" }, [
        this._viewIngredients(state),
        this._viewInstructions(state)
      ])
    ]);
  }

  this.viewAll = (state) => {
    return h("section", { class: "content"}, [
      h("ul", { class: "recipeList"}, [
        Object.keys(db.recipes).map(k => {
          let r = db.recipes[k]
          let p = r.meta.properties;
          let link = "#/recipes/" + p.slug;
          // let link =
          return h("li", { class: "" }, [
            h("a", {href: link}, p.name)
          ])
        })
      ])
    ])
  }


  /**
   * SUB VIEWS -----------------------------------------------------------------
   */

  this._viewMetaData = (state) => {
    let liClass = { class: "recipeMetaData" };
    let { original_recipe, day_made, name, is_vegan, rating } = state.currentRecipe.meta.properties;
    let mealType = is_vegan ? "Vegan" : "Vegetarian"

    return h("div", { class: "recipeProperties" }, [
      h("div", { class: "content" }, [
        ui.largeText(name),
        h("ul", { class: "recipeMetaData" }, [
          h("li", liClass,
            h("a", { href: original_recipe, class: "link-light" }, "original recipe")),
          h("li", liClass, mealType),
          h("li", liClass, `Rating: ${rating}`),
          h("li", liClass, `Made: ${day_made}`)
        ])])]);
  }

  this._viewIngredients = (state) => {
    let ingredients = state.currentRecipe.ingredients;
    let renderTableHeadings = () => ingredients.keys.map(e => h("th", {}, e));
    let renderTableCells = () =>
      ingredients.data.map(e => {
        return h("tr", { class: "recipeIngredient" }, [
          h("td", {}, e.Ingredient),
          h("td", {}, e.Quantity),
          h("td", {}, e.Unit)
        ]);
      });

    return h("div", { class: "recipeIngredients" }, [
      h("table", { style: { width: "100%", height: "100%" } }, [
        h("tr", { class: "recipeIngredientHeadRow" }, renderTableHeadings()),
        renderTableCells()
      ])
    ]);
  },


  this._viewInstructions = (state) => {
    let steps = state.currentRecipe.instructions;

    return h("div", { class: "recipeInstructions" }, [
      steps.map((s, index) => {
        let stepClass =
          index == state.currentRecipeStep
            ? "recipeStep recipeStep--active"
            : "recipeStep";
        let renderTimer = () => {
          if (s.timer) {
            let setTimerPayload = { time: time.strToSec(s.timer), step: s.f };
            if (state.timerRunning == false) {
              return h("div", { onClick: [$act.setTimer, setTimerPayload] }, ui.icon("watch.svg"));
            } else if (state.timerRunning) {
              return h("div", {}, "");
            }
          }
        };

        return h("li",
          { class: stepClass, onClick: [$act.updateCurrentRecipeStep, index] },
          [h("div", { class: "recipeStep_Text" }, [
            h("div", { style: { alignContent: "center" } }, s.f),
            renderTimer()
          ])
          ]
        );
      })
    ]);
  }
}
