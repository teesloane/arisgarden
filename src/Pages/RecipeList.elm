module Pages.RecipeList exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode
import Pages.RecipeSingle exposing (Recipe, decodeRecipe)


type alias Flags =
    { recipes : Decode.Value
    }


type alias Model =
    { recipes : Maybe (List Recipe)
    }


decodeAll : Decode.Decoder (List Pages.RecipeSingle.Recipe)
decodeAll =
    Decode.list decodeRecipe


init recipes =
    ( { recipes = Just recipes }, Cmd.none )



-- views --


view model =
    case model.recipes of
        Just recipes ->
            let
                rList recipe =
                    li [] [ a [ href ("/recipe/" ++ recipe.slug) ] [ text recipe.name ] ]
            in
            section [ class "RecipeList" ]
                [ ul [ class "columns" ] (List.map rList recipes)
                ]

        _ ->
            div [] [ text "failed" ]
