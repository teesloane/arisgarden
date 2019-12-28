module Ui exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


sectionHeading content =
    h2 [ class "section_heading" ] [ text content ]


icon name width height =
    img [ class "icon", style "width" width, style "height" height, src ("/icons/" ++ name) ] []
