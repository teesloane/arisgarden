module Pages.RecipeList exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import Json.Decode as Decode
import Pages.RecipeSingle exposing (Recipe, decodeRecipe)
import Ui
import Util


type alias Flags =
    { recipes : Decode.Value
    }


type alias Model =
    { recipes : Maybe (List Recipe)
    , searchVal : String
    }


decodeAll : Decode.Decoder (List Pages.RecipeSingle.Recipe)
decodeAll =
    Decode.list decodeRecipe


init recipes =
    ( { recipes = recipes
      , searchVal = ""
      }
    , Cmd.none
    )



-- Update --
--


type RecipeListMsg
    = HandleInput String



-- update : RecipeListMsg -> Model -> ( Model, Cmd msg )


update msg model =
    case msg of
        HandleInput e ->
            ( { model | searchVal = e }, Cmd.none )



-- Views --


viewHero =
    section [ class "home-hero" ]
        [ div [ class "content" ]
            [ div [ class "mainline" ] [ text "Ari's Garden" ]
            , div [ class "byline" ] [ text "Simple, to-the-point vegetarian and vegan recipes." ]
            ]
        ]


viewSearch model =
    section [ class "section-search content" ]
        [ input [ class "input search-input", value model.searchVal, onInput HandleInput ] []
        , button [ class "button search-btn" ] [ text "FILTERS" ]
        ]


view model =
    case model.recipes of
        Just recipes ->
            let
                sortedRecipes =
                    List.sortBy .belongs_to recipes

                groupedRecipes =
                    Util.groupWhileTransitively (\a b -> a.belongs_to == b.belongs_to) sortedRecipes

                getCategoryName sec =
                    case List.head sec of
                        Just r ->
                            r.belongs_to ++ " - ish"

                        Nothing ->
                            ""

                sectionList sec =
                    div []
                        [ h4 [ class "recipe-category" ] [ text <| getCategoryName sec ]
                        , ul [] (List.map rList sec)
                        ]

                rList recipe =
                    li [] [ a [ href ("/recipe/" ++ recipe.slug) ] [ text recipe.name ] ]
            in
            section [ class "RecipeList" ]
                [ viewHero
                , viewSearch model
                , div [ class "columns" ] (List.map sectionList groupedRecipes)
                ]

        _ ->
            div [] [ text "failed" ]
