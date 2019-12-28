module Pages.Router exposing (..)

import Pages.About as About
import Pages.RecipeList as RecipeList
import Pages.RecipeSingle as RecipeSingle
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, parse, s, string)



-- Routing


type Route
    = RecipeList
    | NotFound
    | RecipeSingle String
    | About


type Page
    = NotFoundPage
    | RecipeListPage RecipeList.Model
    | RecipeSinglePage RecipeSingle.Model
    | AboutPage



-- Parses routes based on a url against the Route type


matchRoute : Parser (Route -> a) a
matchRoute =
    oneOf
        [ Parser.map RecipeList Parser.top
        , Parser.map RecipeSingle (s "recipe" </> string)
        , Parser.map About (s "about")
        ]


parseUrl : Url -> Route
parseUrl url =
    case parse matchRoute url of
        Just route ->
            route

        Nothing ->
            NotFound
