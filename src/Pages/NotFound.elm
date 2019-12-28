module Pages.NotFound exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


view =
    section [ class "four-oh-four" ]
        [ h1 [] [ text "404" ]
        , h3 [] [ text "Page not found." ]
        ]
