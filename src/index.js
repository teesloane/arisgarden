import { Elm } from "./Main.elm";

// var y = {
//   belongs_to: "main",
//   date_made: "[2019-09-08]",
//   ease_of_making: 3,
//   imgs: ["1.JPG", "2.JPG", "3.JPG"],
//   meal_type: "vegetarian",
//   // is_vegan: "true",
//   // is_vegetarian: "true",
//   name: "Bowl #1",
//   original_recipe: "https://tasty.co/recipe/protein-packed-buddha-bowl",
//   rating: 5,
//   serves: 2,
//   slug: "bowl1",
//   time: "00:50:00"
// };


var y = {

      "belongs_to": "breakfast",
      "date_made": "[2019-10-03]", // FIXME: parse to date...
      "ease_of_making": "5/5", // FIXME: parse to union
      "imgs": ["1.JPG", "2.JPG"], // FIXME: learn how to parse this.
      "meal_type": "vegan", // FIXME PARSE TO union
      "name": "Breakfast Quinoa",
      "original_recipe": "https://cookieandkate.com/cinnamon-breakfast-quinoa-recipe/",
      "rating": "5/5",
      "serves": "4",
      "slug": "breakfast-quinoa",
      "time": "00:40:00",
      "ingredients": [
        {
          "ingredient": "Quinoa",
          "quantity": "1",
          "unit": "cups",
          "id": "quin"
        },
        {
          "ingredient": "Water",
          "quantity": "2",
          "unit": "cups",
          "id": "water"
        },
        {
          "ingredient": "Maple Syrup",
          "quantity": "2",
          "unit": "tbsp",
          "id": "syr"
        },
        {
          "ingredient": "Pecans or Walnuts (chopped)",
          "quantity": "1/4",
          "unit": "cups",
          "id": "nuts"
        },
        {
          "ingredient": "Cinnamon",
          "quantity": "1 or 2",
          "unit": "tsp",
          "id": "cin"
        },
        {
          "ingredient": "Coconut oil",
          "quantity": "2",
          "unit": "tbsp",
          "id": "oil"
        },
        {
          "ingredient": "Fresh berries",
          "quantity": "",
          "unit": "",
          "id": "berr"
        },
        {
          "ingredient": "Almond butter",
          "quantity": "",
          "unit": "",
          "id": "almbut"
        }
      ],

}

Elm.Main.init({
  node: document.querySelector("main"),
  flags: {
    recipes: [y]
  }
});
