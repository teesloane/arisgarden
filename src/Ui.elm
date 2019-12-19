module Ui exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


sectionHeading content =
    h2 [ class "section_heading" ] [ text content ]


icon : String -> String -> Html msg
icon name width =
    img [ class "icon", style "width" width, src ("/icons/" ++ name) ] []
