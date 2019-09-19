var hyperapp = (function(e) {
  "use strict";
  var n = {},
    r = [],
    t = r.map,
    o = Array.isArray,
    i =
      "undefined" != typeof requestAnimationFrame
        ? requestAnimationFrame
        : setTimeout,
    l = function(e) {
      var n = "";
      if ("string" == typeof e) return e;
      if (o(e) && e.length > 0)
        for (var r, t = 0; t < e.length; t++)
          "" !== (r = l(e[t])) && (n += (n && " ") + r);
      else for (var t in e) e[t] && (n += (n && " ") + t);
      return n;
    },
    u = function(e, n) {
      var r = {};
      for (var t in e) r[t] = e[t];
      for (var t in n) r[t] = n[t];
      return r;
    },
    f = function(e) {
      return e.reduce(function(e, n) {
        return e.concat(
          n && !0 !== n ? ("function" == typeof n[0] ? [n] : f(n)) : 0
        );
      }, r);
    },
    a = function(e, n) {
      return o(e) && o(n) && e[0] === n[0] && "function" == typeof e[0];
    },
    c = function(e, n) {
      if (e !== n)
        for (var r in u(e, n)) {
          if (e[r] !== n[r] && !a(e[r], n[r])) return !0;
          n[r] = e[r];
        }
    },
    s = function(e, n, r, t, o, i) {
      if ("key" === n);
      else if ("style" === n)
        for (var f in u(r, t))
          (r = null == t || null == t[f] ? "" : t[f]),
            "-" === f[0] ? e[n].setProperty(f, r) : (e[n][f] = r);
      else
        "o" === n[0] && "n" === n[1]
          ? ((e.actions || (e.actions = {}))[
              (n = n.slice(2).toLowerCase())
            ] = t)
            ? r || e.addEventListener(n, o)
            : e.removeEventListener(n, o)
          : !i && "list" !== n && n in e
          ? (e[n] = null == t ? "" : t)
          : null == t || !1 === t || ("class" === n && !(t = l(t)))
          ? e.removeAttribute(n)
          : e.setAttribute(n, t);
    },
    d = function(e, n, r) {
      var t = e.props,
        o =
          3 === e.type
            ? document.createTextNode(e.name)
            : (r = r || "svg" === e.name)
            ? document.createElementNS("http://www.w3.org/2000/svg", e.name, {
                is: t.is
              })
            : document.createElement(e.name, { is: t.is });
      for (var i in t) s(o, i, null, t[i], n, r);
      for (var l = 0, u = e.children.length; l < u; l++)
        o.appendChild(d((e.children[l] = y(e.children[l])), n, r));
      return (e.node = o);
    },
    p = function(e) {
      return null == e ? null : e.key;
    },
    v = function(e, n, r, t, o, i) {
      if (r === t);
      else if (null != r && 3 === r.type && 3 === t.type)
        r.name !== t.name && (n.nodeValue = t.name);
      else if (null == r || r.name !== t.name)
        (n = e.insertBefore(d((t = y(t)), o, i), n)),
          null != r && e.removeChild(r.node);
      else {
        var l,
          f,
          a,
          c,
          h = r.props,
          m = t.props,
          g = r.children,
          w = t.children,
          z = 0,
          C = 0,
          k = g.length - 1,
          A = w.length - 1;
        for (var L in ((i = i || "svg" === t.name), u(h, m)))
          ("value" === L || "selected" === L || "checked" === L
            ? n[L]
            : h[L]) !== m[L] && s(n, L, h[L], m[L], o, i);
        for (; C <= A && z <= k && null != (a = p(g[z])) && a === p(w[C]); )
          v(n, g[z].node, g[z], (w[C] = y(w[C++], g[z++])), o, i);
        for (; C <= A && z <= k && null != (a = p(g[k])) && a === p(w[A]); )
          v(n, g[k].node, g[k], (w[A] = y(w[A--], g[k--])), o, i);
        if (z > k)
          for (; C <= A; )
            n.insertBefore(d((w[C] = y(w[C++])), o, i), (f = g[z]) && f.node);
        else if (C > A) for (; z <= k; ) n.removeChild(g[z++].node);
        else {
          L = z;
          for (var N = {}, b = {}; L <= k; L++)
            null != (a = g[L].key) && (N[a] = g[L]);
          for (; C <= A; )
            (a = p((f = g[z]))),
              (c = p((w[C] = y(w[C], f)))),
              b[a] || (null != c && c === p(g[z + 1]))
                ? (null == a && n.removeChild(f.node), z++)
                : null == c || 1 === r.type
                ? (null == a && (v(n, f && f.node, f, w[C], o, i), C++), z++)
                : (a === c
                    ? (v(n, f.node, f, w[C], o, i), (b[c] = !0), z++)
                    : null != (l = N[c])
                    ? (v(n, n.insertBefore(l.node, f && f.node), l, w[C], o, i),
                      (b[c] = !0))
                    : v(n, f && f.node, null, w[C], o, i),
                  C++);
          for (; z <= k; ) null == p((f = g[z++])) && n.removeChild(f.node);
          for (var L in N) null == b[L] && n.removeChild(N[L].node);
        }
      }
      return (t.node = n);
    },
    y = function(e, n) {
      return 2 === e.type
        ? ((!n ||
            (function(e, n) {
              for (var r in e) if (e[r] !== n[r]) return !0;
              for (var r in n) if (e[r] !== n[r]) return !0;
            })(n.lazy, e.lazy)) &&
            ((n = e.lazy.view(e.lazy)).lazy = e.lazy),
          n)
        : e;
    },
    h = function(e, n, r, t, o, i) {
      return { name: e, props: n, children: r, node: t, type: i, key: o };
    },
    m = function(e, t) {
      return h(e, n, r, t, void 0, 3);
    },
    g = function(e) {
      return 3 === e.nodeType
        ? m(e.nodeValue, e)
        : h(e.nodeName.toLowerCase(), n, t.call(e.childNodes, g), e, void 0, 1);
    };
  return (
    (e.Lazy = function(e) {
      return { lazy: e, type: 2 };
    }),
    (e.app = function(e) {
      var n = {},
        r = !1,
        t = e.view,
        l = e.node,
        u = l && g(l),
        a = e.subscriptions,
        s = [],
        d = function(e) {
          y(this.actions[e.type], e);
        },
        p = function(e) {
          return (
            n !== e &&
              ((n = e),
              a &&
                (s = (function(e, n, r) {
                  for (
                    var t, o, i = 0, l = [];
                    i < e.length || i < n.length;
                    i++
                  )
                    (t = e[i]),
                      (o = n[i]),
                      l.push(
                        o
                          ? !t || o[0] !== t[0] || c(o[1], t[1])
                            ? [o[0], o[1], o[0](r, o[1]), t && t[2]()]
                            : t
                          : t && t[2]()
                      );
                  return l;
                })(s, f([a(n)]), y)),
              t && !r && i(h, (r = !0))),
            n
          );
        },
        y = (e.middleware ||
          function(e) {
            return e;
          })(function(e, r) {
          return "function" == typeof e
            ? y(e(n, r))
            : o(e)
            ? "function" == typeof e[0]
              ? y(e[0], "function" == typeof e[1] ? e[1](r) : e[1])
              : (f(e.slice(1)).map(function(e) {
                  e && e[0](y, e[1]);
                }, p(e[0])),
                n)
            : p(e);
        }),
        h = function() {
          (r = !1),
            (l = v(
              l.parentNode,
              l,
              u,
              (u = "string" == typeof (u = t(n)) ? m(u) : u),
              d
            ));
        };
      y(e.init);
    }),
    (e.h = function(e, r) {
      for (var t, i = [], l = [], u = arguments.length; u-- > 2; )
        i.push(arguments[u]);
      for (; i.length > 0; )
        if (o((t = i.pop()))) for (u = t.length; u-- > 0; ) i.push(t[u]);
        else
          !1 === t ||
            !0 === t ||
            null == t ||
            l.push("object" == typeof t ? t : m(t));
      return (
        (r = r || n),
        "function" == typeof e ? e(r, l) : h(e, r, l, void 0, r.key)
      );
    }),
    e
  );
})({});
//# sourceMappingURL=hyperapp.js.map

var timeFx = function(fx) {
  return function(action, props) {
    return [fx, { action: action, delay: props.delay }];
  };
};

var timeout = timeFx(function timeout(dispatch, props) {
  setTimeout(function() {
    dispatch(props.action);
  }, props.delay);
});

var interval = timeFx(function interval(dispatch, props) {
  var id = setInterval(function() {
    dispatch(props.action, Date.now());
  }, props.delay);
  return function() {
    clearInterval(id);
  };
});
