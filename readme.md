# GoutFood

GoutFood is a site for collecting and displaying the journey of making and
discovering food.


## Building / Process 

- Recipes are stored in `recipes.org`. All recipes must follow the same general schema.
- `convert.js` is used to turn `recipes.org` into a javascript object in the
  file `db.js`. (eventually, running this in-browser would be great, by
  vendoring [orga-js](https://github.com/xiaoxinghu/orgajs))
- Images for recipes can be resized to a consistent size using the _Automator_
  workflow  `rename-images.workflow`
- Images can be turned into gifs using `ImageMagick's` `mogrify` command:

```sh
mogrify -resize 400 *.JPG

convert -delay 5 -loop 0 *.JPG output.gif
```
  

