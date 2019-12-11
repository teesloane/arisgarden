/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);

const db = __webpack_require__(5);

const {
  Elm
} = __webpack_require__(6);

Elm.Main.init({
  node: document.querySelector("main"),
  flags: {
    recipes: db.recipes // [db.recipes["breakfast-quinoa"]]

  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(2);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(4)(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, "", ""]);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
  recipes: {
    "breakfast-quinoa": {
      belongs_to: "breakfast",
      date_made: "[2019-10-03]",
      ease_of_making: "5/5",
      imgs: [],
      meal_type: "vegan",
      name: "Breakfast Quinoa",
      original_recipe: "https://cookieandkate.com/cinnamon-breakfast-quinoa-recipe/",
      rating: "5/5",
      serves: "4",
      slug: "breakfast-quinoa",
      time: "00:40:00",
      ingredients: [{
        ingredient: "Quinoa",
        quantity: "1",
        unit: "cups",
        id: "quin"
      }, {
        ingredient: "Water",
        quantity: "2",
        unit: "cups",
        id: "water"
      }, {
        ingredient: "Maple Syrup",
        quantity: "2",
        unit: "tbsp",
        id: "syr"
      }, {
        ingredient: "Pecans or Walnuts (chopped)",
        quantity: "1/4",
        unit: "cups",
        id: "nuts"
      }, {
        ingredient: "Cinnamon",
        quantity: "1 or 2",
        unit: "tsp",
        id: "cin"
      }, {
        ingredient: "Coconut oil",
        quantity: "2",
        unit: "tbsp",
        id: "oil"
      }, {
        ingredient: "Fresh berries",
        quantity: "",
        unit: "",
        id: "berr"
      }, {
        ingredient: "Almond butter",
        quantity: "",
        unit: "",
        id: "almbut"
      }],
      instructions: [{
        original: "[&:00:15:00] Make the [#: quin | quinoa]: Put two cups of water and one cup of quinoa into a pot. Bring it to a boil and then reduce to a simmer and cover for 15 minutes"
      }, {
        original: "[&:00:04:00] Heat chopped [#: nuts | nuts] in a saucepan. Stir frequently until they smell fragrant. Do it for 4-6 minutes."
      }, {
        original: "[&:00:00:15] Add [#: oil | coconut oil], [#: cin | cinnamon] to the pot. Stir frequently until coconut oil melts and cinnamon becomes fragrant. About 15 seconds."
      }, {
        original: "[&:00:01:00] Add the quinoa to the pot and stir to combine. Cook, stirring constantly, until quinoa is warmed through. Should take a minute or two. Remove from the burner and add [#: syr | maple syrup]."
      }, {
        original: "Add the nuts to the quinoa. Top with a sprinkle of cinnamon."
      }, {
        original: "Top with [#: berr | fresh berries] and [#: almbut | almond butter]."
      }]
    },
    "pantry-dahl": {
      belongs_to: "main",
      date_made: "[2019-09-01]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "Pantry Dahl",
      original_recipe: "https://ohsheglows.com/2017/07/21/8-minute-pantry-dal-two-ways/",
      rating: "4/5",
      serves: "4",
      slug: "pantry-dahl",
      time: "00:40:00",
      ingredients: [{
        ingredient: "Coconut oil",
        quantity: "1",
        unit: "tbsp",
        id: "oil-coconut",
        group: ""
      }, {
        ingredient: "Diced vegetables (Carrots, Potatoes, Broccoli etc)",
        quantity: "4",
        unit: "cups",
        id: "vegetables-misc",
        group: ""
      }, {
        ingredient: "Uncooked red lentils",
        quantity: "1/2",
        unit: "cups",
        id: "lentils-red",
        group: ""
      }, {
        ingredient: "Water",
        quantity: "1/2",
        unit: "cups",
        id: "water",
        group: ""
      }, {
        ingredient: "Diced tomato (1 can or fresh)",
        quantity: "14",
        unit: "oz",
        id: "tomato-diced-can",
        group: ""
      }, {
        ingredient: "Coconut milk (1 can)",
        quantity: "14",
        unit: "oz",
        id: "milk-coconut",
        group: ""
      }, {
        ingredient: "Garlic powder",
        quantity: "1.5",
        unit: "tsp",
        id: "powder-garlic",
        group: ""
      }, {
        ingredient: "Minced onion",
        quantity: "1.5",
        unit: "tsp",
        id: "onion-minced",
        group: ""
      }, {
        ingredient: "Curry powder",
        quantity: "1",
        unit: "tbsp",
        id: "powder-curry",
        group: ""
      }, {
        ingredient: "Sea salt",
        quantity: "1",
        unit: "tsp",
        id: "salt-sea",
        group: ""
      }, {
        ingredient: "Pepper",
        quantity: "1",
        unit: "pinch",
        id: "pepper",
        group: ""
      }, {
        ingredient: "Rice or Grain for Base",
        quantity: "",
        unit: "",
        id: "rice",
        group: ""
      }],
      instructions: [{
        original: "Melt [#: oil-coconut | coconut oil] in a large pot"
      }, {
        original: "Peel (if necessary) and dice vegetables into 1/2 inch pieces. Add to pot and stir."
      }, {
        original: "Add the rest of the ingredients ([#: milk-coconut | coconut milk], [#: tomato-diced-can | diced tomato], [#: powder-garlic | garlic powder], [#: onion-minced | minced onion], [#: powder-curry | curry powder] [#: lentils-red | lentils].)"
      }, {
        original: "Bring to a boil and the reduce heat to medium."
      }, {
        original: "[&: 00:18:00] Cook for 18-30 minutes. Stir frequently."
      }, {
        original: "Serve over rice. Optional: Garnish with cilantro and lime."
      }]
    },
    "chickpea-shakshuka": {
      belongs_to: "main",
      date_made: "[2019-09-03]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "1 Pot Chickpea Shakshuka",
      original_recipe: "https://minimalistbaker.com/1-pot-chickpea-shakshuka/",
      rating: "4/5",
      serves: "3",
      slug: "chickpea-shakshuka",
      time: "01:00:00",
      ingredients: [{
        ingredient: "Olive Oil",
        quantity: "1",
        unit: "tbsp",
        id: "oil-olive",
        group: ""
      }, {
        ingredient: "White onion (or: shallot)",
        quantity: "1/2/",
        unit: "cups",
        id: "onion-white",
        group: ""
      }, {
        ingredient: "Garlic",
        quantity: "3",
        unit: "cloves",
        id: "garlic",
        group: ""
      }, {
        ingredient: "Bell Pepper (chopped)",
        quantity: "1/2/",
        unit: "cups",
        id: "pepper-bell",
        group: ""
      }, {
        ingredient: "Diced tomatoes",
        quantity: "28",
        unit: "oz",
        id: "tomato-diced",
        group: ""
      }, {
        ingredient: "Tomato paste",
        quantity: "3",
        unit: "tbsp",
        id: "tomato-paste",
        group: ""
      }, {
        ingredient: "Olives",
        quantity: "5",
        unit: "",
        id: "olives",
        group: ""
      }, {
        ingredient: "Maple syrup",
        quantity: "1",
        unit: "tbsp",
        id: "maple-syrup",
        group: ""
      }, {
        ingredient: "Ground cumin",
        quantity: "1",
        unit: "tsp",
        id: "cumin-ground",
        group: ""
      }, {
        ingredient: "Paprika",
        quantity: "1",
        unit: "tsp",
        id: "paprika",
        group: ""
      }, {
        ingredient: "Chili powder",
        quantity: "2",
        unit: "tsp",
        id: "chili-powder",
        group: ""
      }, {
        ingredient: "Ground cinnamon",
        quantity: "1/4",
        unit: "tsp",
        id: "cinnamon-ground",
        group: ""
      }, {
        ingredient: "Chickpeas",
        quantity: "24",
        unit: "oz",
        id: "chickpeas",
        group: ""
      }, {
        ingredient: "Sea Salt",
        quantity: "1",
        unit: "pinch",
        id: "salt-sea",
        group: ""
      }],
      instructions: [{
        original: "Heat a large metal or cast iron skilled on medium heat."
      }, {
        original: "[&: 00:04:00] When hot, add [#: oil-olive | olive oil ], [#: onion-white | onion], [#: pepper-bell | bell pepper] and [#: garlic | garlic]. Saute for 4-5 minutes, stirring frequently."
      }, {
        original: "Add [#: tomato-diced | diced tomatoes], [#: tomato-paste | tomato paste], [#: maple-syrup | maple syrup], [#: salt-sea | sea salt], [#: paprika | paprika], [#: cumin-ground | cumin], [#: chili-powder | chili powder], [#: cinnamon-ground | cinnamon]. Stir."
      }, {
        original: "[&: 00:03:00] Bring to a simmer. Cook for 2-3 minutes."
      }, {
        original: "[&: 00:15:00] Add [#: chickpeas | chickpeas] and [#: olives | olives]. Reduce heat to medium-low for 15-20 minutes."
      }]
    },
    "collard-green-pasta": {
      belongs_to: "main",
      date_made: "[2019-09-04]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegetarian",
      name: "Leafy Spaghetti",
      original_recipe: "https://cookieandkate.com/lemon-collard-greens-pasta/",
      rating: "5/5",
      serves: "2",
      slug: "collard-green-pasta",
      time: "00:25:00",
      ingredients: [{
        ingredient: "Swiss Chard",
        quantity: "10",
        unit: "leaves",
        id: "swiss-chard"
      }, {
        ingredient: "Spaghetti",
        quantity: "1/3",
        unit: "package",
        id: "spaghetti"
      }, {
        ingredient: "Chopped Nuts",
        quantity: "3",
        unit: "tbsp",
        id: "nuts"
      }, {
        ingredient: "Olive Oil",
        quantity: "1",
        unit: "tbsp",
        id: "oil-olive"
      }, {
        ingredient: "Garlic",
        quantity: "2",
        unit: "cloves",
        id: "garlic"
      }, {
        ingredient: "Red Pepper Flakes",
        quantity: "1",
        unit: "pinch",
        id: "red-pepper-flakes"
      }, {
        ingredient: "Parmesan Cheese",
        quantity: "1",
        unit: "ounce",
        id: "cheese-parmesan"
      }, {
        ingredient: "Lemon",
        quantity: "1",
        unit: "",
        id: "lemon"
      }],
      instructions: [{
        original: "Bring a pot of salted water to boil. Cook the [#: spaghetti | pasta]."
      }, {
        original: "Drain the pasta, reserving a bit of cooking water. Set aside."
      }, {
        original: 'Cut out the "rib" of the swiss chard. Roll up the leaves like a cigar. Slice across the role, as thinly as possible.'
      }, {
        original: "Heat a skillet on medium heat. Toast the [#: nuts | nuts] until fragrant. Set aside."
      }, {
        original: "Using the same skillet, heat the [#: oil-olive | olive oil]. When hot, put in the [#: garlic | garlic] and [#: red-pepper-flakes | red pepper flakes]."
      }, {
        original: "[&: 00:03:00] After a bit, toss in the swiss-chard. Sprinkle with salt. Stir often, about three minutes."
      }, {
        original: "Scoop chard into pasta pot and toss with oil. Add pasta water if necessary."
      }, {
        original: "Divide onto plates, top with nuts and parmesan shavings. Add two big lemon wedges per person."
      }]
    },
    bowl1: {
      belongs_to: "main",
      date_made: "[2019-09-08]",
      ease_of_making: "3/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "Bowl #1",
      original_recipe: "https://tasty.co/recipe/protein-packed-buddha-bowl",
      rating: "5/5",
      serves: "2",
      slug: "bowl1",
      time: "00:50:00",
      ingredients: [{
        ingredient: "Sweet Potato",
        quantity: "1",
        unit: "",
        id: "potato-sweet",
        group: ""
      }, {
        ingredient: "Shredded Carrots",
        quantity: "1",
        unit: "",
        id: "avocado",
        group: ""
      }, {
        ingredient: "Onion",
        quantity: "1",
        unit: "",
        id: "onion",
        group: ""
      }, {
        ingredient: "Tofu",
        quantity: "8",
        unit: "oz",
        id: "tofu",
        group: ""
      }, {
        ingredient: "Garlic",
        quantity: "2",
        unit: "cloves",
        id: "garlic",
        group: ""
      }, {
        ingredient: "Chickpeas",
        quantity: "1",
        unit: "cups",
        id: "chickpeas",
        group: ""
      }, {
        ingredient: "Pepper",
        quantity: "1/2",
        unit: "tsp",
        id: "pepper",
        group: ""
      }, {
        ingredient: "Chili powder",
        quantity: "1",
        unit: "tsp",
        id: "chili-powder",
        group: ""
      }, {
        ingredient: "Garlic powder",
        quantity: "1",
        unit: "tsp",
        id: "garlic-powder",
        group: ""
      }, {
        ingredient: "Quinoa",
        quantity: "1+1/2",
        unit: "cups",
        id: "quinoa",
        group: ""
      }, {
        ingredient: "Sesame Oil",
        quantity: "1/2",
        unit: "tsp",
        id: "oil-sesame",
        group: "Marinade"
      }, {
        ingredient: "Hot Sauce",
        quantity: "1",
        unit: "tsp",
        id: "sauce-hot",
        group: "Marinade"
      }, {
        ingredient: "Dried thyme",
        quantity: "2",
        unit: "tsp",
        id: "thyme",
        group: "Marinade"
      }, {
        ingredient: "Paprika",
        quantity: "1",
        unit: "tsp",
        id: "paprika",
        group: "Marinade"
      }],
      instructions: [{
        original: "Make the marinade: combine [#: oil-olive | olive oil], [#: oil-sesame | seasame oil], [#: sauce-hot | hot sauce], [#: thyme | thyme], [#: paprika | paprika], and [#: salt | salt]. Set aside."
      }, {
        original: "[&: 00:30:00] Add marinade and tofu to a container and marinate for at least 30 minutes (up to a day)."
      }, {
        original: "Preheat the oven to 400F (200C)."
      }, {
        original: "[&: 00:20:00] Cut [#: potato-sweet | sweet potato] into cubes. Slice the [#: onion | onion], dice [#: garlic | garlic]. Put it all on a baking sheet. Drizzel with oil, season with salt and pepper. Bake for 20-25 min."
      }, {
        original: "In a medium bowl, add the [#: chickpeas | chickpeas], salt, pepper, [#: chili-powder | chili powder], and [#: garlic-powder | garlic powder]. Stir to combine."
      }, {
        original: "[&: 00:10:00] Transfer chickpeas to skillet and cook on medium heat for 10 minutes. Set aside."
      }, {
        original: "[&: 00:10:00] Fry the tofu in the same pan for about 10 minutes on each side."
      }, {
        original: "Slice tofu as you like."
      }, {
        original: "Combine tofu and sweet potato with quinoa chickpeas, carrots, and avocado, etc."
      }]
    },
    "massaman-curry": {
      belongs_to: "main",
      date_made: "[2019-09-10]",
      ease_of_making: "5/5",
      imgs: [],
      meal_type: "vegan",
      name: "Massaman Curry",
      original_recipe: "https://minimalistbaker.com/easy-1-pot-massaman-curry/",
      rating: "5/5",
      serves: "2",
      slug: "massaman-curry",
      time: "01:00:00",
      ingredients: [{
        ingredient: "Tofu",
        quantity: "1",
        unit: "package",
        id: "tofu"
      }, {
        ingredient: "Coconut oil",
        quantity: "2",
        unit: "tbsp",
        id: "oil-coconut"
      }, {
        ingredient: "Cumin powder",
        quantity: "1",
        unit: "tsp",
        id: "cumin-powder"
      }, {
        ingredient: "Coriander powder",
        quantity: "1",
        unit: "tsp",
        id: "coriander-powder"
      }, {
        ingredient: "Red Curry Paste",
        quantity: "5",
        unit: "tbsp",
        id: "red-curry-paste"
      }, {
        ingredient: "Baby potatoes",
        quantity: "1+1/2",
        unit: "cups",
        id: "potatoes-baby"
      }, {
        ingredient: "Carrots",
        quantity: "2",
        unit: "",
        id: "carrots"
      }, {
        ingredient: "Coconut milk",
        quantity: "28",
        unit: "oz",
        id: "milk-coconut"
      }, {
        ingredient: "Water",
        quantity: "1+1/2",
        unit: "cups",
        id: "water"
      }, {
        ingredient: "Ground cinnamon",
        quantity: "1/4",
        unit: "tsp",
        id: "ground-cinnamon"
      }, {
        ingredient: "Soy sauce",
        quantity: "2",
        unit: "tbsp",
        id: "sauce-soy"
      }, {
        ingredient: "Maple syrup",
        quantity: "2",
        unit: "tbsp",
        id: "maple-syrup"
      }, {
        ingredient: "Peanut butter",
        quantity: "2",
        unit: "tbsp",
        id: "peanut-butter"
      }, {
        ingredient: "Lime juice",
        quantity: "2",
        unit: "tbsp",
        id: "lime-juice"
      }, {
        ingredient: "Rice/Grain",
        quantity: "",
        unit: "",
        id: "rice"
      }],
      instructions: [{
        original: "Press your tofu. You'll come back and cube it once pressed."
      }, {
        original: "Cook desired serving of rice as per package instructions"
      }, {
        original: "Heat a large pot or dutch oven on medium heat. Once hot, add [#: oil-coconut | oil] and shallot."
      }, {
        original: "[&: 00:02:00] Saute for 2 minutes. Stir frequently."
      }, {
        original: "[&: 00:02:00] Add [#: cumin-powder | cumin] and [#: coriander-powder | coriander]. Saute for 2 minutes, stirring frequently."
      }, {
        original: "[&: 00:01:00] Add [#: red-curry-paste | red curry paste] and stir for another minute."
      }, {
        original: "[&: 00:02:00] Add [#: potatoes-baby | potatoes] and [#: carrots | carrots] and stir to coat. Cook for 2 minutes."
      }, {
        original: "Add [#: milk-coconut | coconut milk], [#: water | water], [#: ground-cinnamon | cinnamon], [#: sauce-soy | soy-sauce], [#: maple-syrup | maple syrup], and [#: peanut-butter | peanut butter]. Add your tofu or other protein now."
      }, {
        original: "[&: 00:10:00] Bring to a simmer and cook for 10-15 minutes uncovered. Don't boil it. Simmer it."
      }, {
        original: "Near the end of the previous step, toss in your tofu and the [#: lime-juice | lime juice]. Cook for another few minutes."
      }, {
        original: "[&: 00:05:00] Let stand for 10 minutes."
      }, {
        original: "Enjoy with a side of rice."
      }]
    },
    "cauliflower-rice-stir-fry": {
      date_made: "[2019-09-12]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "Cauliflower Rice Stir Fry",
      original_recipe: "https://minimalistbaker.com/30-minute-cauliflower-rice-stir-fry/",
      rating: "3/5",
      serves: "2",
      belongs_to: "main",
      slug: "cauliflower-rice-stir-fry",
      time: "00:45:00",
      ingredients: [{
        ingredient: "Cauliflower",
        quantity: "1",
        unit: "head",
        id: "cauliflower",
        group: "cauliflower"
      }, {
        ingredient: "Water (for cauliflower rice)",
        quantity: "3",
        unit: "tbsp",
        id: "water",
        group: "cauliflower"
      }, {
        ingredient: "Coconut oil",
        quantity: "1",
        unit: "tsp",
        id: "oil-coconut",
        group: "sauce"
      }, {
        ingredient: "Peanut or Almond Butter",
        quantity: "2",
        unit: "tbsp",
        id: "almond-butter",
        group: "sauce"
      }, {
        ingredient: "ginger",
        quantity: "1",
        unit: "tbsp",
        id: "ginger",
        group: "sauce"
      }, {
        ingredient: "Maple syrup",
        quantity: "1",
        unit: "tbsp",
        id: "maple-syrup",
        group: "sauce"
      }, {
        ingredient: "Soy sauce (for the sauce)",
        quantity: "4",
        unit: "tbsp",
        id: "soy-sauce-1",
        group: "sauce"
      }, {
        ingredient: "Lime juice",
        quantity: "2",
        unit: "tbsp",
        id: "lime-juice",
        group: "sauce"
      }, {
        ingredient: "Chili garlic sauce or sriracha",
        quantity: "2-4",
        unit: "tbsp",
        id: "chili-garlic-sauce",
        group: "sauce"
      }, {
        ingredient: "Water",
        quantity: "2-3",
        unit: "tbsp",
        id: "water",
        group: "sauce"
      }, {
        ingredient: "Green beans (trimmed and halved)",
        quantity: "1+1/2",
        unit: "cups",
        id: "green-beans",
        group: "stir-fry"
      }, {
        ingredient: "Cabbage (thinly sliced)",
        quantity: "1",
        unit: "cups",
        id: "cabbage",
        group: "stir-fry"
      }, {
        ingredient: "soy-sauce",
        quantity: "3",
        unit: "tbsp",
        id: "soy-sauce-2",
        group: "stir-fry"
      }, {
        ingredient: "Green onions (diced)",
        quantity: "1",
        unit: "cups",
        id: "onions-green",
        group: "stir-fry"
      }, {
        ingredient: "Bell Pepper (sliced thinly)",
        quantity: "1",
        unit: "",
        id: "pepper-bell",
        group: "stir-fry"
      }, {
        ingredient: "Cashews",
        quantity: "3/4",
        unit: "cups",
        id: "cashews",
        group: "stir-fry"
      }, {
        ingredient: "A Blender",
        quantity: "",
        unit: "",
        id: "",
        group: ""
      }],
      instructions: [{
        original: "Wash the cauliflower. Chop it in a blender until you have small chunks (that look more like rice than cauliflower.)"
      }, {
        original: "Create the sauce: add coconut oil, peanut butter, soy sauce lime juice, chili garlic sauce, fresh ginger, maple syrup, and water into a small bowl. Whisk to combine. Set aside."
      }, {
        original: "[&: 00:05:00] Heat a skillet over medium-low. Add cauliflower rice and water. Stir and cover with a lid to steam. Cook for 4-6 minutes or until just tender. Remove and let some steam out."
      }, {
        original: "[&: 00:04:00] Heat another skillet (or pot) on medium heat. When hot, add coconut oil and green beans. Season with 1/3 of the soy sauce used for the stirfry (1tbsp). Cover with lid and steam for about 4 minutes."
      }, {
        original: "[&: 00:03:00] Add bell peppers, green onion, cabbage, and remaining soy sauce (2tbsp). Stir. Saute for 3-4 minutes."
      }, {
        original: "Add cashes and cauliflower rice and stir to combine."
      }, {
        original: "[&: 00:03:00] Add the sauce to the beans. Increase heat to medium-high. Cook for about 3 minutes until hot."
      }]
    },
    "kale-coconut-rice": {
      date_made: "[2019-09-17]",
      ease_of_making: "4/5",
      imgs: ["1.JPG", "2.JPG", "3.gif"],
      meal_type: "vegetarian",
      name: "Kale And Coconut Rice",
      original_recipe: "https://cookieandkate.com/spicy-kale-and-coconut-fried-rice/",
      rating: "5/5",
      serves: "4",
      belongs_to: "main",
      slug: "kale-coconut-rice",
      time: "00:40:00",
      ingredients: [{
        ingredient: "Coconut oil",
        quantity: "2",
        unit: "tbsp",
        id: "oil-coconut"
      }, {
        ingredient: "Eggs",
        quantity: "2",
        unit: "",
        id: "eggs"
      }, {
        ingredient: "Garlic (minced)",
        quantity: "2",
        unit: "cloves",
        id: "garlic"
      }, {
        ingredient: "Green onions (chopped)",
        quantity: "1",
        unit: "bunch",
        id: "onions-green"
      }, {
        ingredient: "Chopped vegetables (peppers, brussel sprouts etc)",
        quantity: "1",
        unit: "cups",
        id: "vegetables-chopped"
      }, {
        ingredient: "Kale (ribs removed, chopped)",
        quantity: "1",
        unit: "bunch",
        id: "kale"
      }, {
        ingredient: "Sea salt",
        quantity: "1/4",
        unit: "tsp",
        id: "salt-sea"
      }, {
        ingredient: "Coconut flakes",
        quantity: "3/4",
        unit: "cups",
        id: "coconut-flakes"
      }, {
        ingredient: "Rice",
        quantity: "1",
        unit: "cup",
        id: "rice"
      }, {
        ingredient: "Soy sauce",
        quantity: "2",
        unit: "tsp",
        id: "sauce-soy"
      }, {
        ingredient: "Sriracha",
        quantity: "2",
        unit: "tsp",
        id: "sriracha"
      }, {
        ingredient: "Lime (halved)",
        quantity: "1",
        unit: "",
        id: "lime"
      }, {
        ingredient: "Cilantro",
        quantity: "1",
        unit: "handful",
        id: "cilantro"
      }],
      instructions: [{
        original: "Cook the [#: rice | rice] and set it aside to cool."
      }, {
        original: "Heat a large skillet on medium high heat. Add 1 teaspoon of [#: oil-coconut | coconut oil]."
      }, {
        original: "Add [#: eggs | eggs] and stir frequently so they are sort of scrambled. Transfer to bowl when done and wipe the pan clean."
      }, {
        original: "Add a tablespoon of coconut oil to pan. Add [#: garlic | garlic], [#: onions-green | green onions] and [#: vegetables-chopped | vegetables]. Cook until fragrant (30 seconds).  Add the [#: kale | kale] and [#: salt-sea | salt] . Cook until wilted, about 1-2 minutes. Transfer to bowl with eggs."
      }, {
        original: "Add 2 more tablespoons of coconut oil to the pan AGAIN. Add the coconut flakes, stir frequently until golden. Add the cooked rice and stir occaisionally until hot, about 3 minutes."
      }, {
        original: "Pour the contents of the bowl back into the pan, breaking up the scrambled egg with a spatula."
      }, {
        original: "Add Soy sauce, Sriracha, and half of the lime juice. Stir."
      }]
    },
    "sweet-potato-gnocci": {
      date_made: "[2019-09-22]",
      ease_of_making: "3/5",
      imgs: ["1.JPG", "2.JPG", "4.gif"],
      meal_type: "vegetarian",
      name: "Sweet Potato Gnocchi",
      original_recipe: "https://biancazapatka.com/en/vegan-sweet-potato-gnocchi/",
      rating: "4/5",
      belongs_to: "main",
      slug: "sweet-potato-gnocci",
      serves: "2",
      time: "01:10:00",
      ingredients: [{
        ingredient: "Sweet Potato (large / 600g)",
        quantity: "1",
        unit: "",
        id: "potato-sweet"
      }, {
        ingredient: "Nutritional Yeast or Parmesan (optional)",
        quantity: "2-3",
        unit: "tbsp",
        id: "parm"
      }, {
        ingredient: "Flour",
        quantity: "1/3",
        unit: "cups",
        id: "flour"
      }, {
        ingredient: "Salt",
        quantity: "1/2",
        unit: "tsp",
        id: "salt"
      }, {
        ingredient: "Cherry tomatoes",
        quantity: "250",
        unit: "grams",
        id: "tomatoes"
      }, {
        ingredient: "Vegan butter or coconut oil",
        quantity: "2",
        unit: "tbsp",
        id: "coco-oil"
      }, {
        ingredient: "Garlic",
        quantity: "3",
        unit: "cloves",
        id: "garlic"
      }, {
        ingredient: "Optional Nuts (pine or pecan, or whatever)",
        quantity: "4",
        unit: "tbsp",
        id: "nuts"
      }],
      instructions: [{
        original: "[&: 00:50:00] Prick the [#: potato-sweet | sweet potato] several times with a fork. Put it in the oven for 50-60 minutes at about 425 degrees."
      }, {
        original: "Peel the sweet potato. Scoop the inside into a bowl. Mash it smooth. Add [#: salt | salt]. Add nutritional yeast or parmesan if you want. Add the [#: flour | flour] and knead gently. Don't over knead. Try to use as little flour as possible."
      }, {
        original: "Transfer the dough to a floured work surface. Form it in a flat ball and cut into quarters. Take a piece and form a long rope, rolling it into a long rope. Cut the rope into 2cm pieces."
      }, {
        original: 'Create gnocchi "ridges" into the sweet potato pieces by rolling it along the tines of a fork (from the tip backward).'
      }, {
        original: "Bring a pot of salted water to a boil. Add the gnocchi, cook until they float to the top of the water. Drain. Optional: toss with a little olive oil to prevent sticking."
      }, {
        original: "If you have more gnocchi than you need, now is the time to freeze the abundance!"
      }, {
        original: "[&: 00:15:00] Put [#: tomatoes | tomatoes] onto a baking sheet with cloves of garlic. Drizzle  with olive oil. Season with salt and pepper. Roast in the oven at 400 for 15 minutes."
      }, {
        original: "Toast [#: nuts | nuts] in a small pan with additional oil. Set aside."
      }, {
        original: "Heat [#: coco-oil | coconut oil] on medium. Add the gnocchi and roast until golden-brown and crispy."
      }, {
        original: "Serve Gnocchi with roasted tomatoes and nuts and sprinkle with cheese or fresh chooped herbs."
      }]
    },
    "garlic-alfredo-pasta": {
      date_made: "[2019-09-23]",
      ease_of_making: "3/5",
      imgs: [],
      meal_type: "vegan",
      name: "White Wine Pasta w/ Brussel Sprouts",
      original_recipe: "https://minimalistbaker.com/vegan-garlic-alfredo-pasta/",
      rating: "3/5",
      belongs_to: "main",
      slug: "garlic-alfredo-pasta",
      serves: "2",
      time: "00:30:00",
      ingredients: [{
        ingredient: "Brussel Sprouts (halved)",
        quantity: "16",
        unit: "ounces",
        id: "brus"
      }, {
        ingredient: "Olive Oil",
        quantity: "1-2",
        unit: "tbsp",
        id: "oil"
      }, {
        ingredient: "Garlic",
        quantity: "4",
        unit: "cloves",
        id: "garlic"
      }, {
        ingredient: "White Wine",
        quantity: "1/3",
        unit: "cups",
        id: "wine"
      }, {
        ingredient: "Cornstarch",
        quantity: "4",
        unit: "tbsp",
        id: "corn"
      }, {
        ingredient: "Almond milk",
        quantity: "3/4",
        unit: "cups",
        id: "milk"
      }, {
        ingredient: "Nutritional Yeast",
        quantity: "4",
        unit: "tbsp",
        id: "yeast"
      }, {
        ingredient: "Parmesean",
        quantity: "1/4",
        unit: "cups",
        id: "parm"
      }, {
        ingredient: "Pasta",
        quantity: "10",
        unit: "ounces",
        id: "pasta"
      }, {
        ingredient: "",
        quantity: "",
        unit: "",
        id: ""
      }],
      instructions: [{
        original: "Preheat oven to 400F. Add [#: brus | brussel sprouts] to baking sheet in a single layer. Drizzel with [#: oil | oil] and season with salt and pepper. Arranger in a single layer."
      }, {
        original: "Bring a pot of water to a boil."
      }, {
        original: "Heat a skillet. Add 1-2 tbsp of oil. Add [#: garlic | garlic]. Saute for 3 minutes."
      }, {
        original: "[&:00:02:00] Add [#: wine | wine]. Saute for 2-4 minutes."
      }, {
        original: "Add [#: corn | cornstarch] and [#: milk | almond milk] and whisk. It'll be clumpy."
      }, {
        original: "Move the mixture to a blender. Add [#: yeast | nutritional yeast], salt + pepper, [#: parm | parmesan cheese]. Blend on high until creamy and smooth."
      }, {
        original: "Transfer sauce back to skilled and warm over medium low heat. It should thicken, then lower the heat to low and simmer until the pasta is cooked. If it gets too thick, add almond milk to thin it out. Try not to let a film form overtop."
      }, {
        original: "[&:00:12:00] Add brussel sprouts to the oven for 12-15 minutes or until golden brown."
      }, {
        original: "At the same time as the previous step, add pasta to boiling water and cook according to the package instructions."
      }, {
        original: "Once the pasta is cooked, drain the water and add directly to the sauce along with the brussel sprouts. Season with more parmesean if you want."
      }]
    },
    "kimchi-udon": {
      belongs_to: "main",
      date_made: "[2019-09-30]",
      ease_of_making: "4/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG", "4.JPG"],
      meal_type: "vegetarian",
      name: "Kimchi Udon",
      original_recipe: "https://www.bonappetit.com/recipe/kimchi-udon-with-scallions",
      rating: "4/5",
      serves: "2",
      slug: "kimchi-udon",
      time: "00:30:00",
      ingredients: [{
        ingredient: "Butter, unsalted",
        quantity: "5",
        unit: "tbsp",
        id: "butter"
      }, {
        ingredient: "Kimchi (chopped)",
        quantity: "1",
        unit: "cups",
        id: "kimchi"
      }, {
        ingredient: "Kimchi (juice)",
        quantity: "1/3",
        unit: "cups",
        id: "kimchi-juice"
      }, {
        ingredient: "Gochujang",
        quantity: "2",
        unit: "tbsp",
        id: "gochu"
      }, {
        ingredient: "Vegetable Broth",
        quantity: "1/2/",
        unit: "cup",
        id: "veg-broth"
      }, {
        ingredient: "Udon Noodles",
        quantity: "1",
        unit: "lb",
        id: "udon"
      }, {
        ingredient: "Toasted Sesame Seeds",
        quantity: "1",
        unit: "tbsp",
        id: "sesa"
      }, {
        ingredient: "Salt",
        quantity: "1",
        unit: "pinch",
        id: "salt"
      }, {
        ingredient: "Egg yolks",
        quantity: "2- 4",
        unit: "",
        id: "yolks"
      }, {
        ingredient: "Scallions (thinly sliced)",
        quantity: "3",
        unit: "",
        id: "scall"
      }],
      instructions: [{
        original: "Chop [#: kimchi | kimchi] and collect [#: kimchi-juice | kimchi juice]."
      }, {
        original: "[&: 00:04:00] Heat 2 tbsp of butter on medium high. Add chopped kimchi and [#: gochu | gochujang] and cook, stirring until kimchi is softened and lightly caramelized, around 4 minutes."
      }, {
        original: "[&: 00:03:00] Add [#: veg-broth | broth] and kimchi juice and bring to a simmer. Cook until slightly reduced, about 3 minutes."
      }, {
        original: "Boil [#: udon | noodles] according to package directions."
      }, {
        original: "[&: 00:02:00] Using tongs, transfer noodles to the skillet and add the remaining 3 tbsp of butter. Cook, tossing often, about 2 minutes."
      }, {
        original: "Season with salt if needed."
      }, {
        original: "Divide into bowls, top with egg yolks, [#: scall | scallions] and sesame seeds."
      }]
    },
    "asparagus-spaghetti": {
      date_made: "",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegetarian",
      name: "Asparagus Spaghetti + Egg",
      original_recipe: "https://www.easycheesyvegetarian.com/asparagus-spaghetti-fried-egg/",
      rating: "3.5/5",
      belongs_to: "main",
      slug: "asparagus-spaghetti",
      serves: "2",
      time: "00:25:00",
      ingredients: [{
        ingredient: "Spaghetti",
        quantity: "200",
        unit: "grams",
        id: "spag"
      }, {
        ingredient: "Butter",
        quantity: "1",
        unit: "tbsp",
        id: "but"
      }, {
        ingredient: "Garlic",
        quantity: "2",
        unit: "cloves",
        id: "garlic"
      }, {
        ingredient: "Asparagus (cut to 1-inch pieces)",
        quantity: "150",
        unit: "grams",
        id: "asparagus"
      }, {
        ingredient: "Salt/Pepper",
        quantity: "1",
        unit: "pinch",
        id: "sandp"
      }, {
        ingredient: "Parmesan",
        quantity: "2",
        unit: "tbsp",
        id: "parm"
      }, {
        ingredient: "Eggs",
        quantity: "2",
        unit: "",
        id: "eggs"
      }, {
        ingredient: "Pre-made pesto sauce",
        quantity: "",
        unit: "",
        id: ""
      }],
      instructions: [{
        original: "[&:00:10:00] Boil spaghetti until al dente. Around 10 minutes."
      }, {
        original: "[&:00:04:00] Melt [#: but | butter] in a frying pan and add [#: asparagus | asparagus]. Cook for a few minutes."
      }, {
        original: "Add the [#: garlic | garlic] and cook a little longer until the asparagus is tender with a bit of a crunch still. Season with salt and pepper."
      }, {
        original: "When the pasta is ready, drain and add the asparagus mixture and the pesto. Mix everything in and put a lit on to keep the heat in."
      }, {
        original: "Make two fried eggs. Plate the spaghetti and put the egg on top."
      }]
    },
    "thai-rice-bowl": {
      date_made: "[2019-10-07]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "Thai-Spice Rice Bowls",
      original_recipe: "https://cookieandkate.com/thai-spiced-rice-bowls-recipe/",
      rating: "3/5",
      serves: "6",
      belongs_to: "main",
      slug: "thai-rice-bowl",
      time: "00:40:00",
      ingredients: [{
        ingredient: "Olive oil",
        quantity: "1",
        unit: "tsp",
        id: "oil",
        group: "broth"
      }, {
        ingredient: "Red curry paste",
        quantity: "1",
        unit: "tbsp",
        id: "rcp",
        group: "broth"
      }, {
        ingredient: "Soy sauce",
        quantity: "1/4",
        unit: "cups",
        id: "soysauce",
        group: "broth"
      }, {
        ingredient: "Peanut butter",
        quantity: "1/4",
        unit: "cups",
        id: "pb",
        group: "broth"
      }, {
        ingredient: "Vegetable broth",
        quantity: "4",
        unit: "cups",
        id: "vegbroth",
        group: "broth"
      }, {
        ingredient: "Honey",
        quantity: "2",
        unit: "tbsp",
        id: "honey",
        group: "broth"
      }, {
        ingredient: "Coconut milk",
        quantity: "1 (14 oz)",
        unit: "can",
        id: "coco",
        group: "broth"
      }, {
        ingredient: "Garlic",
        quantity: "4",
        unit: "cloves",
        id: "garlic",
        group: "broth"
      }, {
        ingredient: "Ginger",
        quantity: "1",
        unit: "thumb-tip",
        id: "ginger",
        group: "broth"
      }, {
        ingredient: "Rice",
        quantity: "1",
        unit: "cups",
        id: "rice",
        group: ""
      }, {
        ingredient: "Carrots (matchsticked)",
        quantity: "1",
        unit: "cups",
        id: "carrots",
        group: ""
      }, {
        ingredient: "Peanuts",
        quantity: "1/4",
        unit: "cups",
        id: "peanuts",
        group: ""
      }, {
        ingredient: "Cucumber",
        quantity: "1/2",
        unit: "",
        id: "cucu",
        group: ""
      }, {
        ingredient: "Bell pepper (sliced)",
        quantity: "1",
        unit: "",
        id: "bell",
        group: ""
      }, {
        ingredient: "Green onions (sliced)",
        quantity: "2",
        unit: "",
        id: "gonion",
        group: ""
      }, {
        ingredient: "Jalapeno",
        quantity: "1",
        unit: "",
        id: "jalap",
        group: ""
      }, {
        ingredient: "Lime",
        quantity: "1",
        unit: "",
        id: "lime",
        group: ""
      }],
      instructions: [{
        original: "Make the [#: rice | rice]. Cook according to packaging."
      }, {
        original: "Prepare garnishes: matchstick the [#:carrots | carrots], thinly slice the [#: cucu | cucumber], slice the [#: jalap | jalapeno] into rings and chop the [#: peanuts | peanuts]."
      }, {
        original: "Broth pt. 1: heat saucepan with oil. Add [#: garlic | garlic] and [#: ginger | ginger] when hot, for 30 seconds."
      }, {
        original: "Broth pt. 2: Add [#: rcp | thai curry paste], [#: soysauce | soy sauce], [#: pb | peanut butter], [#: vegbroth | vegetable broth], [#: coco | coconut milk] and [#: honey | honey]."
      }, {
        original: "[&:00:10:00] Broth pt. 3: Bring to boil, reduce heat, simmer for 10 minutes."
      }, {
        original: "Put rice in bowls, add broth, add diced vegetables as garnish. Enjoy!"
      }]
    },
    "tofu-pineapple-rice": {
      date_made: "[2019-10-10]",
      ease_of_making: "3/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "Pineapple Salsa + Coconut Rice",
      original_recipe: "https://ohsheglows.com/2012/07/09/grilled-tofu-with-pineapple-salsa-and-coconut-rice/",
      rating: "3/5",
      serves: "2-3",
      belongs_to: "main",
      slug: "tofu-pineapple-rice",
      time: "00:50:00",
      ingredients: [{
        ingredient: "Olive oil",
        quantity: "",
        unit: "",
        id: "olive_oil",
        group: "tofu"
      }, {
        ingredient: "Bell pepper",
        quantity: "1",
        unit: "",
        id: "bell_pepper",
        group: "pineapple salsa"
      }, {
        ingredient: "Tofu (firm)",
        quantity: "1",
        unit: "package",
        id: "tofu",
        group: "tofu"
      }, {
        ingredient: "Salt",
        quantity: "",
        unit: "pinch",
        id: "salt",
        group: "tofu"
      }, {
        ingredient: "Shredded Coconut",
        quantity: "1/4",
        unit: "cups",
        id: "shredded_coconut",
        group: "coconut rice"
      }, {
        ingredient: "Brown rice",
        quantity: "1",
        unit: "cups",
        id: "brown_rice",
        group: "coconut rice"
      }, {
        ingredient: "Coconut milk",
        quantity: "1",
        unit: "can (400ml)",
        id: "coconut_milk",
        group: "coconut rice"
      }, {
        ingredient: "Brown Sugar",
        quantity: "2",
        unit: "tsp",
        id: "brown_sugar",
        group: "coconut rice"
      }, {
        ingredient: "Coconut oil",
        quantity: "1",
        unit: "tsp",
        id: "coconut_oil",
        group: "coconut rice"
      }, {
        ingredient: "Pineapple (diced)",
        quantity: "1+1/2",
        unit: "cups",
        id: "pineapple",
        group: "pineapple salsa"
      }, {
        ingredient: "Red onion (diced)",
        quantity: "1/4",
        unit: "cups",
        id: "red_onion",
        group: "pineapple salsa"
      }, {
        ingredient: "Jalapenos (seeded, diced)",
        quantity: "1",
        unit: "pepper",
        id: "jalapenos",
        group: "pineapple salsa"
      }, {
        ingredient: "Garlic (minced)",
        quantity: "1",
        unit: "clove",
        id: "garlic",
        group: "pineapple salsa"
      }, {
        ingredient: "Fresh lime juice",
        quantity: "3",
        unit: "tbsp",
        id: "lime_juice",
        group: "pineapple salsa"
      }, {
        ingredient: "Red pepper flakes",
        quantity: "1",
        unit: "dash",
        id: "red_pepper_flakes",
        group: "pineapple salsa"
      }],
      instructions: [{
        original: "[&:00:20:00] Press the [#: tofu | tofu] for about 20 minutes (put something heavy on it.)"
      }, {
        original: "[&:00:08:00] Preheat your oven for the coconut rice. 300F. Toast it for 8-12 minutes until golden brown."
      }, {
        original: "Go prep the salsa. Mix in bowl: diced [#: pineapple | pineapple], diced [#: red_onion | red onion], diced [#: jalapenos | jalapenos], [#: garlic | garlic], [#: bell_peppoer | peppers], [#: lime_juice | lime juice], [#: red_pepper_flakes | red pepper flakes]."
      }, {
        original: "[&:00:25:00] Make the rice, but with the [#: coconut_milk | coconut milk] (instead of water!). Mix the can with the rice, bring it to a boil and then cover with a lid for 20-25 minutes until it's tender."
      }, {
        original: "When rice is done, stir in some [#: brown_sugar | brown sugar] and, optionally, [#: coconut_oil | coconut oil]."
      }, {
        original: "Grill the tofu - use a BBQ or pan and heat the tofu for about 5 minutes on each side."
      }]
    },
    "pear-brie-salad": {
      belongs_to: "salad",
      date_made: "[2019-09-19]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegetarian",
      name: "Pear + Brie Salad",
      original_recipe: "https://www.theorganickitchen.org/pears-and-brie-salad-with-honey-champagne-vinaigrette/",
      rating: "5/5",
      serves: "2",
      slug: "pear-brie-salad",
      time: "00:30:00",
      ingredients: [{
        ingredient: "Broccoli",
        quantity: "2",
        unit: "cups",
        id: "broc",
        group: "salad"
      }, {
        ingredient: "Potatoes (chopped)",
        quantity: "1",
        unit: "cups",
        id: "potatoes",
        group: "salad"
      }, {
        ingredient: "Dill",
        quantity: "1",
        unit: "sprig",
        id: "dill",
        group: "salad"
      }, {
        ingredient: "Pears (sliced)",
        quantity: "2",
        unit: "",
        id: "pears",
        group: "salad"
      }, {
        ingredient: "Brie cheese",
        quantity: "4-6",
        unit: "slices",
        id: "cheese",
        group: "salad"
      }, {
        ingredient: "Cranberries",
        quantity: "1/3",
        unit: "cups",
        id: "cran",
        group: "salad"
      }, {
        ingredient: "Avocado",
        quantity: "1/2",
        unit: "",
        id: "avocado",
        group: "salad"
      }, {
        ingredient: "Pecans (chopped)",
        quantity: "1/3",
        unit: "cups",
        id: "pecans",
        group: "salad"
      }, {
        ingredient: "Olive oil",
        quantity: "1/2",
        unit: "cups",
        id: "oil-olive",
        group: "dressing"
      }, {
        ingredient: "Apple cider vinegar",
        quantity: "2",
        unit: "tsp",
        id: "vinegar-apple",
        group: "dressing"
      }, {
        ingredient: "Rice wine vinegar",
        quantity: "1/4",
        unit: "cups",
        id: "vinegar-rice-wine",
        group: "dressing"
      }, {
        ingredient: "Shallots (minced)",
        quantity: "1",
        unit: "tbsp",
        id: "shallots",
        group: "dressing"
      }, {
        ingredient: "Maple Syrup",
        quantity: "1",
        unit: "tbsp",
        id: "maple-syrup",
        group: "dressing"
      }, {
        ingredient: "Pepper",
        quantity: "1",
        unit: "pinch",
        id: "pepper",
        group: "dressing"
      }],
      instructions: [{
        original: "Preheat oven to 425."
      }, {
        original: "Add chopped [#: potatoes | potatoes] and [#: broc | broccoli] florets to bowl with [#: oil-olive | olive oil] and salt and pepper and [#: dill | dill]. Stir to coat."
      }, {
        original: "[&:00:12:00] Put contents of bowl on a baking sheet on parchment paper. Bake for 10-12 minutes."
      }, {
        original: "Prepare the dressing for the salad. Add the following to a container and whisk: [#: oil-olive | Olive oil], [#: vinegar-rice-wine | Rice wine vinegar], [#: shallots | shallots], [#: maple-syrup | maple syrup], [#: pepper | ground pepper]."
      }, {
        original: "Prepare the salad: Lightly apply the dressing to the greens. Arrange pear slices and brie on a plate. Drizzle with dressing. Add greens, cranberries, pecans, and extra slices of pear. Add a bit more dressing."
      }, {
        original: "Add the [#: potatoes | potatoes] and broccoli as a side or mixed with the salad."
      }]
    },
    "salad-raw-beet": {
      belongs_to: "salad",
      date_made: "[2019-09-24]",
      ease_of_making: "4/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG", "5.gif"],
      meal_type: "vegan",
      name: "Raw Beet Salad w/ Quinoa",
      original_recipe: "https://cookieandkate.com/raw-beet-salad-with-carrot-quinoa-spinach",
      rating: "4/5",
      serves: "2",
      slug: "salad-raw-beet",
      time: "00:50:00",
      ingredients: [{
        ingredient: "Quinoa",
        quantity: "1/2",
        unit: "cups",
        id: "quin",
        group: "salad"
      }, {
        ingredient: "Edamame",
        quantity: "1",
        unit: "cups",
        id: "eda",
        group: "salad"
      }, {
        ingredient: "Nuts (almonds, pecans, whatever)",
        quantity: "1/3",
        unit: "cups",
        id: "nuts",
        group: "salad"
      }, {
        ingredient: "A Beet (peeled)",
        quantity: "1",
        unit: "",
        id: "beet",
        group: "salad"
      }, {
        ingredient: "A Large carrot",
        quantity: "1",
        unit: "",
        id: "carrot",
        group: "salad"
      }, {
        ingredient: "Baby Spinach or Arugula",
        quantity: "2",
        unit: "cups",
        id: "greens",
        group: "salad"
      }, {
        ingredient: "Avocado (cubed)",
        quantity: "1",
        unit: "",
        id: "avo",
        group: "salad"
      }, {
        ingredient: "Apple Cider Vinegar",
        quantity: "3",
        unit: "tbsp",
        id: "vin",
        group: "dressing"
      }, {
        ingredient: "Lime Juice",
        quantity: "2",
        unit: "tbsp",
        id: "lime",
        group: "dressing"
      }, {
        ingredient: "Olive Oil",
        quantity: "2",
        unit: "tbsp",
        id: "oil",
        group: "dressing"
      }, {
        ingredient: "Maple Syrup",
        quantity: "2",
        unit: "tbsp",
        id: "syr",
        group: "dressing"
      }, {
        ingredient: "Dijon Mustard",
        quantity: "1",
        unit: "tsp",
        id: "dij",
        group: "dressing"
      }, {
        ingredient: "Salt, Pepper",
        quantity: "1",
        unit: "dash",
        id: "salt",
        group: "dressing"
      }],
      instructions: [{
        original: "[&:00:15:00] Cook the [#: quin | quinoa]: combine the quinoa with 1 cup of water. Bring to a boil, reduce heat and simmer for 15 minutes."
      }, {
        original: "[&:00:05:00] Cook the [#: eda | edamame]: bring a pot of water to boil, add the frozen edamame for 5 minutes. Drain and set aside."
      }, {
        original: "[&:00:05:00] Toast the [#: nuts | nuts] in a pan over medium heat until they are fragrant. About 5 minutes."
      }, {
        original: "Prepare the [#: beets | beets] and [#: carrot | carrots]: either chop finely or use a spiralizer to prepare the vegetables."
      }, {
        original: "Prepare the vinaigrette: whisk together [#: vin | apple cider vinegar], [#: lime | lime juice], [#: oil | olive oil], [#: syr |  maple syrup ], [#: dij | dijon mustard], and [#: salt | salt and pepper]."
      }, {
        original: "Apply the dressing, not too much - if you have a lot of salad, portion it out and store undressed leftovers and save the dressing for leftovers."
      }]
    },
    "black-bean-salad": {
      belongs_to: "salad",
      date_made: "[2019-10-03]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "Black Bean Salad",
      original_recipe: "https://cookieandkate.com/black-bean-salad-recipe/",
      rating: "5/5",
      serves: "4",
      slug: "black-bean-salad",
      time: "00:20:00",
      ingredients: [{
        ingredient: "Black beans",
        quantity: "3",
        unit: "Cans (15oz/each)",
        id: "beans"
      }, {
        ingredient: "Canned Corn",
        quantity: "1",
        unit: "cups",
        id: "corn"
      }, {
        ingredient: "Bell Pepper (any colour)",
        quantity: "1",
        unit: "",
        id: "pepper"
      }, {
        ingredient: "Cherry Tomatoes",
        quantity: "1",
        unit: "cups",
        id: "tomatoes"
      }, {
        ingredient: "Red Onion (diced)",
        quantity: "1",
        unit: "cups",
        id: "onion"
      }, {
        ingredient: "Jalapeno (seeds optional)",
        quantity: "1",
        unit: "",
        id: "jalap"
      }, {
        ingredient: "Lime Zest",
        quantity: "1/2",
        unit: "tsp",
        id: "lime-zest"
      }, {
        ingredient: "Lime juice",
        quantity: "2",
        unit: "tbsp",
        id: "lime-juice"
      }, {
        ingredient: "Olive oil",
        quantity: "1/4",
        unit: "cups",
        id: "oil"
      }, {
        ingredient: "White vinegar",
        quantity: "1/4",
        unit: "cups",
        id: "vin-wh"
      }, {
        ingredient: "Chili powder",
        quantity: "1/2",
        unit: "tsp",
        id: "chil"
      }, {
        ingredient: "Cumin",
        quantity: "1/2",
        unit: "tsp",
        id: "cumin"
      }, {
        ingredient: "Salt",
        quantity: "1/2",
        unit: "tsp",
        id: "salt"
      }, {
        ingredient: "Sliced Avocado (optional)",
        quantity: "1",
        unit: "",
        id: "avo"
      }],
      instructions: [{
        original: "In a large serving bowl combine all the ingredients."
      }, {
        original: "Cover and chill. Leftovers should last 3 to 4 days."
      }]
    },
    "marinated-tofu": {
      belongs_to: "side",
      date_made: "[2019-09-02]",
      ease_of_making: "5/5",
      imgs: ["false"],
      meal_type: "vegan",
      name: "Easy Marinated Tofu",
      original_recipe: "https://simpleveganblog.com/easy-marinated-tofu/",
      rating: "4/5",
      serves: "2",
      slug: "marinated-tofu",
      time: "00:25:00",
      ingredients: [{
        ingredient: "Tofu",
        quantity: "1",
        unit: "brick",
        id: "tofu",
        group: ""
      }, {
        ingredient: "Water",
        quantity: "1/4",
        unit: "cups",
        id: "water",
        group: ""
      }, {
        ingredient: "Soy Sauce",
        quantity: "2",
        unit: "tbsp",
        id: "sauce-soy",
        group: ""
      }, {
        ingredient: "Maple syrup",
        quantity: "1",
        unit: "tbsp",
        id: "maple-syrup",
        group: ""
      }, {
        ingredient: "Apple cider vinegar",
        quantity: "1",
        unit: "tbsp",
        id: "vinegar-apple-cider",
        group: ""
      }, {
        ingredient: "Garlic powder",
        quantity: "1",
        unit: "tsp",
        id: "powder-garlic",
        group: ""
      }],
      instructions: [{
        original: "[&:00:20:00] Press the [#: tofu | tofu] for a while (around 20 minutes). Then dice/cube it."
      }, {
        original: "Mix the marinade ingredients in a bowl."
      }, {
        original: "[&:00:15:00] Put the tofu in the bowl and cover. Put it in the fridge for 15 min."
      }, {
        original: "Take the tofu out and pan fry until golden brown."
      }]
    },
    "miso-asparagus": {
      belongs_to: "side",
      date_made: "[2019-10-01]",
      ease_of_making: "4/5",
      imgs: ["1.JPG", "2.JPG", "3.gif"],
      meal_type: "vegan",
      name: "Miso Asparagus",
      original_recipe: "https://www.bonappetit.com/recipe/ginger-miso-grilled-asparagus",
      rating: "2.5/5",
      serves: "2",
      slug: "miso-asparagus",
      time: "00:30:00",
      ingredients: [{
        ingredient: "Mirin",
        quantity: "1/4",
        unit: "cups",
        id: "mirin"
      }, {
        ingredient: "Miso",
        quantity: "1/4",
        unit: "cups",
        id: "miso"
      }, {
        ingredient: "Rice Wine Vinegar",
        quantity: "2",
        unit: "tbsp",
        id: "rwv"
      }, {
        ingredient: "Ginger - peeled and grated",
        quantity: "2",
        unit: "tsp",
        id: "ginger"
      }, {
        ingredient: "Asparagus",
        quantity: "2",
        unit: "bunches",
        id: "asp"
      }, {
        ingredient: "Lime wedges",
        quantity: "4",
        unit: "",
        id: "lime"
      }, {
        ingredient: "Scallions (Green onions)",
        quantity: "1/4",
        unit: "cups",
        id: "scall"
      }, {
        ingredient: "Sesame Seeds",
        quantity: "",
        unit: "sprinkle",
        id: "seeds"
      }, {
        ingredient: "",
        quantity: "",
        unit: "",
        id: ""
      }],
      instructions: [{
        original: "Prepare a grill to heat."
      }, {
        original: "Whisk [#: mirin |  mirin ], [#: miso | miso], [#: rwv | vinegar], [#: ginger | ginger], in a small bowl."
      }, {
        original: "Place [#: asp | asparagus] in a container and pour miso mixture over. Toss to coat."
      }, {
        original: "Let things stew a few minutes. Cut the [#: scall | scallions]."
      }, {
        original: "[&:00:04:00] Grill asparagus (or put it in a pan if you don't have a grill), turning occasionally until charred on all sides. About 4 minutes."
      }, {
        original: "Transfer to plate, squeeze [#: lime | lime juice] and top with scallions and sesame seeds."
      }]
    },
    "granola-bars": {
      belongs_to: "snack",
      date_made: "[2019-09-01]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "1.gif"],
      meal_type: "vegan",
      name: "5 Ingredient Granola Bars",
      original_recipe: "https://minimalistbaker.com/healthy-5-ingredient-granola-bars/",
      rating: "5/5",
      serves: "10 bars",
      slug: "granola-bars",
      time: "00:25:00",
      ingredients: [{
        ingredient: "Dates (Deglet noor or medjool)",
        quantity: "1",
        unit: "cups",
        id: "dates",
        group: ""
      }, {
        ingredient: "Maple Syrup (or: agava nectar, honey)",
        quantity: "1/4",
        unit: "cups",
        id: "maple-syrup",
        group: ""
      }, {
        ingredient: "Natural Peanut Butter",
        quantity: "1/4",
        unit: "cups",
        id: "peanut-butter",
        group: ""
      }, {
        ingredient: "Roasted, unsalted almonds",
        quantity: "1",
        unit: "cups",
        id: "almonds",
        group: ""
      }, {
        ingredient: "Rolled Oats",
        quantity: "1+1/2",
        unit: "cups",
        id: "oats-rolled",
        group: ""
      }, {
        ingredient: "Parchment Paper",
        quantity: "",
        unit: "",
        id: "parchment-paper",
        group: ""
      }, {
        ingredient: "8x8 Baking Pan",
        quantity: "",
        unit: "",
        id: "",
        group: ""
      }],
      instructions: [{
        original: "Chop [#: almonds | almonds] roughly. Put them in a bowl."
      }, {
        original: "Put [#: oats-rolled | oats] in the bowl."
      }, {
        original: "Blend [#: dates | dates] until dough-y. Put them in the bowl"
      }, {
        original: "Put [#: maple-syrup | maple syrup] and [#: peanut-butter | peanut-butter] into a saucepan and heat on low. Stir to combine."
      }, {
        original: "Pour mix into the bowl and stir to combine."
      }, {
        original: "Transfer to a baking dish (8 x 8) lined with parchment paper."
      }]
    },
    "candied-ginger": {
      belongs_to: "sweet",
      date_made: "[2019-09-02]",
      ease_of_making: "2/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      name: "Candied Ginger",
      meal_type: "vegan",
      original_recipe: "https://www.davidlebovitz.com/candied-ginger/",
      rating: "4/5",
      serves: "one jar! (roughly)",
      slug: "candied-ginger",
      time: "04:00:00",
      ingredients: [{
        ingredient: "Ginger",
        quantity: "1",
        unit: "lbs",
        id: "ginger",
        group: ""
      }, {
        ingredient: "White Sugar",
        quantity: "4",
        unit: "cups",
        id: "sugar-white",
        group: ""
      }, {
        ingredient: "Water",
        quantity: "4",
        unit: "cups",
        id: "water",
        group: ""
      }, {
        ingredient: "Salt",
        quantity: "1",
        unit: "pinch",
        id: "salt",
        group: ""
      }],
      instructions: [{
        original: "Peel the [#: ginger | ginger]."
      }, {
        original: "Slice the ginger thinly."
      }, {
        original: "Put ginger into a pot, cover with water. Bring water to a boil."
      }, {
        original: "[&:00:10:00] Reduce heat and simmer for 10 minutes."
      }, {
        original: "Repeat the previous step."
      }, {
        original: "Mix the [#: sugar-white | sugar], [#: water | water], [#: salt | salt] and ginger slices in the pot. Cook until the temperature reaches 225F (106C). A candy thermometer is very helpful, but otherwise, you can estimate cooking for 40 to 60 min."
      }, {
        original: "[&:01:00:00] Remove from heat. Let stand for one hour."
      }, {
        original: "Drain the ginger through a colander, catch the syrup."
      }, {
        original: "Toss drained ginger in sugar."
      }, {
        original: "Shake off excess sugar, and spread the ginger slices on a baking sheet or cooling rack until they are somewhat dry."
      }]
    },
    "pumpkin-chiffon-pie": {
      belongs_to: "sweet",
      date_made: "[2019-10-14]",
      ease_of_making: "3/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegetarian",
      name: "Pumpkin Chiffon Pie",
      original_recipe: "-",
      rating: "4/5",
      serves: "1 pie",
      slug: "pumpkin-chiffon-pie",
      time: "01:00:00",
      ingredients: [{
        ingredient: "Whipping cream",
        quantity: "1",
        unit: "cups",
        id: "wc",
        group: "Creamy filling"
      }, {
        ingredient: "Icing sugar",
        quantity: "3/4",
        unit: "cups",
        id: "is",
        group: "Creamy filling"
      }, {
        ingredient: "Vanilla",
        quantity: "1/2",
        unit: "tsp",
        id: "van",
        group: "Creamy filling"
      }, {
        ingredient: "Cinnamon",
        quantity: "1/2",
        unit: "tsp",
        id: "cin",
        group: "Creamy filling"
      }, {
        ingredient: "Plain Gelatin",
        quantity: "1~",
        unit: "tbsp",
        id: "gelatin",
        group: "Pumpkin filling"
      }, {
        ingredient: "Cold Water",
        quantity: "1/4",
        unit: "cups",
        id: "water",
        group: "Pumpkin filling"
      }, {
        ingredient: "Eggs",
        quantity: "3",
        unit: "",
        id: "eggs",
        group: "Pumpkin filling"
      }, {
        ingredient: "White sugar",
        quantity: "1/3",
        unit: "cups",
        id: "ws",
        group: "Pumpkin filling"
      }, {
        ingredient: "Cinnamon",
        quantity: "1",
        unit: "tsp",
        id: "cin2",
        group: "Pumpkin filling"
      }, {
        ingredient: "Ginger",
        quantity: "1/4",
        unit: "tsp",
        id: "ginger",
        group: "Pumpkin filling"
      }, {
        ingredient: "Salt",
        quantity: "1/2",
        unit: "tsp",
        id: "salt",
        group: "Pumpkin filling"
      }, {
        ingredient: "Allspice",
        quantity: "1/2",
        unit: "tsp",
        id: "allspice",
        group: "Pumpkin filling"
      }, {
        ingredient: "Canned pumpkin",
        quantity: "1+1/4",
        unit: "cups",
        id: "pumpkin",
        group: "Pumpkin filling"
      }, {
        ingredient: "Milk",
        quantity: "1/2",
        unit: "cups",
        id: "milk",
        group: "Pumpkin filling"
      }, {
        ingredient: "Icing sugar",
        quantity: "1/4",
        unit: "cups",
        id: "icsug",
        group: "Pumpkin filling"
      }, {
        ingredient: "Pre-made crust shell",
        quantity: "",
        unit: "",
        id: "",
        group: "Crust"
      }],
      instructions: [{
        original: "Prepare the pie shell based on its package instructions. They should outline how long to bake the shell without a filling but if not - bake for 8-10 minutes at 425c."
      }, {
        original: "Start with the pumpkin filling. Add the [#: gelatin | gelatin] to a bowl of cold water."
      }, {
        original: "Split the egg yolks and whites between 2 large bowls. Beat the yolks."
      }, {
        original: "Mix together the [#: ws | white sugar], [#: salt | salt] and spices, then mix that into the bowl with beaten yolks."
      }, {
        original: "Add in the [#: pumpkin | canned pumpkin] and [#: milk | milk], then mix some more."
      }, {
        original: "Add the mixture to a big pot and cook over moderate heat, stirring frequently until it boils."
      }, {
        original: "Let it boil for about a minute then remove from heat."
      }, {
        original: "Stir in the bowl of gelatin until its dissolved, then let the filling cool until it thickens a bit."
      }, {
        original: "With the bowl of egg whites, use a beater and slowly sift in the [#: icsug | icing sugar]. It should start to thicken and ideally look a bit like whipped cream."
      }, {
        original: "Add in the pumpkin mix, folding it into the egg white sugar mix."
      }, {
        original: "Next, prepare the cream filling by pouring the [#: wc | whipping cream] into a fresh bowl."
      }, {
        original: "Whip the cream til it thickens then sift in the icing sugar, and add [#: van | vanilla] and [#: cin2 | cinnamon]. Keep this in the fridge until it’s needed."
      }, {
        original: "Fill the pie! Layer the 2 fillings starting with half of the pumpkin, then half of the cream, then the rest of the pumpkin."
      }, {
        original: "Put in the fridge for at least 2 hours."
      }, {
        original: "When you’re ready to eat, top it with the rest of the cream."
      }]
    },
    "mediterranean-baked-sweet-potatoes": {
      belongs_to: "main",
      date_made: "[2019-11-11]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "Mediterranean Baked Sweet Potatoes",
      original_recipe: "https://minimalistbaker.com/mediterranean-baked-sweet-potatoes/",
      rating: "5/5",
      serves: "2",
      slug: "mediterranean-baked-sweet-potatoes",
      time: "01:00:00",
      ingredients: [{
        ingredient: "Sweet Potato",
        quantity: "2",
        unit: "",
        id: "sw",
        group: "Main"
      }, {
        ingredient: "Chickpeas",
        quantity: "15",
        unit: "oz",
        id: "chick",
        group: "Main"
      }, {
        ingredient: "Olive Oil",
        quantity: "1/2",
        unit: "tbsp",
        id: "oil",
        group: "Main"
      }, {
        ingredient: "Cumin",
        quantity: "1/2",
        unit: "tsp",
        id: "cumin",
        group: "Main"
      }, {
        ingredient: "Coriander",
        quantity: "1/2",
        unit: "tsp",
        id: "cor",
        group: "Main"
      }, {
        ingredient: "Cinnamon",
        quantity: "1/2",
        unit: "tsp",
        id: "cin",
        group: "Main"
      }, {
        ingredient: "Paprika",
        quantity: "l",
        unit: "tsp",
        id: "pap",
        group: "Main"
      }, {
        ingredient: "Hummus",
        quantity: "1/4",
        unit: "cup",
        id: "hum",
        group: "Garlic Herb Sauce"
      }, {
        ingredient: "Dried Dill",
        quantity: "1",
        unit: "tsp",
        id: "dill",
        group: "Garlic Herb Sauce"
      }, {
        ingredient: "Garlic",
        quantity: "3",
        unit: "cloves",
        id: "garlic",
        group: "Garlic Herb Sauce"
      }, {
        ingredient: "Lemon",
        quantity: "1/2",
        unit: "lemon",
        id: "lem",
        group: "Garlic Herb Sauce"
      }, {
        ingredient: "Water",
        quantity: "",
        unit: "splash",
        id: "water",
        group: "Garlic Herb Sauce"
      }, {
        ingredient: "Salt",
        quantity: "",
        unit: "pinch",
        id: "salt",
        group: "Garlic Herb Sauce"
      }, {
        ingredient: "Cherry Tomatoes",
        quantity: "1/4",
        unit: "cup",
        id: "tomat",
        group: "Toppings"
      }, {
        ingredient: "Chopped Cilantro",
        quantity: "1/4",
        unit: "cup",
        id: "cil",
        group: "Toppings"
      }, {
        ingredient: "Lemon Juice",
        quantity: "2",
        unit: "tbsp",
        id: "lemju",
        group: "Toppings"
      }, {
        ingredient: "Chili Garlic Sauce",
        quantity: "",
        unit: "pinch",
        id: "chilsauce",
        group: "Toppings"
      }],
      instructions: [{
        original: "Preheat oven to 400 degrees. Line a large baking sheet with foil."
      }, {
        original: "Rinse potatoes and cut in half. Coat sweet potatoes with olive oil and put them face down on the foil."
      }, {
        original: "Drain [#: chick | chickpeas]. Toss in [#: oil | olive oil]. Add spices. 1/2 tsp of: cumin, coriander, cinnamon, smoked paprika."
      }, {
        original: "[&:00:45:00] Put potato and chickpeas in the oven."
      }, {
        original: "Create the sauce while things are in the oven. Mix: [#: hum | hummus], [#: lem | lemon juice], [#: garlic | garlic], [#: dill | dill] water and salt."
      }, {
        original: "Chop [#: tomat | tomatoes] and [#: cil | cilantro] and put in a bowl with [#: lemju | lemon juice]. Let it sit and marinade."
      }, {
        original: "Serve up: take out potatoes, and mash them open a bit. Top with roasted chickpeas, sauce, and cilantro and tomatoes. Serve quickly!"
      }]
    },
    "chickpea-cauliflower-curry": {
      belongs_to: "main",
      date_made: "[2019-11-12]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "Chickpea Cauliflower Curry",
      original_recipe: "https://minimalistbaker.com/1-pot-yellow-chickpea-cauliflower-curry/",
      rating: "4/5",
      serves: "2",
      slug: "chickpea-cauliflower-curry",
      time: "00:45:00",
      ingredients: [{
        ingredient: "Coconut oil",
        quantity: "2",
        unit: "tbsp",
        id: "coco",
        group: "Curry"
      }, {
        ingredient: "Shallot",
        quantity: "1/3",
        unit: "cups",
        id: "shal",
        group: "Curry"
      }, {
        ingredient: "Garlic",
        quantity: "4",
        unit: "cloves",
        id: "gar",
        group: "Curry"
      }, {
        ingredient: "Ginger",
        quantity: "2",
        unit: "tbsp",
        id: "gin",
        group: "Curry"
      }, {
        ingredient: "Jalapeno pepper",
        quantity: "1",
        unit: "",
        id: "ja",
        group: "Curry"
      }, {
        ingredient: "Curry paste",
        quantity: "4",
        unit: "tbsp",
        id: "cur",
        group: "Curry"
      }, {
        ingredient: "Coconut milk",
        quantity: "2",
        unit: "cups",
        id: "comilk",
        group: "Curry"
      }, {
        ingredient: "Turmeric",
        quantity: "1",
        unit: "tsp",
        id: "tur",
        group: "Curry"
      }, {
        ingredient: "Maple Syrup",
        quantity: "1",
        unit: "tbsp",
        id: "mapsyr",
        group: "Curry"
      }, {
        ingredient: "Soy Sauce",
        quantity: "2",
        unit: "tbsp",
        id: "soysauce",
        group: "Curry"
      }, {
        ingredient: "Cauliflower",
        quantity: "1",
        unit: "cups",
        id: "caul",
        group: "Curry"
      }, {
        ingredient: "Chickpeas",
        quantity: "1+1/4",
        unit: "cups",
        id: "chick",
        group: "Curry"
      }, {
        ingredient: "Quinoa/Rice",
        quantity: "1",
        unit: "cups",
        id: "quin",
        group: "Base"
      }, {
        ingredient: "Avocado",
        quantity: "1",
        unit: "",
        id: "",
        group: "Toppings"
      }, {
        ingredient: "Red onion",
        quantity: "1/2",
        unit: "onion",
        id: "",
        group: "Toppings"
      }],
      instructions: [{
        original: "[&:00:03:00] Heat a large pot. Add [#: coco | Coconut oil]. Add [#: shal | shallot] [#: gar | garlic] and [#: gin | ginger] [#: ja | jalapeno pepper]. Sauté for 2-3 minutes."
      }, {
        original: "[&:00:02:00] Add [#: cur | curry paste]. Cook for 2 minutes."
      }, {
        original: "Add [#: comilk | coconut milk] [#: tur | turmeric] [#: mapsyr | maple syrup] [#: soysauce | Soy Sauce]  and stir. Bring to simmer over medium heat."
      }, {
        original: "Once simmering, add [#: caul | cauliflower] and [#: chick | chickpeas]."
      }, {
        original: "[&:00:10:00] Cover and cook for 10-15 minutes. Keep at a simmer."
      }, {
        original: "Make quinoa or rice according to package instructions."
      }, {
        original: "Serve curry over quinoa. Top with slice avocado and red onion."
      }]
    },
    "overnight-oats": {
      belongs_to: "breakfast",
      date_made: "[2019-11-12]",
      ease_of_making: "5/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegan",
      name: "Overnight Oats",
      original_recipe: "https://ohsheglows.com/2015/07/22/vegan-overnight-oats/",
      rating: "5/5",
      serves: "2",
      slug: "overnight-oats",
      time: "00:10:00",
      ingredients: [{
        ingredient: "Ripe / Spotty Bananas",
        quantity: "2",
        unit: "",
        id: "ban",
        group: ""
      }, {
        ingredient: "Chia Seeds",
        quantity: "4",
        unit: "tbsp",
        id: "chia",
        group: ""
      }, {
        ingredient: "Cinnamon",
        quantity: "1/2",
        unit: "tsp",
        id: "cin",
        group: ""
      }, {
        ingredient: "Almond Milk",
        quantity: "1+1/2",
        unit: "cups",
        id: "almilk",
        group: ""
      }, {
        ingredient: "Oats",
        quantity: "1",
        unit: "cups",
        id: "oats",
        group: ""
      }, {
        ingredient: "Vanilla Extract",
        quantity: "1/2",
        unit: "tsp",
        id: "van",
        group: ""
      }, {
        ingredient: "Fresh fruit",
        quantity: "Optional",
        unit: "",
        id: "",
        group: ""
      }],
      instructions: [{
        original: "In a bowl, mash [#: ban | bananas] until smooth. Stir in [#: chia | chia seeds] and [#: cin | cinnamon] to combine."
      }, {
        original: "Stir in [#: oats | oats], [#: almilk | almond milk] and [#: van | vanilla extract] (optional)."
      }, {
        original: "Cover and refrigerate overnight."
      }, {
        original: "In the morning, stir the oats. Distribute into bowls and add fresh fruit."
      }]
    },
    "orange-orzo-salad": {
      belongs_to: "salad",
      date_made: "[2019-11-13]",
      ease_of_making: "4/5",
      imgs: ["1.JPG", "2.JPG", "3.JPG"],
      meal_type: "vegetarian",
      name: "Orange Orzo Salad",
      original_recipe: "https://ohsheglows.com/2015/07/22/vegan-overnight-oats/",
      rating: "5/5",
      serves: "2",
      slug: "orange-orzo-salad",
      time: "00:30:00",
      ingredients: [{
        ingredient: "Orzo Pasta",
        quantity: "1",
        unit: "cups",
        id: "orzo",
        group: "Salad"
      }, {
        ingredient: "Almonds",
        quantity: "1/2",
        unit: "cups",
        id: "al",
        group: "Salad"
      }, {
        ingredient: "Chopped Parsley",
        quantity: "1",
        unit: "cups",
        id: "par",
        group: "Salad"
      }, {
        ingredient: "Pitted Kalamata Olives",
        quantity: "1/2",
        unit: "cups",
        id: "oli",
        group: "Salad"
      }, {
        ingredient: "Chopped Green onion",
        quantity: "1/2",
        unit: "cups",
        id: "go",
        group: "Salad"
      }, {
        ingredient: "Raisins",
        quantity: "1/2",
        unit: "cups",
        id: "rai",
        group: "Salad"
      }, {
        ingredient: "Feta (optional)",
        quantity: "1/2",
        unit: "cups",
        id: "feta",
        group: "Salad"
      }, {
        ingredient: "Orange Zest",
        quantity: "1",
        unit: "tsp",
        id: "zest",
        group: "Dressing"
      }, {
        ingredient: "Fresh Orange Juice",
        quantity: "1-2",
        unit: "oranges",
        id: "orange",
        group: "Dressing"
      }, {
        ingredient: "Olive oil",
        quantity: "1/4",
        unit: "cups",
        id: "oil",
        group: "Dressing"
      }, {
        ingredient: "White wine vinegar",
        quantity: "2",
        unit: "tbsp",
        id: "vin",
        group: "Dressing"
      }, {
        ingredient: "Minced Garlic",
        quantity: "1",
        unit: "clove",
        id: "gar",
        group: "Dressing"
      }, {
        ingredient: "Salt",
        quantity: "1/4",
        unit: "tsp",
        id: "sel",
        group: "Dressing"
      }],
      instructions: [{
        original: "Bring a large pot of water to poil. Cook the [#: orzo | orzo] according to package instructions. When draining, reserve 1/2 cup of pasta water. Run the orzo under cold water after draining."
      }, {
        original: "Toast the [#: al | almonds] for about 5 minutes until fragrant. Transfer to a cutting board and chop them."
      }, {
        original: "In a large bowl combine the [#: orzo | orzo], [#: al | almonds], [#: par | parsley] [#: ol | olives] [#: go | green onions] [#: rai | raisins] and [#: feta | feta] if you are using it."
      }, {
        original: "In a bowl prepare the dressing: combine [#: zest | orange zest] [#: orange | orange juice] [#: oil | olive oil] [#: vin | vinegar] [#: gar | garlic] and [#: sel | salt]. Add 1/4 cup of the pasta cooking water and whisk until blended."
      }, {
        original: "[&:00:10:00] Pour the dressing on the salad and toss to combine. Leave for 10 minutes. Season with salt if necessary."
      }]
    },
    ratatouille: {
      belongs_to: "main",
      date_made: "[2019-11-14]",
      ease_of_making: "4/5",
      imgs: ["1.JPG", "2.gif", "3.JPG"],
      meal_type: "vegan",
      name: "Ratatouille",
      original_recipe: "https://cookieandkate.com/best-ratatouille-recipe/#tasty-recipes-34476",
      rating: "4/5",
      serves: "4",
      slug: "ratatouille",
      time: "01:20:00",
      ingredients: [{
        ingredient: "Large tomatoes",
        quantity: "4",
        unit: "",
        id: "tomat",
        group: ""
      }, {
        ingredient: "Eggplant (cubed)",
        quantity: "1",
        unit: "",
        id: "egg",
        group: ""
      }, {
        ingredient: "Bell pepper (diced)",
        quantity: "1",
        unit: "",
        id: "pep",
        group: ""
      }, {
        ingredient: "Zucchini (cubed)",
        quantity: "1",
        unit: "",
        id: "zuk",
        group: ""
      }, {
        ingredient: "Yellow Squash (cubed)",
        quantity: "1",
        unit: "",
        id: "ysqu",
        group: ""
      }, {
        ingredient: "Olive oil",
        quantity: "6",
        unit: "",
        id: "oil",
        group: ""
      }, {
        ingredient: "Salt",
        quantity: "1/4",
        unit: "tsp",
        id: "salt",
        group: ""
      }, {
        ingredient: "Yellow onion (chopped)",
        quantity: "1",
        unit: "",
        id: "onion",
        group: ""
      }, {
        ingredient: "Garlic (minced)",
        quantity: "4",
        unit: "",
        id: "gar",
        group: ""
      }, {
        ingredient: "Basil  (chopped)",
        quantity: "1/4",
        unit: "cups",
        id: "bas",
        group: ""
      }, {
        ingredient: "Red pepper flakes",
        quantity: "1/4",
        unit: "tsp",
        id: "flakes",
        group: ""
      }, {
        ingredient: "Dried oregano",
        quantity: "1/4",
        unit: "tsp",
        id: "oreg",
        group: ""
      }, {
        ingredient: "Ground pepper",
        quantity: "",
        unit: "",
        id: "",
        group: ""
      }, {
        ingredient: "Cheese grater/blender",
        quantity: "",
        unit: "",
        id: "",
        group: ""
      }],
      instructions: [{
        original: "Preheat oven to 425F. Line two large baking sheets with parchment paper."
      }, {
        original: "Prepare tomatoes by coring them and grate them on a cheeze grater with large holes or blend them to a frothy pulp."
      }, {
        original: "Put [#: egg | cubed eggplant] on baking sheet in a single layer and coat with olive oil. Sprink with salt. Set aside."
      }, {
        original: "Put [#: zuk | zuchini] and [#: ysqu | yellow squash] on baking sheet. Add 1 tbsp of olive oil. Add 1/4 tsp of salt."
      }, {
        original: "[&:00:15:00] Put eggplant in middle rack and vegetable on top rack in the oven. Set timer for 15 minutes."
      }, {
        original: "[&:00:10:00]  Warm 2 tbsp of olive oil in a dutch oven over medium heat. Add [#: onion | yellow onion] and [#: salt | salt]. Cook, stirring occasionally, until onion is tender. About 8 to 10 minutes."
      }, {
        original: "Add [#: gar | garlic] to dutch oven, about 30 seconds until fragrant. Add [#: tomat | tomatoes ] and use a wooden spoon or spatula to stir. Reduce to gentle simmer."
      }, {
        original: "[&:00:10:00] When eggplant and friends are done in the oven, take them out, stir around, and put back in, this time switching the racks they are on. Bake for another 10 minutes then remove the eggplant and put it in the dutch oven mix."
      }, {
        original: "[&:00:05:00] Let the squash keep on baking in the oven. Then take it out and put it in the dutch oven for another five minutes."
      }, {
        original: "Remove the dutch oven from the heat. Stir in a teaspoon olive oil, [#: bas | chopped basil] and [#: flakes | Red pepper flakes]. Crumble [#: oreg | dried oregano] into the pot. Season with salt and pepper (if you feel like it)."
      }, {
        original: "Serve it up! Put it in bowls, drizzle with olive oil. Let it cool. It should last a few days. Maybe add some bread as a side."
      }]
    },
    "avo-kimchi-egg-toast": {
      belongs_to: "breakfast",
      date_made: "[2019-11-15]",
      ease_of_making: "5/5",
      imgs: ["1.jpg", "2.jpg"],
      meal_type: "vegetarian",
      name: "Kimchi Avocado Egg on Toast",
      original_recipe: "?",
      rating: "3.5/5",
      serves: "1",
      slug: "avo-kimchi-egg-toast",
      time: "00:15:00",
      ingredients: [{
        ingredient: "Kimchi",
        quantity: "1/4",
        unit: "cups",
        id: "kim"
      }, {
        ingredient: "Shallot",
        quantity: "1",
        unit: "shallot",
        id: "shal"
      }, {
        ingredient: "Garlic",
        quantity: "1",
        unit: "clove",
        id: "garlic"
      }, {
        ingredient: "Bread (sourdough)",
        quantity: "1",
        unit: "slice",
        id: "bread"
      }, {
        ingredient: "Avocado",
        quantity: "1/2",
        unit: "",
        id: "avo"
      }, {
        ingredient: "Egg (poached)",
        quantity: "1",
        unit: "",
        id: "egg"
      }, {
        ingredient: "Paprika",
        quantity: "1/4",
        unit: "tsp",
        id: "pap"
      }, {
        ingredient: "Salt",
        quantity: "1",
        unit: "pinch",
        id: "salt"
      }],
      instructions: [{
        original: "Dice [#: shal | shallot], mince [#: garlic | garlic] and chop [#: kim | kimchi]."
      }, {
        original: "Bring a pot of water to boil to poach your egg."
      }, {
        original: "[&:00:02:00] Melt butter in pan on medium until hot enough to sizzle a bit of shallot. Put [#: shal | shallot] in for 2 minutes."
      }, {
        original: "[&:00:01:00] Add prepared garlic and sauté for another minute."
      }, {
        original: "[&:00:05:00] Add kimchi and sauté for about five minutes while you poach the egg."
      }, {
        original: "[&:00:04:00] Crack egg into boiling water and leave for 4 minutes. Keep an eye that it doesn't overflow."
      }, {
        original: "Toast the bread."
      }, {
        original: "Pull it all together: mush [#: avo | avocado] on top of bread. Add a sprinkle of salt. Add garlic, shallot, kimchi mix on top of avocado. Add poached egg on top. Sprinkle with [#: pap | paprika]."
      }]
    },
    "tofu-kimchi-stew": {
      belongs_to: "main",
      date_made: "[2019-11-15]",
      ease_of_making: "5/5",
      imgs: ["1.jpg", "2.jpg", "3.jpg"],
      meal_type: "vegan",
      name: "Tofu Kimchi Stew",
      original_recipe: "https://www.bonappetit.com/recipe/tofu-and-kimchi-stew",
      rating: "3.5/5",
      serves: "2",
      slug: "tofu-kimchi-stew",
      tags: "easy, quick, korean, stew, spicey",
      time: "00:25:00",
      ingredients: [{
        ingredient: "Olive oil",
        quantity: "",
        unit: "",
        id: ""
      }, {
        ingredient: "Green onions",
        quantity: "6",
        unit: "",
        id: "go"
      }, {
        ingredient: "Garlic",
        quantity: "4",
        unit: "cloves",
        id: "gar"
      }, {
        ingredient: "Ginger",
        quantity: "1",
        unit: "1-inch piece",
        id: "ging"
      }, {
        ingredient: "Vegetable broth",
        quantity: "4",
        unit: "cups",
        id: "vegbro"
      }, {
        ingredient: "Gochujang",
        quantity: "3",
        unit: "tbsp",
        id: "gochu"
      }, {
        ingredient: "Soy sauce",
        quantity: "3",
        unit: "tbsp",
        id: "soy"
      }, {
        ingredient: "Daikon (or Radish)",
        quantity: "1",
        unit: "",
        id: "sliced"
      }, {
        ingredient: "Kimchi",
        quantity: "1/2",
        unit: "cups",
        id: ""
      }, {
        ingredient: "Silken Tofu",
        quantity: "1/2",
        unit: "block",
        id: "silk"
      }],
      instructions: [{
        original: "Heat oil in large saucepan on high."
      }, {
        original: "[&:00:03:00] Cook white and pale-green parts of green onions. Save the green ends. Add in the [#: gar | garlic] and [#: ging | ginger]. Stir often, about 3 minutes"
      }, {
        original: "Add [#: vegbro | broth]. Whisk in [#: go | gochujang] and [#: soy | soy sauce]."
      }, {
        original: "[&:00:15:00] Add daikon (or radish if you don't have daikon). Simmer for 15-20 minutes."
      }, {
        original: "Add kimchi and tofu. Simmer until tofu is heated through."
      }, {
        original: "Divide among bowls, add thinly sliced green onion on top."
      }]
    },
    "lime-rice-noodles": {
      belongs_to: "main",
      date_made: "[2019-11-22]",
      ease_of_making: "?/5",
      imgs: ["1.jpg", "2.gif", "3.jpg"],
      meal_type: "vegan",
      name: "Lime-Rice Noodles with Tofu",
      original_recipe: "https://www.delish.com/cooking/recipe-ideas/a29215487/cilantro-lime-noodles-with-shrimp-recipe/",
      rating: "?/5",
      serves: "4",
      slug: "lime-rice-noodles",
      tags: "creamy, acidy",
      time: "00:35:00",
      ingredients: [{
        ingredient: "Tofu (firm)",
        quantity: "1",
        unit: "package",
        id: "tofu"
      }, {
        ingredient: "Garlic (minced)",
        quantity: "2",
        unit: "cloves",
        id: "garlic"
      }, {
        ingredient: "Ginger (minced)",
        quantity: "1",
        unit: "inch-piece",
        id: "ginger"
      }, {
        ingredient: "Bell pepper (sliced)",
        quantity: "1",
        unit: "",
        id: "bellpep"
      }, {
        ingredient: "Green onions (chopped)",
        quantity: "2",
        unit: "",
        id: "greenonion"
      }, {
        ingredient: "Coconut milk",
        quantity: "1",
        unit: "can (14oz)",
        id: "cocomilk"
      }, {
        ingredient: "Soy sauce",
        quantity: "2",
        unit: "tbsp",
        id: "soy"
      }, {
        ingredient: "Brown sugar",
        quantity: "2",
        unit: "tsp (packed)",
        id: "sugar"
      }, {
        ingredient: "Rice stir-fry noodles",
        quantity: "12",
        unit: "oz",
        id: "rice-noodles"
      }, {
        ingredient: "Lime juice",
        quantity: "3",
        unit: "tbsp",
        id: "lime"
      }, {
        ingredient: "Chili garlic sauce",
        quantity: "1",
        unit: "tbsp",
        id: "cgs"
      }, {
        ingredient: "Cilantro",
        quantity: "1/3",
        unit: "cups",
        id: "cilantro"
      }, {
        ingredient: "Kosher Salt",
        quantity: "",
        unit: "",
        id: ""
      }],
      instructions: [{
        original: "Press tofu to remove water. Cube, and marinate."
      }, {
        original: "Boil the [#: rice-noodles | rice noodles] according to the package instructors."
      }, {
        original: "[&:00:02:00] In a skillet, heat a tablespoon of oil and add the bell pepper. Heat for about 2 minutes."
      }, {
        original: "[&:00:01:00] Add [#: greenonion | green onion] and [#: ginger | ginger] and cook for a minute while stirring."
      }, {
        original: "Add [#: cocomilk | coconut milk], [#: soy | soy sauce], [#: sugar  | brown sugar] and stir to combine. Bring to a boil and add cooked rice noodles and tofu. Toss over medium-high heat until sauce thickens."
      }, {
        original: "Remove from heat and stir in [#: lime | lime juice], [#: cgs | chili-garlic sauce] and [#: cilantro | cilantro]. Season with salt."
      }, {
        original: "Top with extra cilantro before serving."
      }]
    },
    "pasta-pesto-salad": {
      belongs_to: "main",
      date_made: "[2019-11-29]",
      ease_of_making: "4/5",
      imgs: ["1.jpg", "2.jpg", "3.jpg"],
      meal_type: "vegan",
      name: "Pesto Pasta Salad",
      original_recipe: "https://cookieandkate.com/pesto-pasta-salad-recipe/#tasty-recipes-24184",
      rating: "4.5/5",
      serves: "4",
      slug: "pasta-pesto-salad",
      time: "00:30:00",
      ingredients: [{
        ingredient: "Pasta (whole grain)",
        quantity: "1",
        unit: "lb",
        id: "pasta",
        group: "salad"
      }, {
        ingredient: "Cherry Tomatoes",
        quantity: "1",
        unit: "pint",
        id: "tomat",
        group: "salad"
      }, {
        ingredient: "Spinach or arugula)",
        quantity: "3",
        unit: "handfuls",
        id: "greens",
        group: "salad"
      }, {
        ingredient: "Kalamata olives",
        quantity: "1/2",
        unit: "cups",
        id: "olives",
        group: "salad"
      }, {
        ingredient: "Feta cheese (optional)",
        quantity: "2",
        unit: "handfuls",
        id: "cheese",
        group: "salad"
      }, {
        ingredient: "Pepitas",
        quantity: "1/2",
        unit: "cups",
        id: "pep",
        group: "pesto"
      }, {
        ingredient: "Basil leaves (packed)",
        quantity: "1/2",
        unit: "cups",
        id: "basil",
        group: "pesto"
      }, {
        ingredient: "Parsley leaves (packed)",
        quantity: "1/2",
        unit: "cups",
        id: "parsley",
        group: "pesto"
      }, {
        ingredient: "Lemon Juice",
        quantity: "2",
        unit: "lemons",
        id: "lemons",
        group: "pesto"
      }, {
        ingredient: "Garlic (chopped)",
        quantity: "1",
        unit: "clove",
        id: "garlic",
        group: "pesto"
      }, {
        ingredient: "Salt",
        quantity: "1/2",
        unit: "tsp",
        id: "sel",
        group: "pesto"
      }, {
        ingredient: "Olive oil",
        quantity: "1/3",
        unit: "cups",
        id: "oil",
        group: "pesto"
      }, {
        ingredient: "Food Processor / Blender",
        quantity: "",
        unit: "",
        id: "",
        group: ""
      }],
      instructions: [{
        original: "Bring a large pot of salted water to a boil."
      }, {
        original: "Cook the pasta al dente (according to package instructions.) When it's done, drain and keep 1/2 cup of the pasta water. Rinse the pasta under cool water. Transfer to a large bowl."
      }, {
        original: "[&: 00:05:00]Toast the [#: pep | pepitas] in a skillet. Stir often until they make little popping noises. When finished, set aside half of the pepitas into a bow as a topper."
      }, {
        original: "Put other half of pepitas, [#: basil | basil], [#: lemons | lemon juice] [#: garlic | garlic] and [#: sel | salt] into a food processor or blender. Blend, adding [#:oil | olive oil]  to the mixture intermittently."
      }, {
        original: "Assemble the pasta: pour pesto over pasta and toss to combine. Add a bit of pasta water if necessary. Then add the [#: tomat | cherry tomatoes], [#: greens | spinach or arugula], the remaining pepitas and anything else you might like (olives, feta, etc)"
      }, {
        original: "Toss it all to combine! Season with a bit of salt and pepper! Go party with your new salad!"
      }]
    }
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.O.D === region.V.D)
	{
		return 'on line ' + region.O.D;
	}
	return 'on lines ' + region.O.D + ' through ' + region.V.D;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aX,
		impl.bc,
		impl.a9,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		s: func(record.s),
		P: record.P,
		L: record.L
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.s;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.P;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.L) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aX,
		impl.bc,
		impl.a9,
		function(sendToApp, initialModel) {
			var view = impl.bd;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aX,
		impl.bc,
		impl.a9,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.N && impl.N(sendToApp)
			var view = impl.bd;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.aJ);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.ba) && (_VirtualDom_doc.title = title = doc.ba);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.a0;
	var onUrlRequest = impl.a1;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		N: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.ao === next.ao
							&& curr.ab === next.ab
							&& curr.ak.a === next.ak.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		aX: function(flags)
		{
			return A3(impl.aX, flags, _Browser_getUrl(), key);
		},
		bd: impl.bd,
		bc: impl.bc,
		a9: impl.a9
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { aR: 'hidden', aK: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { aR: 'mozHidden', aK: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { aR: 'msHidden', aK: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { aR: 'webkitHidden', aK: 'webkitvisibilitychange' }
		: { aR: 'hidden', aK: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		au: _Browser_getScene(),
		aC: {
			aE: _Browser_window.pageXOffset,
			aF: _Browser_window.pageYOffset,
			aD: _Browser_doc.documentElement.clientWidth,
			_: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		aD: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		_: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			au: {
				aD: node.scrollWidth,
				_: node.scrollHeight
			},
			aC: {
				aE: node.scrollLeft,
				aF: node.scrollTop,
				aD: node.clientWidth,
				_: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			au: _Browser_getScene(),
			aC: {
				aE: x,
				aF: y,
				aD: _Browser_doc.documentElement.clientWidth,
				_: _Browser_doc.documentElement.clientHeight
			},
			aP: {
				aE: x + rect.left,
				aF: y + rect.top,
				aD: rect.width,
				_: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}var $author$project$Main$LinkClicked = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 1, a: a};
};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.e) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.g),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.g);
		} else {
			var treeLen = builder.e * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.h) : builder.h;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.e);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.g) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.g);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{h: nodeList, e: (len / $elm$core$Array$branchFactor) | 0, g: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {Z: fragment, ab: host, ai: path, ak: port_, ao: protocol, ap: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Main$Model = F3(
	function (key, url, recipes) {
		return {af: key, M: recipes, aB: url};
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Pages$Recipe$Recipe = function (belongs_to) {
	return function (date_made) {
		return function (ease_of_making) {
			return function (imgs) {
				return function (meal_type) {
					return function (rating) {
						return function (original_recipe) {
							return function (serves) {
								return function (slug) {
									return function (time) {
										return function (ingredients) {
											return function (instructions) {
												return {aI: belongs_to, aM: date_made, aO: ease_of_making, aT: imgs, aW: ingredients, aY: instructions, a_: meal_type, a4: original_recipe, a6: rating, a8: serves, I: slug, az: time};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Pages$Recipe$Instruction = function (original) {
	return {a3: original};
};
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Pages$Recipe$decodeInstruction = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'original',
	$elm$json$Json$Decode$string,
	$elm$json$Json$Decode$succeed($author$project$Pages$Recipe$Instruction));
var $author$project$Pages$Recipe$Vegan = 1;
var $author$project$Pages$Recipe$Vegetarian = 0;
var $elm$json$Json$Decode$fail = _Json_fail;
var $author$project$Pages$Recipe$decodeMealType = A2(
	$elm$json$Json$Decode$andThen,
	function (s) {
		switch (s) {
			case 'vegetarian':
				return $elm$json$Json$Decode$succeed(0);
			case 'vegan':
				return $elm$json$Json$Decode$succeed(1);
			default:
				return $elm$json$Json$Decode$fail('Unrecognized mealtype ' + s);
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Pages$Recipe$Ingredient = F4(
	function (ingredient, quantity, unit, id) {
		return {aS: id, aV: ingredient, a5: quantity, bb: unit};
	});
var $author$project$Pages$Recipe$decoderIngredient = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'id',
	$elm$json$Json$Decode$string,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'unit',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'quantity',
			$elm$json$Json$Decode$string,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'ingredient',
				$elm$json$Json$Decode$string,
				$elm$json$Json$Decode$succeed($author$project$Pages$Recipe$Ingredient)))));
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Pages$Recipe$decodeRecipe = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'instructions',
	$elm$json$Json$Decode$list($author$project$Pages$Recipe$decodeInstruction),
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'ingredients',
		$elm$json$Json$Decode$list($author$project$Pages$Recipe$decoderIngredient),
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'time',
			$elm$json$Json$Decode$string,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'slug',
				$elm$json$Json$Decode$string,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'serves',
					$elm$json$Json$Decode$string,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'original_recipe',
						$elm$json$Json$Decode$string,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'rating',
							$elm$json$Json$Decode$string,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'meal_type',
								$author$project$Pages$Recipe$decodeMealType,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'imgs',
									$elm$json$Json$Decode$list($elm$json$Json$Decode$string),
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'ease_of_making',
										$elm$json$Json$Decode$string,
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'date_made',
											$elm$json$Json$Decode$string,
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'belongs_to',
												$elm$json$Json$Decode$string,
												$elm$json$Json$Decode$succeed($author$project$Pages$Recipe$Recipe)))))))))))));
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $author$project$Pages$Recipe$recipesDecoder = $elm$json$Json$Decode$dict($author$project$Pages$Recipe$decodeRecipe);
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var _v0 = A2($elm$json$Json$Decode$decodeValue, $author$project$Pages$Recipe$recipesDecoder, flags.M);
		if (!_v0.$) {
			var recipes = _v0.a;
			return _Utils_Tuple2(
				A3(
					$author$project$Main$Model,
					key,
					url,
					$elm$core$Maybe$Just(recipes)),
				$elm$core$Platform$Cmd$none);
		} else {
			var err = _v0.a;
			return _Utils_Tuple2(
				A3($author$project$Main$Model, key, url, $elm$core$Maybe$Nothing),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.ao;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.Z,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.ap,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.ak,
					_Utils_ap(http, url.ab)),
				url.ai)));
};
var $author$project$Main$update = F2(
	function (msg, model) {
		if (!msg.$) {
			var urlRequest = msg.a;
			if (!urlRequest.$) {
				var url = urlRequest.a;
				return _Utils_Tuple2(
					model,
					A2(
						$elm$browser$Browser$Navigation$pushUrl,
						model.af,
						$elm$url$Url$toString(url)));
			} else {
				var href = urlRequest.a;
				return _Utils_Tuple2(
					model,
					$elm$browser$Browser$Navigation$load(href));
			}
		} else {
			var url = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{aB: url}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {v: frag, w: params, u: unvisited, q: value, y: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.u;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.q);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.q);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.ai),
					$elm$url$Url$Parser$prepareQuery(url.ap),
					url.Z,
					$elm$core$Basics$identity)));
	});
var $author$project$Pages$Router$About = {$: 1};
var $author$project$Pages$Router$Home = {$: 0};
var $author$project$Pages$Router$RecipeSingle = function (a) {
	return {$: 2, a: a};
};
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.y;
		var unvisited = _v0.u;
		var params = _v0.w;
		var frag = _v0.v;
		var value = _v0.q;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0;
		return function (_v1) {
			var visited = _v1.y;
			var unvisited = _v1.u;
			var params = _v1.w;
			var frag = _v1.v;
			var value = _v1.q;
			return A2(
				$elm$core$List$map,
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var parser = _v0;
				return parser(state);
			},
			parsers);
	};
};
var $elm$url$Url$Parser$s = function (str) {
	return function (_v0) {
		var visited = _v0.y;
		var unvisited = _v0.u;
		var params = _v0.w;
		var frag = _v0.v;
		var value = _v0.q;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					A2($elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0;
		var parseAfter = _v1;
		return function (state) {
			return A2(
				$elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var $elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_v0) {
			var visited = _v0.y;
			var unvisited = _v0.u;
			var params = _v0.w;
			var frag = _v0.v;
			var value = _v0.q;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _v2 = stringToSomething(next);
				if (!_v2.$) {
					var nextValue = _v2.a;
					return _List_fromArray(
						[
							A5(
							$elm$url$Url$Parser$State,
							A2($elm$core$List$cons, next, visited),
							rest,
							params,
							frag,
							value(nextValue))
						]);
				} else {
					return _List_Nil;
				}
			}
		};
	});
var $elm$url$Url$Parser$string = A2($elm$url$Url$Parser$custom, 'STRING', $elm$core$Maybe$Just);
var $elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
var $author$project$Pages$Router$parser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2($elm$url$Url$Parser$map, $author$project$Pages$Router$Home, $elm$url$Url$Parser$top),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Pages$Router$RecipeSingle,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('recipe'),
				$elm$url$Url$Parser$string)),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Pages$Router$About,
			$elm$url$Url$Parser$s('about'))
		]));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$section = _VirtualDom_node('section');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Pages$Recipe$unwrapRecipes = F2(
	function (model, fn) {
		var _v0 = model.M;
		if (_v0.$ === 1) {
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('The recipes did not load. Go print a Debug.log in `init`')
					]));
		} else {
			var recipes = _v0.a;
			return fn(recipes);
		}
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Pages$Recipe$viewList = function (model) {
	return A2(
		$author$project$Pages$Recipe$unwrapRecipes,
		model,
		function (recipes) {
			var rList = function (recipe) {
				return A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('recipe/' + recipe.I)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(recipe.I)
								]))
						]));
			};
			return A2(
				$elm$html$Html$section,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('RecipeList')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('columns')
							]),
						A2(
							$elm$core$List$map,
							rList,
							$elm$core$Dict$values(recipes)))
					]));
		});
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Pages$Recipe$viewHero = function (slug) {
	var url = 'url(/imgs/' + (slug + '-hero.JPG)');
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('viewHero'),
				A2($elm$html$Html$Attributes$style, 'background-image', url)
			]),
		_List_Nil);
};
var $author$project$Pages$Recipe$viewSingle = F2(
	function (model, recipeName) {
		return A2(
			$author$project$Pages$Recipe$unwrapRecipes,
			model,
			function (recipes) {
				var _v0 = A2($elm$core$Dict$get, recipeName, recipes);
				if (!_v0.$) {
					var recipe = _v0.a;
					return A2(
						$elm$html$Html$section,
						_List_Nil,
						_List_fromArray(
							[
								$author$project$Pages$Recipe$viewHero(recipe.I),
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('recipe found' + recipe.az)
									]))
							]));
				} else {
					return A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('RECIPE NOT FOUND! 404.')
							]));
				}
			});
	});
var $author$project$Pages$Router$router = function (model) {
	var _v0 = A2($elm$url$Url$Parser$parse, $author$project$Pages$Router$parser, model.aB);
	if (_v0.$ === 1) {
		return A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('404')
				]));
	} else {
		switch (_v0.a.$) {
			case 0:
				var _v1 = _v0.a;
				return $author$project$Pages$Recipe$viewList(model);
			case 2:
				var recipe = _v0.a.a;
				return A2($author$project$Pages$Recipe$viewSingle, model, recipe);
			default:
				var _v2 = _v0.a;
				return A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('About Page')
						]));
		}
	}
};
var $author$project$Main$view = function (model) {
	return {
		aJ: _List_fromArray(
			[
				$author$project$Pages$Router$router(model)
			]),
		ba: 'Ari\'s Garden'
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{aX: $author$project$Main$init, a0: $author$project$Main$UrlChanged, a1: $author$project$Main$LinkClicked, a9: $author$project$Main$subscriptions, bc: $author$project$Main$update, bd: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (recipes) {
			return $elm$json$Json$Decode$succeed(
				{M: recipes});
		},
		A2($elm$json$Json$Decode$field, 'recipes', $elm$json$Json$Decode$value)))(0)}});}(this));

/***/ })
/******/ ]);