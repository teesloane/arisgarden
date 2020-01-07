![](src/assets/imgs/_ari_1.png)

[Ari's Garden](https://arisgarden.theiceshelf.com/) is a site for collecting and displaying the journey of making and
discovering food.

Using Ari's Garden, you can find recipes and use dynamic features like tooltips
and timers to help you cook.

## Building / Process 

**Requirements**

1. Elm 0.19.1
2. Node >= 7.x.x

**Steps to Getting Started**

1. Clone the repo
2. Run `npm install`
3. Run `npm start`

**Adding new recipes/images**

- Recipes are stored in `src/scripts/recipes.org`. All recipes must follow the same general schema.
- `convert.js` is used to turn `recipes.org` into `src/scripts/db.json`
- sequences of images can be turned into gifs using `ImageMagick's` `mogrify` command:

```sh
mogrify -resize 400 *.JPG

convert -delay 5 -loop 0 *.JPG output.gif
```
  


