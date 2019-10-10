function Recipe() {

  // Getters -------------------------------------------------------------------

  this.getProps = (state) => state.currentRecipe.meta.properties
  this.getSlug = (state) => this.getProps(state).slug
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
    let heroImg = `media/imgs/${this.getSlug(state)}-hero.jpg`;
    // TODO handle invalid reciple currentId; make a gotoview func
    return h("section", {}, [
      ui.hero(heroImg, () => this._viewMetaData(state)),
      // ui.giantQuote("...I've made a tornado of dates."),
      this._viewContent(state),
      this._viewPhotos(state),
      h("div", { class: "recipeIngredients-Instructions" }, [
        ui.largeText("INGREDIENTS / INSTRUCTIONS"),
        h("div", { class: "content-w", style: { flexDirection: "row", margin: "32px 0 32px" } }, [
          this._viewIngredients(state),
          this._viewInstructions(state),
        ])])])}

  this.viewAll = (state) => {
    let rndRecipe = util.randomProperty(db.recipes);
    let rndHero = `media/imgs/${rndRecipe.meta.properties.slug}-hero.jpg`;

    return h("section", { class: "rL" }, [
      ui.hero(rndHero, () => this._viewAllHero(rndRecipe)),
      h("div", { class: "content" }, [

        // Recipe List
        h("ul", { class: "rL_list" }, [
          Object.keys(db.recipes).map(k => {
            let r = db.recipes[k]
            let p = r.meta.properties;
            let link = "#/recipes/" + p.slug;
            return h("li", { class: "" }, [
              h("a", { class: "rL_link", href: link }, p.name)
            ])})])])])}

  // SUB VIEWS -----------------------------------------------------------------


  /**
   * Renders inside the view All recipes hero header
   */
  this._viewAllHero = (recipe) => {
    let liAttr = { class: "rL_hero_li" }
    let p = recipe.meta.properties

    return h("div", {}, [
      ui.navbar(),

      h("ul", { class: "rL_hero_data" }, [
        h("li", liAttr, p.name),
        h("li", liAttr, p.day_made),
      ])])}

  /**
   * Renders inside the recipeSingle view hero head.er
   */
  this._viewMetaData = (state) => {
    let liClass = { class: "recipeMetaData" };
    let { original_recipe, day_made, name, is_vegan, rating } = state.currentRecipe.meta.properties;
    let mealType = is_vegan ? "Vegan" : "Vegetarian"

    return h("div", { class: "recipeProperties" }, [
      ui.navbar(),
      h("div", { class: "content-w" }, [
        ui.largeText(name),
        h("ul", { class: "recipeMetaData" }, [
          h("li", liClass,
            h("a", { href: original_recipe, target: "_blank", class: "link-light" }, "Original Recipe")),
          h("li", liClass, mealType),
          h("li", liClass, `Rating: ${rating}`),
          h("li", liClass, day_made)
        ])])]);
  }

  this._viewContent = (state) => {
    try{
      let content = state.currentRecipe.content
      let contentType = content.props.type
      let val = content.value

      switch(contentType) {
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
      return h("section", { class: "recipePhotos" }, [
        this.getPhotos(state).map(i => {
          let img = `media/imgs/${this.getSlug(state)}-${i}`;
          let style = { class: "recipePhoto", style: { backgroundImage: `url(${img})` } }
          return h("div", style, "")
        })])}}

  this._viewIngredients = (state) => {
    let ingredients = state.currentRecipe.ingredients;
    let $tr = { style: { padding: "16px 8px" } };


    return h("div", {
      style: { marginRight: "16px" },
      class: "recipeIngredients-Instructions-bg"
    }, [
      h("table", { class: "recipeIngredientTable", style: { width: "100%" } }, [
        h("thead", { class: "recipeIngredientHeadRow" },
          h("tr", {}, [ingredients.keys.map(e => h("th", $tr, e))])
        ),
        h('tbody', { class: "recipeIngredientTableBody" }, [
          ingredients.data.map(e => {
            return h("tr", { class: "recipeIngredient" }, [
              h("td", {}, e.Ingredient),
              h("td", {}, e.Quantity),
              h("td", {}, e.Unit)
            ])
          })])])])}

    this._viewInstructions = (state) => {
      let steps = state.currentRecipe.instructions;
      let $wrapper = { style: { marginLeft: "16px" } }

      return h("div", {...$wrapper, class: "recipeIngredients-Instructions-bg" }, [
        steps.map((s, index) => {
          let stepClass =
            index == state.currentRecipeStep
              ? "recipeStep recipeStep--active"
              : "recipeStep";
          let renderTimer = () => {
            if (s.timer) {
              let setTimerPayload = { time: util.strToSec(s.timer), step: s.f };
              if (state.timerRunning == false) {
                return h("div", { class: "recipeStepTimer", onClick: [$act.timerSet, setTimerPayload] }, ui.icon("watch.svg"));
              } else if (state.timerRunning) {
                return h("div", { class: "recipeStepTimer", style: { opacity: 0 } }, ui.icon("watch.svg"));
              }
            }
          };

          return h("li",
            { class: stepClass, onClick: [$act.updateCurrentRecipeStep, index] }, [
            h("div", { class: "recipeStep_Wrap" }, [
              h("div",
                { class: "recipeStep_TextContent", style: { alignContent: "center" } },
                (index + 1 + ". " + s.f)),
            ]),
            renderTimer()
          ])})])} // I miss lisp
}
