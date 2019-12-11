module Pages.Recipe exposing (..)

import Debug
import Dict
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JP


-- TYPES --


type MealType = Vegetarian | Vegan


type alias Flags =
    { recipes : Decode.Value
    }


type alias Ingredient =
    { ingredient : String
    , quantity : String
    , unit : String
    , id : String
    }


type alias Instruction =
    { original : String
    }


type alias Recipe =
    { belongs_to : String -- "main" | "salad" etc
    , date_made : String
    , ease_of_making : String
    , imgs : List String
    , meal_type : MealType
    , rating : String
    , original_recipe : String
    , serves : String
    , slug : String
    , time : String
    , ingredients : List Ingredient
    , instructions : List Instruction
    }

             

-- DECODERS --


decodeInstruction =
    Decode.succeed Instruction
        |> JP.required "original" Decode.string


decoderIngredient =
    Decode.succeed Ingredient
        |> JP.required "ingredient" Decode.string
        |> JP.required "quantity" Decode.string
        |> JP.required "unit" Decode.string
        |> JP.required "id" Decode.string


recipesDecoder =
    Decode.dict decodeRecipe


decodeMealType =
    Decode.string
        |> Decode.andThen
            (\s ->
                case s of
                    "vegetarian" ->
                        Decode.succeed Vegetarian

                    "vegan" ->
                        Decode.succeed Vegan

                    _ ->
                        Decode.fail ("Unrecognized mealtype " ++ s)
            )


decodeRecipe : Decoder Recipe
decodeRecipe =
    Decode.succeed Recipe
        |> JP.required "belongs_to" Decode.string
        |> JP.required "date_made" Decode.string
        |> JP.required "ease_of_making" Decode.string
        |> JP.required "imgs" (Decode.list Decode.string)
        |> JP.required "meal_type" decodeMealType
        |> JP.required "rating" Decode.string
        |> JP.required "original_recipe" Decode.string
        |> JP.required "serves" Decode.string
        |> JP.required "slug" Decode.string
        |> JP.required "time" Decode.string
        |> JP.required "ingredients" (Decode.list decoderIngredient)
        |> JP.required "instructions" (Decode.list decodeInstruction)


-- VIEWS --

viewSingle model recipeName =
    unwrapRecipes
        model
        (\recipes ->
            case Dict.get recipeName recipes of
                Just recipe ->
                    section [] [
                         viewHero recipe.slug,
                         div [] [ text ("recipe found" ++ recipe.time) ]
                        ]

                Nothing ->
                    div [] [ text "RECIPE NOT FOUND! 404." ]
        )


viewList model =
    unwrapRecipes model
        (\recipes ->
            let
                rList recipe =
                    li [] [ a [href ("recipe/" ++ recipe.slug)] [text recipe.slug ]]
            in
            section [ class "RecipeList" ]
                [ ul [ class "columns" ] (List.map rList (Dict.values recipes))
                ]
        )


unwrapRecipes model fn =
    case model.recipes of
        Nothing ->
            div [] [ text "The recipes did not load. Go print a Debug.log in `init`" ]

        Just recipes ->
            fn recipes

viewHero slug =
    section
        [ class "viewHero"
        , style "background-image" "url('media/imgs/kimchi-udon-2.JPG')"
        ]
        []
