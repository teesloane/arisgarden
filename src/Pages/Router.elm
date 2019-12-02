module Pages.Router exposing (..)

import Debug
import Html exposing (p, text)
import Html.Attributes exposing (..)
import Pages.Home exposing (home)
import Url.Parser as Parser exposing (Parser, oneOf, s)



-- Routing


type Route
    = Home
    | About



-- Parses routes based on a url against the Route type


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Home Parser.top
        , Parser.map About (s "about")
        ]



-- `router` looks at an incoming url against the parser
-- returns a view based on the results


router url =
    case Parser.parse parser url of
        Nothing ->
            p [] [text "404"]

        Just Home ->
            home

        Just About ->
            p [] [text "About page found"]
