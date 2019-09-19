// Recipe views and logic

function v_Hero(bgImage) {
  let attrs = {
    class: "v_Hero",
    style: { backgroundImage: `url(${bgImage})` }
  };

  return h("section", attrs);
}

function v_LargeText(t) {
  return h("h1", { class: "v_LargeText" }, t);
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

function v_Icon(name) {
  return h("img", { src: `media/icons/${name}` });
}

/**
 * Renders a timer, absolutely positioned at the bottom of the screen.
 */
function v_Timer(state) {
  let t = state.timer ? time.secToStr(state.timer) : "00:00:00";
  let centerStyle = { style: { alignSelf: "center", display: "flex" } };
  let stepText = state.currentRecipeStepText;
  let _class = state.timerRunning
    ? "v_TimerFixed"
    : "v_TimerFixed v_TimerFixed_hidden";

  let v_CloseBtn = () =>
    h(
      "span",
      { class: "v_TimerFixed_closeBtn", onClick: [actions.cancelTimer] },
      v_Icon("x-circle-wh.svg")
    );

  return h("div", { class: _class }, [
    h("span", centerStyle, [
      h("span", { class: "pr1" }, v_Icon("watch-wh.svg")),
      h("span", { class: "pr4", style: { alignSelf: "center" } }, `${t}`)
    ]),
    h("span", { style: { alignSelf: "center" } }, `${stepText}`),
    v_CloseBtn()
  ]);
}
