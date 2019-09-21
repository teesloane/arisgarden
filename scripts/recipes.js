/**
 * Wrapping recipeView
 */
function viewRecipe(state) {
  let r = new Recipe();

  return h("section", {}, [
    v_Hero("media/002.jpg"),
    r.ViewMetaData(state),
    v_GiantQuote("...I've made a tornado of dates."),
    h("div", { class: "recipeIngredients-Instructions" }, [
      r.ViewIngredients(state),
      r.ViewInstructions(state)
    ])
  ]);
}

// Views -----------------------------------------------------------------------

function Recipe() {
  this.viewMetaData = () => {
    let liClass = { class: "recipeMetaData" };

    let {
      original_recipe,
      day_made,
      name,
      is_vegan,
      rating
    } = state.currentRecipe.meta.properties;
    let mealType = () => (is_vegan ? "Vegan" : "Vegetarian");

    return h("div", { class: "recipeProperties" }, [
      h("div", { class: "content" }, [
        v_LargeText(name),
        h("ul", { class: "recipeMetaData" }, [
          h("li", liClass,
            h("a", { href: original_recipe, class: "link-light" }, "original recipe")
          ),
          h("li", liClass, mealType()),
          h("li", liClass, `Rating: ${rating}`),
          h("li", liClass, `Made: ${day_made}`)
        ])
      ])
    ]);
  }

  this.viewIngredients = () => {
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
                return h("div", {}, "poo");
              }
            }
          };

          return h(
            "li", {class: stepClass,
              onClick: [actions.updateCurrentRecipeStep, index]
            },
            [
              h("div", { class: "recipeStep_Text" }, [
                h("div", { style: { alignContent: "center" } }, s.f),
                renderTimer()
              ])
            ]
          );
        })
      ]);
    };
}
