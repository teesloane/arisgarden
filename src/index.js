import { Elm } from "./Main.elm";
import {db} from '../scripts/db.js'

console.log("dbb is", db);

Elm.Main.init({
  node: document.querySelector("main"),
  flags: {
    recipes: [db.recipes["breakfast-quinoa"]]
  }
});
