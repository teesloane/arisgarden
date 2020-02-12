module Pages.RecipeList exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode as Decode
import Pages.RecipeSingle exposing (MealType(..), Recipe, decodeRecipe)
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
      , filters =
            [ Filter False "Vegan"
            , Filter False "Ari's Favourites"
            , Filter False "Under 30 Minutes"
            ]
      }
    , Cmd.none
    )



-- Update --


type RecipeListMsg
    = HandleInput String
    | ToggleFilters
    | ToggleFilter Filter


update : RecipeListMsg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        HandleInput e ->
            ( { model | searchVal = e }, Cmd.none )

        ToggleFilters ->
            -- if we are closing our filters, remove all the selected ones.
            if model.filtersOpen == True then
                ( { model
                    | filtersOpen = False
                    , filters = List.map (\n -> { n | isOn = False }) model.filters
                  }
                , Cmd.none
                )

            else
                ( { model | filtersOpen = True }, Cmd.none )

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


viewHero : Html msg
viewHero =
    section [ class "home-hero" ]
        [ div [ class "content" ]
            [ div [ class "mainline" ] [ text "Ari's Garden" ]
            , div [ class "byline" ] [ text "Simple, to-the-point vegetarian and vegan recipes." ]
            ]
        ]


viewSearch : Model -> Html RecipeListMsg
viewSearch model =
    let
        sectionClass =
            Util.tern model.filtersOpen "section-search filter-open content" "section-search content"
    in
    section [ class sectionClass ]
        [ input
            [ class "input search-input"
            , placeholder "Search recipes..."
            , value model.searchVal
            , onInput HandleInput
            ]
            []
        , div [ class "filters-btn-wrap" ]
            [ Ui.btnToggle "Filters" ToggleFilters model.filtersOpen
            ]
        ]


viewFilters : Model -> Html RecipeListMsg
viewFilters model =
    let
        sectionClass =
            Util.tern model.filtersOpen "section-filters" "section-filters hide"

        buildToggles =
            \n -> div [ class "filter-btn-wrap" ] [ Ui.btnToggle n.name (ToggleFilter n) n.isOn ]
    in
    section [ class sectionClass ]
        (List.map buildToggles model.filters)


{-| <view> provides:

  - A hero
  - A search and filter section
  - The recipes as sorted by their categories.

-}
view : Model -> Html RecipeListMsg
view model =
    case model.recipes of
        Just recipes ->
            let
                matchSearch r =
                    String.contains (String.toLower model.searchVal) (String.toLower r.name)

                thing =
                    applyFilter model.filters recipes

                recipesFmt =
                    recipes
                        |> applyFilter model.filters
                        |> List.filter matchSearch
                        |> List.sortBy .belongs_to
                        |> Util.groupWhileTransitively (\a b -> a.belongs_to == b.belongs_to)

                getCategoryName sec =
                    case List.head sec of
                        Just r ->
                            r.belongs_to ++ " - ish"

                        Nothing ->
                            ""

                classColumn =
                    Util.tern (not <| model.searchVal == "") "columns col-1" "columns col-2"

                viewRecipe recipe =
                    li [] [ a [ href ("/recipe/" ++ recipe.slug) ] [ text recipe.name ] ]

                viewRecipeSection sec =
                    div []
                        [ h4 [ class "recipe-category" ] [ text <| getCategoryName sec ]
                        , ul [] (List.map viewRecipe sec)
                        ]
            in
            section [ class "RecipeList" ]
                [ viewHero
                , viewSearch model
                , viewFilters model
                , div [ class classColumn ] (List.map viewRecipeSection recipesFmt)
                ]

        _ ->
            div [] [ text "failed" ]



--  for each filter in model.filters, apply this -
-- recursively filter down the recipes based on what filters are active.


applyFilter : List Filter -> List Recipe -> List Recipe
applyFilter filters recipes =
    let
        filterRecipes r filter =
            if not filter.isOn then
                True

            else
                case filter.name of
                    "Vegan" ->
                        r.meal_type == Vegan

                    "Ari's Favourites" ->
                        r.rating == "5/5"

                    "Under 30 Minutes" ->
                        Util.strToSec r.time < 1800

                    _ ->
                        True
    in
    case filters of
        [] ->
            recipes

        x :: xs ->
            applyFilter xs (List.filter (\recipe -> filterRecipes recipe x) recipes)
