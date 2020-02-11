module Types exposing (..)

import Browser
import Pages.RecipeSingle exposing (RecipeSingleMsg)
import Pages.RecipeList exposing (RecipeListMsg)
import Url

-- FIXME move more types into here?
-- Or; document why we have this as a separate file (circular imports.)

type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | RecipeSingleMsg RecipeSingleMsg
    | RecipeListMsg RecipeListMsg
    | NoOp
