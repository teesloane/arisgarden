module Types exposing (..)

import Browser
import Pages.RecipeSingle exposing (RecipeSingleMsg)
import Url


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | RecipeSingleMsg RecipeSingleMsg
    | RecipeListMsg
    | NoOp
