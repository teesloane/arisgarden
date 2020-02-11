module Pages.RecipeList exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode as Decode
import Pages.RecipeSingle exposing (Recipe, decodeRecipe)
import Ui
import Util


type alias Flags =
    { recipes : Decode.Value
    }


type alias Filter =
    { isOn : Bool
    , name : String
    }


type alias Model =
    { recipes : Maybe (List Recipe)
    , searchVal : String
    , filtersOpen : Bool
    , filters : List Filter
    }


decodeAll : Decode.Decoder (List Pages.RecipeSingle.Recipe)
decodeAll =
    Decode.list decodeRecipe


init recipes =
    ( { recipes = recipes
      , searchVal = ""
      , filtersOpen = False
      , filters = [ Filter False "Vegan", Filter False "Ari's Favourites" ]
      }
    , Cmd.none
    )



-- Update --
--


type RecipeListMsg
    = HandleInput String
    | ToggleFilters
    | ToggleFilter Filter



-- update : RecipeListMsg -> Model -> ( Model, Cmd msg )


update msg model =
    case msg of
        HandleInput e ->
            ( { model | searchVal = e }, Cmd.none )

        ToggleFilters ->
            ( { model | filtersOpen = not model.filtersOpen }, Cmd.none )

        ToggleFilter f ->
            let
                updatedFilters =
                    List.map
                        (\n ->
                            if n.name == f.name then
                                Filter (not n.isOn) n.name

                            else
                                n
                        )
                        model.filters
            in
            ( { model | filters = updatedFilters }, Cmd.none )



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
        , Ui.btn "FILTERS" ToggleFilters "secondary"

        -- , button [ class "button search-btn", onClick ToggleFilters ] [ text "FILTERS" ]
        ]


viewFilters model =
    let
        sectionClass =
            Util.tern model.filtersOpen "section-filters" "section-filters hide"
    in
    section [ class sectionClass ]
        (List.map (\n -> Ui.btnToggle n.name (ToggleFilter n) n.isOn) model.filters)



-- [ Ui.btnToggle "Vegan" ToggleFilters True
-- , Ui.btnToggle "Ari's Favourite" ToggleFilters True
-- ]


{-| <view> provides:

  - A hero
  - A search and filter section
  - The recipes as sorted by their categories.

-}
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
                , viewFilters model
                , div [ class "columns" ] (List.map sectionList groupedRecipes)
                ]

        _ ->
            div [] [ text "failed" ]
