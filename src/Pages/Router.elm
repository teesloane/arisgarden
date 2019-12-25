module Pages.Router exposing (..)

import Pages.RecipeList as RecipeList
import Pages.RecipeSingle as RecipeSingle
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, parse, s, string)



-- Routing


type Route
    = RecipeList
    | NotFound
    | RecipeSingle String


type Page
    = NotFoundPage
    | RecipeListPage RecipeList.Model
    | RecipeSinglePage RecipeSingle.Model



-- Parses routes based on a url against the Route type


matchRoute : Parser (Route -> a) a
matchRoute =
    oneOf
        [ Parser.map RecipeList Parser.top
        , Parser.map RecipeSingle (s "recipe" </> string)
        ]


parseUrl : Url -> Route
parseUrl url =
    let
        x =
            Debug.log "praser url is " url
    in
    case parse matchRoute url of
        Just route ->
            route

        Nothing ->
            NotFound
