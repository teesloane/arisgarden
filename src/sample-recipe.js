var y = {
  original_recipe: "https://tasty.co/recipe/protein-packed-buddha-bowl",
  day_made: "[2019-09-08]",
  belongs_to: "main",
  slug: "bowl1",
  is_vegan: "true",
  name: "Bowl #1",
  serves: "2",
  is_vegetarian: "true",
  imgs: "1.JPG,2.JPG,3.JPG",
  ease_of_making: "3/5",
  time: "00:50:00",
  rating: "5/5"
};

var x = {
  meta: {
    properties: {
      original_recipe: "https://tasty.co/recipe/protein-packed-buddha-bowl",
      day_made: "[2019-09-08]",
      belongs_to: "main",
      slug: "bowl1",
      is_vegan: "true",
      name: "Bowl #1",
      serves: "2",
      is_vegetarian: "true",
      imgs: "1.JPG,2.JPG,3.JPG",
      ease_of_making: "3/5",
      time: "00:50:00",
      rating: "5/5"
    },
    logbook: []
  },
  ingredients: {
    keys: ["Ingredient", "Quantity", "Unit", "Id", "Group"],
    data: [
      {
        Ingredient: "Sweet Potato",
        Quantity: "1",
        Unit: "",
        Id: "potato-sweet",
        Group: ""
      },
      {
        Ingredient: "Shredded Carrots",
        Quantity: "1",
        Unit: "",
        Id: "avocado",
        Group: ""
      },
      { Ingredient: "Onion", Quantity: "1", Unit: "", Id: "onion", Group: "" },
      { Ingredient: "Tofu", Quantity: "8", Unit: "oz", Id: "tofu", Group: "" },
      {
        Ingredient: "Garlic",
        Quantity: "2",
        Unit: "cloves",
        Id: "garlic",
        Group: ""
      },
      {
        Ingredient: "Chickpeas",
        Quantity: "1",
        Unit: "cups",
        Id: "chickpeas",
        Group: ""
      },
      {
        Ingredient: "Pepper",
        Quantity: "1/2",
        Unit: "tsp",
        Id: "pepper",
        Group: ""
      },
      {
        Ingredient: "Chili powder",
        Quantity: "1",
        Unit: "tsp",
        Id: "chili-powder",
        Group: ""
      },
      {
        Ingredient: "Garlic powder",
        Quantity: "1",
        Unit: "tsp",
        Id: "garlic-powder",
        Group: ""
      },
      {
        Ingredient: "Quinoa",
        Quantity: "1+1/2",
        Unit: "cups",
        Id: "quinoa",
        Group: ""
      },
      {
        Ingredient: "Sesame Oil",
        Quantity: "1/2",
        Unit: "tsp",
        Id: "oil-sesame",
        Group: "Marinade"
      },
      {
        Ingredient: "Hot Sauce",
        Quantity: "1",
        Unit: "tsp",
        Id: "sauce-hot",
        Group: "Marinade"
      },
      {
        Ingredient: "Dried thyme",
        Quantity: "2",
        Unit: "tsp",
        Id: "thyme",
        Group: "Marinade"
      },
      {
        Ingredient: "Paprika",
        Quantity: "1",
        Unit: "tsp",
        Id: "paprika",
        Group: "Marinade"
      }
    ]
  },
  instructions: [
    {
      o:
        "Make the marinade: combine [#: oil-olive | olive oil], [#: oil-sesame | seasame oil], [#: sauce-hot | hot sauce], [#: thyme | thyme], [#: paprika | paprika], and [#: salt | salt]. Set aside.",
      f: [
        { val: "Make the marinade: combine" },
        { val: "olive oil", attr: "oil-olive" },
        { val: "," },
        { val: "seasame oil", attr: "oil-sesame" },
        { val: "," },
        { val: "hot sauce", attr: "sauce-hot" },
        { val: "," },
        { val: "thyme", attr: "thyme" },
        { val: "," },
        { val: "paprika", attr: "paprika" },
        { val: ", and" },
        { val: "salt", attr: "salt" },
        { val: ". Set aside." }
      ]
    },
    {
      o:
        "[&: 00:30:00] Add marinade and tofu to a container and marinate for at least 30 minutes (up to a day).",
      f: [
        {
          val:
            "Add marinade and tofu to a container and marinate for at least 30 minutes (up to a day)."
        }
      ],
      timer: "00:30:00"
    },
    {
      o: "Preheat the oven to 400F (200C).",
      f: [{ val: "Preheat the oven to 400F (200C)." }]
    },
    {
      o:
        "[&: 00:20:00] Cut [#: potato-sweet | sweet potato] into cubes. Slice the [#: onion | onion], dice [#: garlic | garlic]. Put it all on a baking sheet. Drizzel with oil, season with salt and pepper. Bake for 20-25 min.",
      f: [
        { val: "Cut" },
        { val: "sweet potato", attr: "potato-sweet" },
        { val: "into cubes. Slice the" },
        { val: "onion", attr: "onion" },
        { val: ", dice" },
        { val: "garlic", attr: "garlic" },
        {
          val:
            ". Put it all on a baking sheet. Drizzel with oil, season with salt and pepper. Bake for 20-25 min."
        }
      ],
      timer: "00:20:00"
    },
    {
      o:
        "In a medium bowl, add the [#: chickpeas | chickpeas], salt, pepper, [#: chili-powder | chili powder], and [#: garlic-powder | garlic powder]. Stir to combine.",
      f: [
        { val: "In a medium bowl, add the" },
        { val: "chickpeas", attr: "chickpeas" },
        { val: ", salt, pepper," },
        { val: "chili powder", attr: "chili-powder" },
        { val: ", and" },
        { val: "garlic powder", attr: "garlic-powder" },
        { val: ". Stir to combine." }
      ]
    },
    {
      o:
        "[&: 00:10:00] Transfer chickpeas to skillet and cook on medium heat for 10 minutes. Set aside.",
      f: [
        {
          val:
            "Transfer chickpeas to skillet and cook on medium heat for 10 minutes. Set aside."
        }
      ],
      timer: "00:10:00"
    },
    {
      o:
        "[&: 00:10:00] Fry the tofu in the same pan for about 10 minutes on each side.",
      f: [
        {
          val: "Fry the tofu in the same pan for about 10 minutes on each side."
        }
      ],
      timer: "00:10:00"
    },
    { o: "Slice tofu as you like.", f: [{ val: "Slice tofu as you like." }] },
    {
      o:
        "Combine tofu and sweet potato with quinoa chickpeas, carrots, and avocado, etc.",
      f: [
        {
          val:
            "Combine tofu and sweet potato with quinoa chickpeas, carrots, and avocado, etc."
        }
      ]
    }
  ],
  content: {
    props: { type: "big-quote" },
    value: ["Sit and be patient, like marinating tofu."]
  }
};
