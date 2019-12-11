const { parse } = require("/usr/local/lib/node_modules/orga");

var fs = require("fs");
var db = null;

/**
 * Open the recipes.org file and iterate over it, parsing the fields
 *
 */
fs.readFile("recipes.org", "utf8", function(_, data) {
  db = parse(data);
  let recipes = db.children;
  let output = {
    recipes: {}
  };

  recipes.forEach(r => {
    let _r = getRecipe(r);
    let key = _r.slug;
    output.recipes[key] = _r;
  });

  let stringify = "module.exports = " + JSON.stringify(output, null, 2);
  fs.writeFile("./db.js", stringify, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});

function getRecipe(heading) {
  let properties = getProperties(heading);
  // console.log(JSON.parse(properties.imgs), "--", typeof(properties.imgs));
  properties.imgs = JSON.parse(properties.imgs);

  return {
    ...properties,
    ingredients: getIngredients(heading),
    instructions: getInstructions(heading)
    // content: getContent(heading) // FIXME: add back in
  };
}

function getIngredients(n) {
  let recipe = n; // ?
  let ingredients = tableParser(recipe.children[1].children[1].children);
  return ingredients.data;
}

function getContent(n) {
  try {
    let contentParent = n.children[3].children;
    let contentProps = contentParent[0].children[1];
    let content = contentParent[1];

    let parsedProps = parseProperties(contentProps.value);
    let parsedContent = parseListShallow(content.children);
    return {
      props: parsedProps,
      value: parsedContent
    };
  } catch {
    console.log(
      "Missing value / problem with:",
      n.children[0].children[0].value
    );
    return { props: null };
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

// Parses recipes instruction strings and returns data structures.
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
  // let ogRE = /\[(.*?)\]/;
  // let bracketRE = /[^[\]]+(?=])/;
  let newRE = /\s*\[([^\]]*)]\s*/;
  let out = { original: ogstr };
  let splitStr = str.split(newRE).filter(Boolean);

  // splitStr.forEach(s => {
  //   switch (s[0]) {
  //     case "&":
  //       out["timer"] = s.slice(2, 11).trim(); // parse the timestring.
  //       return out;

  //     // Parse # to assign meta data (for linking)
  //     // NOTE: disable and reimplement this to be easier.
  //     case "#":
  //       let split = s.split("|");
  //       let tagId = split[0].slice(3).trim();
  //       let tagContent = split[1].trim();
  //       out["parsed"].push({ val: tagContent, attr: tagId });
  //       return out;

  //     default:
  //       return out
  //       // out["parsed"].push({ val: s });
  //       // out["parsed"].push({ val: s });
  //   }
  // });

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
          let currKey = acc["keys"][idx].toLowerCase();
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
    return li.children[0].value;
  });
}
