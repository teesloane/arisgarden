// Recipe views and logic

function v_Hero(bgImage) {
  let attrs = {
    class: "v_Hero",
    style: { backgroundImage: `url(${bgImage})` }
  };

  return h("section", attrs );
}


function v_LargeText(t) {
  return h("h1", {class: "v_LargeText"}, t)
}

function v_GiantQuote(t) {
  return h(
    "section",
    { class: "content" },
    h("div", { class: "v_GiantQuote" }, [
      h("div", { class: "v_giantQuoteText" }, t),
      h("div", { class: "v_giantQuoteSym" }, '"')
    ])
  );
}
