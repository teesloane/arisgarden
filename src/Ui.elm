module Ui exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Util


sectionHeading content =
    h2 [ class "section-heading" ] [ text content ]


icon name width height =
    img [ class "icon", style "width" width, style "height" height, src ("/icons/" ++ name) ] []


btn content clickFn style =
    let
        className =
            Util.tern (style == "primary") "button primary" "button secondary"
    in
    button [class className, onClick clickFn] [text content]

btnToggle content clickFn isOn =
    if isOn then
        btn content clickFn "primary"
    else
        btn content clickFn "secondary"
