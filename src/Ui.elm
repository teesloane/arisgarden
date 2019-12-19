module Ui exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


sectionHeading content =
    h2 [ class "section_heading" ] [ text content ]


icon name =
    div [ class "icon", src ("/icons/" ++ name) ] []
