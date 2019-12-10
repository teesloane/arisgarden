module Pages.Router exposing (..)

import Debug
import Html exposing (p, text)
import Html.Attributes exposing (..)
import Pages.Recipe as Recipe
import Url.Parser as Parser exposing (Parser, (</>), string, oneOf, s)



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
            p [] [text "404"]

        Just Home ->
            Recipe.viewList model

        Just (RecipeSingle "hi") -> -- FIXME: how do I parse the url?
            Recipe.viewSingle model

        Just (RecipeSingle _) -> -- FIXME - this makes "recipe/_"  go to viewList :/
            Recipe.viewList model

        Just About ->
            p [] [text "About Page"]
