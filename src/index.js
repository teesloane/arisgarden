import { Elm } from "./Main.elm";

var y = {
  belongs_to: "main",
  date_made: "[2019-09-08]",
  ease_of_making: 3,
  imgs: ["1.JPG", "2.JPG", "3.JPG"],
  meal_type: "vegetarian",
  // is_vegan: "true",
  // is_vegetarian: "true",
  name: "Bowl #1",
  original_recipe: "https://tasty.co/recipe/protein-packed-buddha-bowl",
  rating: 5,
  serves: 2,
  slug: "bowl1",
  time: "00:50:00"
};

Elm.Main.init({
  node: document.querySelector("main"),
  flags: {
    recipes: [y]
  }
});
