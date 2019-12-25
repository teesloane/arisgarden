module Pages.RecipeList exposing (..)

import Json.Decode as Decode
import Pages.RecipeSingle exposing (decodeRecipe)


type alias Flags =
    { recipes : Decode.Value
    }


decodeAll : Decode.Decoder (List Pages.RecipeSingle.Recipe)
decodeAll =
    Decode.list decodeRecipe
