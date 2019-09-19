/**
 * Wrapping recipeView
 */
function recipeView(state) {
  return h("section", {}, [
    v_Hero("media/002.jpg"),
    recipeViewMetaData(state),
    v_GiantQuote("...I've made a tornado of dates."),
    h("div", { class: "recipeIngredients-Instructions" }, [
      recipeViewIngredients(state),
      recipeViewInstructions(state)
    ])
  ]);
}

// Views -----------------------------------------------------------------------

function recipeViewMetaData(state) {
  let liClass = { class: "recipeMetaData" };

  let {
    original_recipe,
    day_made,
    name,
    is_vegan,
    is_vegetarian,
    rating
  } = state.currentRecipe.meta.properties;

  let mealType = () => {
    if (is_vegan) {
      return "Vegan";
    } else if (is_vegetarian) {
      return "Vegetarian";
    } else {
      return "Contains Meat";
    }
  };

  return h("div", { class: "recipeProperties" }, [
    h("div", { class: "content" }, [
      v_LargeText(name),
      h("ul", { class: "recipeMetaData" }, [
        h(
          "li",
          liClass,
          h(
            "a",
            { href: original_recipe, class: "link-light" },
            "original recipe"
          )
        ),
        h("li", liClass, mealType()),
        h("li", liClass, `Rating: ${rating}/5`),
        h("li", liClass, `Made: ${day_made}`)
      ])
    ])
  ]);
}

function recipeViewIngredients(state) {
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
}

function recipeViewInstructions(state) {
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
            return h(
              "div",
              { onClick: [actions.setTimer, setTimerPayload] },
              v_Icon("watch.svg")
            );
          } else if (state.timerRunning) {
            return h("div", {}, "");
          }
        }
      };

      return h(
        "li",
        { class: stepClass, onClick: [actions.updateCurrentRecipeStep, index] },
        [
          h("div", { class: "recipeStep_Text" }, [
            h("div", { style: { alignContent: "center" } }, s.f),
            renderTimer()
          ])
        ]
      );
    })
  ]);
}
