module Pages.Recipe exposing (..)

import Debug
import Dict
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JP


type MealType
    = Vegetarian
    | Vegan


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


demoIngredient =
    { ingredient = "", quantity = "", unit = "", id = "" }


demoInstruction =
    Instruction ""


demoRecipe =
    Recipe "." "." "." [ "." ] Vegan "." "." "." "." "." [ demoIngredient ] [ demoInstruction ]


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


recipeInstructionDecoder =
    Decode.succeed Instruction
        |> JP.required "original" Decode.string


recipeIngredientDecoder =
    Decode.succeed Ingredient
        |> JP.required "ingredient" Decode.string
        |> JP.required "quantity" Decode.string
        |> JP.required "unit" Decode.string
        |> JP.required "id" Decode.string


recipesDecoder =
    Decode.dict recipeDecoder


recipeMealTypeDecoder =
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


recipeDecoder : Decoder Recipe
recipeDecoder =
    Decode.succeed Recipe
        |> JP.required "belongs_to" Decode.string
        |> JP.required "date_made" Decode.string
        |> JP.required "ease_of_making" Decode.string
        |> JP.required "imgs" (Decode.list Decode.string)
        |> JP.required "meal_type" recipeMealTypeDecoder
        |> JP.required "rating" Decode.string
        |> JP.required "original_recipe" Decode.string
        |> JP.required "serves" Decode.string
        |> JP.required "slug" Decode.string
        |> JP.required "time" Decode.string
        |> JP.required "ingredients" (Decode.list recipeIngredientDecoder)
        |> JP.required "instructions" (Decode.list recipeInstructionDecoder)


viewSingle model recipe =
    case Dict.get recipe model.recipes of
        Just thing ->
            div [] [ text ("recipe found" ++ thing.time) ]

        Nothing ->
            div [] [ text "RECIPE NOT FOUND! 404." ]


viewList model =
    let
        rList recipe =
            li [] [ text recipe.slug ]
    in
    section [ class "RecipeList" ]
        [ ul [ class "columns" ] (List.map rList (Dict.values model.recipes))
        ]
