module Pages.Router exposing (..)

import Html exposing (p, text)
import Pages.Recipe as Recipe
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s, string)



-- Routing


type Route
    = Home
    | About
    | RecipeSingle String



-- Parses routes based on a url against the Route type


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Home Parser.top
        , Parser.map RecipeSingle (s "recipe" </> string)
        , Parser.map About (s "about")
        ]



-- `router` looks at an incoming url against the parser
-- returns a view based on the results


router model =
    case Parser.parse parser model.url of
        Nothing ->
            ( p [] [ text "404" ], "404" )

        Just Home ->
            ( Recipe.viewList model, "Home" )

        Just (RecipeSingle recipeName) ->
            ( Recipe.viewSingle model recipeName, Recipe.nameFromSlug model.recipes recipeName )

        Just About ->
            ( p [] [ text "About Page" ], "About" )
