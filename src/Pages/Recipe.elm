module Pages.Recipe exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Dict
import Debug


viewSingle model =
    let recipe = Debug.log "hi" "bye"
    in
    section [class "RecipeSingle"] [
         div [] [text "recipe single view"]
        ]

viewList model =
    let
        rList recipe =
            li [] [ text recipe.slug ]
    in
    section [class "RecipeList"]
        [ ul [class "columns"] (List.map rList (Dict.values model.recipes))
        ]
