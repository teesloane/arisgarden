/**
 * Wrapping recipeView
 */


// Views -----------------------------------------------------------------------

var Recipe = {
  getProps(r) {
    return r.meta.properties;
  },

  viewSingle(state) {
    return h("section", {}, [
      v_Hero("media/002.jpg"),
      Recipe.viewMetaData(state),
      v_GiantQuote("...I've made a tornado of dates."),
      h("div", { class: "recipeIngredients-Instructions" }, [
        Recipe.viewIngredients(state),
        Recipe.viewInstructions(state)
      ])
    ]);
  },

  viewAll(state) {
    console.log("state in recipe view all is ", state);
    return h("section", { class: "content"}, [
      h("ul", { class: "recipeList"}, [
        Object.keys(db.recipes).map(k => {
          let r = db.recipes[k]
          let p = Recipe.getProps(r)
          return h("li", { class: "" }, [
            h("a", {}, p.name)
          ])
        })
      ])
    ])
  },

  viewMetaData(state) {
    let liClass = { class: "recipeMetaData" };
    let { original_recipe, day_made, name, is_vegan, rating } = state.currentRecipe.meta.properties;
    let mealType = is_vegan ? "Vegan" : "Vegetarian"

    return h("div", { class: "recipeProperties" }, [
      h("div", { class: "content" }, [
        v_LargeText(name),
        h("ul", { class: "recipeMetaData" }, [
          h("li", liClass,
            h("a", { href: original_recipe, class: "link-light" }, "original recipe")),
          h("li", liClass, mealType),
          h("li", liClass, `Rating: ${rating}`),
          h("li", liClass, `Made: ${day_made}`)
        ])])]);
  },

  viewIngredients(state) {
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
      h("h1", { class: "recipeIngredientHeading split-h1" }, "Inredients"),
      h("table", { style: { width: "100%", height: "100%" } }, [
        h("tr", { class: "recipeIngredientHeadRow" }, renderTableHeadings()),
        renderTableCells()
      ])
    ]);
  },


  viewInstructions(state) {
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
              return h("div", { onClick: [$act.setTimer, setTimerPayload] }, v_Icon("watch.svg"));
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
