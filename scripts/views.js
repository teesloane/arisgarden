//
//
//
var routes = {
  "#": Recipe.viewAll,
  "#/recipes": Recipe.viewAll,
  "#/recipe": Recipe.viewSingle,
  "404": () => h("div", {}, "not found")
}

const handleRouter = (action, state) => {
  // the main functions purpose
  const subFn = (dispatch, options) => {
    addEventListener("hashchange", (e) => {dispatch(action, { event: e, state })})
    addEventListener("load", (e) => {dispatch(action, { event: e, state })})

    // run on removal of subscription?
    return () => {console.log("stopping handle Router")}
  }

  return [subFn, { action }]
}
