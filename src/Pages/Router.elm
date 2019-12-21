module Pages.Router exposing (..)

import Html exposing (p, text)
import Pages.Recipe as Recipe
import Pages.RecipeSingle as RecipeSingle
import Random
import Update exposing (Msg(..))
import Url.Parser as Parser exposing ((</>), Parser, oneOf, parse, s, string)



-- Routing


type Route
    = Home
    | NotFound
      --| About
    | RecipeSingle String


type Page
    = NotFoundPage
    | RecipeSinglePage RecipeSingle.Model
    | RecipeListPage



-- Parses routes based on a url against the Route type


matchRoute : Parser (Route -> a) a
matchRoute =
    oneOf
        [ Parser.map Home Parser.top
        , Parser.map RecipeSingle (s "recipe" </> string)

        --, Parser.map About (s "about")
        ]


parseUrl url =
    case parse matchRoute url of
        Just route ->
            route

        Nothing ->
            NotFound



-- `router` looks at an incoming url against the parser
-- returns a view based on the results
--router model =
--    case Parser.parse parser model.url of
--        Nothing ->
--            ( p [] [ text "404" ], "404" )
--
--        Just Home ->
--            ( Recipe.viewList model, "Home" )
--
--        Just (RecipeSingle recipeName) ->
--            ( Recipe.viewSingle model recipeName, Recipe.nameFromSlug model.recipes recipeName )
--
--        Just About ->
--            ( p [] [ text "About Page" ], "About" )
-- based on our route, set up the init model / commands
-- FIXME: This and router ^ should be combined_ (and maybe page title)


commands model =
    case Parser.parse matchRoute model.url of
        Nothing ->
            Cmd.none

        Just Home ->
            Random.generate RandomGot (Random.int 1 6)

        Just a ->
            Cmd.none
