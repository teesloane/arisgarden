const { parse } = require("/usr/local/lib/node_modules/orga");

var fs = require("fs");
var db = null;

fs.readFile("recipes.org", "utf8", function(_, data) {
  db = parse(data);
  let recipes = db.children;
  let output = {
    recipes: {}
  };

  recipes.forEach(r => {
    let _r = getRecipe(r); let key = _r.meta.properties.slug; output.recipes[key] = _r;}); let stringify = "var db = " + JSON.stringify(output, null, 2); fs.writeFile("./db.js", stringify, function(err) {if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});

function getRecipe(heading) {
  return {
    meta: {
      properties: getProperties(heading),
      logbook: []
    },
    ingredients: getIngredients(heading),
    instructions: getInstructions(heading),
    content: getContent(heading)
  };
}

function getIngredients(n) {
  let recipe = n; // ?
  let ingredients = tableParser(recipe.children[1].children[1].children);
  return ingredients;
}

function getContent(n) {
  try {
    let contentParent = n.children[3].children
    let contentProps = contentParent[0].children[1]
    let content = contentParent[1]

    let parsedProps = parseProperties(contentProps.value)
    let parsedContent = parseListShallow(content.children)
    return {
      props: parsedProps,
      value: parsedContent
    }
  }
  catch {
    console.log("Missing value / problem with:", n.children[0].children[0].value)
    return {props: null}
  }

}

// Returns a recipes instructions
function getInstructions(n) {
  let list = n.children[2].children[1].children;
  let out = [];
  list.forEach(l =>
    l.children.map(j => {
      out.push(templateParser(j.value));
      // return templateParser(j.value);
    })
  );
  return out;
}

// Parses template strings and returns data structures.
// example:
//
// 1) Chop [#: almonds | almonds] roughly. Put them in a bowl.
//
// Will parse the # into a id data attribute.
// Or,
//
// 5) [t: 00:18:00] Cook for 18-30 minutes. Stir frequently.
// Will return timer data for an inline timer.
function templateParser(str) {
  let ogstr = str;
  let ogRE = /\[(.*?)\]/;
  let bracketRE = /[^[\]]+(?=])/g;
  let matches = str.match(bracketRE);
  let out = { o: ogstr, f: "<final string>" };

  // set f (final string)
  if (matches == null) {
    out["f"] = out.o;
    return out;
  }

  matches.forEach(m => {
    let matchCategory = m.slice(0, 1); // ie, gets "t" from: "[t: 00:10:00]"
    switch (matchCategory) {
      case "t":
        out["timer"] = m.slice(3, 11); // parse the timestring.
        out["f"] = str.replace(ogRE, "").trim(); // remover timer block.
        return out;

      case "#":
        out["f"] = ogstr.replace(ogRE, match => {
          let tagContent = match
            .split("|")[1]
            .trim()
            .slice(0, -1);
          let tagId = match
            .split("|")[0]
            .slice(3)
            .trim();
          return `<span data-quant="${tagId}" class="ingredient-tooltip">${tagContent}</span>`;
        });
      default:
        break;
    }
  });

  return out;
}

/**
 *
 * Provided a Table looks like so:

 | Ingredient                                       | Quantity | Unit |
 |--------------------------------------------------+----------+------|
 | Dates (Deglet noor or medjool)                   | 1        | cups |
 | Maple Syrup (or: agava nectar, honey)            | 1/4      | cups |
 ....
 *
 */
function tableParser(tableChildren) {
  return tableChildren.reduce(
    (acc, curr, idx) => {
      // collect table column names as keys
      if (idx === 0) {
        tableChildren[0].children.forEach(key => {
          acc["keys"].push(key.children[0].value);
        });
      }

      // skip if of type separator.
      else if (curr.type === "table.separator") {
        return acc;
      } else {
        let datNew = {};
        // fill the object with cell data
        curr.children.forEach((c, idx) => {
          let currKey = acc["keys"][idx];
          datNew[currKey] = c.children[0].value;
        });
        acc["data"].push(datNew);
        return acc;
      }

      return acc;
    },
    { keys: [], data: [] }
  );
}

// Given a heading, this should return all the meta data for it.
function getProperties(h) {
  let headlineChildren = h.children[0].children; // gets type "headline", which containers drawers.
  let props = headlineChildren.find(f => {
    return f.type == "drawer" && f.name === "PROPERTIES";
  });
  return parseProperties(props.value);
}

function getLogbook(h) {
  let headlineChildren = h.children[0].children; // gets type "headline", which containers drawers.
  let logbook = headlineChildren.find(f => {
    return f.type == "drawer" && f.name === "LOGBOOK";
  });
  return logbook;
}

/**
 *
 * Currently not available in orga-js.
 * Is handed value like:
 *

 value:  ':original_recipe: https://ohsheglows.com/2017/07/21/8-minute-pantry-dal-two-ways/\n' +
 ':day_made: [2019-09-01 Sun]\n' +
 ':is_vegan:\n' +
 ':is_vegetarian:\n' +
 ':ease_of_making: 5/5\n' +
 ':rating: 5/5',
*/
function parseProperties(p) {
  let o = {};
  let vals = p.split("\n");
  let keyMatch = /\:(.*?)\:/;

  vals.forEach(v => {
    let key = v.split(":", 2);
    let val = v.replace(keyMatch, "");
    o[key[1]] = val.trim();
  });
  return o;
}

// current not available in orga-js
function parseLogbook() {}



/**
 * Parses a one-level-deep list:
 *
  [{
     type: 'list.item',
     children: [Array],
     ordered: false,
     tag: undefined,
     parent: [Circular]
   }],

 * Returns: a list of strings.
 */
function parseListShallow(listItems) {
  return listItems.map(li => {
    return li.children[0].value
  })
}
