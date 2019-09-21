// var Router = {

//   views: {
//     "/recipes": viewHome,
//     "/recipes/:id": viewRecipe,
//   },

//   handler: function(state) {
//     let url = location.hash.slice(1).toLowerCase() || '/';
//     let r = url.split("/")
//     let request = {resource: null, id: null, verb: null}
//     request.resource = r[1]
//     request.id = r[2]

// 				$act.setId(request.id)
// 				console.log("state is now", state);

// 				// rebuild url
// 				let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '')

//     return Router.views[parsedURL](state)
//   }

// }

// window.addEventListener("load", Router.handler)


// const routerRunner = (props, dispatch) => {
//   console.log("routing");
//   function onLocationChanged() {
//     console.log(window.location.pathname);
//     for (const r of props.routes) {
//       if (r.path === window.location.pathname) {
//         props.matched(r, dispatch);
//         return;
//       }
//     }
//     props.matched(undefined, dispatch);
//   }

//   const push = window.history.pushState;
//   const replace = window.history.replaceState;
//   window.history.pushState = function(data, title, url) {
//     push.call(this, data, title, url);
//     onLocationChanged();
//   };
//   window.history.replaceState = function(data, title, url) {
//     replace.call(this, data, title, url);
//     onLocationChanged();
//   };
//   window.addEventListener("popstate", onLocationChanged);

//   onLocationChanged();

//   return () => {
//     console.log("unrouting");
//     window.history.pushState = push;
//     window.history.replaceState = replace;
//     window.removeEventListener("popstate", onLocationChanged);
//   };
// };

// const createRouter = props => ({
//   effect: routerRunner,
//   ...props
// });

// const pushHistory = props => ({
//   effect: (props, dispatch) => {
//     window.history.pushState(null, "", props.pathname);
//   },
//   ...props
// });

// function Link(props, children) {
//   return h("a", { onClick: [MoveTo, props.to], href: props.to }, children);
// }

// const MoveTo = (state, to, ev) => {
//   ev.preventDefault();
//   return [state, pushHistory({ pathname: to })];
// };

// const router = createRouter({
//   routes: [
//     {
//       path: "/",
//       view: state => viewHome(state)
//     },
//     {
//       path: "/abc",
//       view: state => viewRecipe(state)
//     }
//   ],
//   matched: (route, dispatch) => dispatch([SetRoute, { route: route }])
// });
