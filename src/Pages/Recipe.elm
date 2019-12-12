module Pages.Recipe exposing (..)

import Dict
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JP
import Update exposing (Msg(..))
import Ui as Ui



-- TYPES --


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


type alias Recipe =
    { belongs_to : String -- "main" | "salad" etc
    , date_made : String
    , ease_of_making : String
    , imgs : List String
    , meal_type : MealType
    , name : String
    , rating : String
    , original_recipe : String
    , serves : String
    , slug : String
    , time : String
    , ingredients : List Ingredient
    , instructions : List Instruction
    }



-- DECODERS --


decodeInstruction : Decoder Instruction
decodeInstruction =
    Decode.succeed Instruction
        |> JP.required "original" Decode.string


decoderIngredient : Decoder Ingredient
decoderIngredient =
    Decode.succeed Ingredient
        |> JP.required "ingredient" Decode.string
        |> JP.required "quantity" Decode.string
        |> JP.required "unit" Decode.string
        |> JP.required "id" Decode.string


recipesDecoder : Decoder (Dict.Dict String Recipe)
recipesDecoder =
    Decode.dict decodeRecipe


decodeMealType : Decoder MealType
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
        |> JP.required "name" Decode.string
        |> JP.required "rating" Decode.string
        |> JP.required "original_recipe" Decode.string
        |> JP.required "serves" Decode.string
        |> JP.required "slug" Decode.string
        |> JP.required "time" Decode.string
        |> JP.required "ingredients" (Decode.list decoderIngredient)
        |> JP.required "instructions" (Decode.list decodeInstruction)



-- VIEWS --


unwrapRecipes model fn =
    case model.recipes of
        Nothing ->
            div [] [ text "The recipes did not load. Go print a Debug.log in `init`" ]

        Just recipes ->
            fn recipes


viewHero recipe =
    let
        url =
            "url(/imgs/" ++ recipe.slug ++ "-hero.JPG)"
    in
    section
        [ class "viewHero"
        , style "background-image" url
        ]
        []



-- Page: RecipeList ------------------------------------------------------------


viewList model =
    unwrapRecipes model
        (\recipes ->
            let
                rList recipe =
                    li [] [ a [ href ("recipe/" ++ recipe.slug) ] [ text recipe.name ] ]
            in
            section [ class "RecipeList" ]
                [ ul [ class "columns" ] (List.map rList (Dict.values recipes))
                ]
        )



{-
   *
   * Page: RecipeSingle -----------------------------------------------------------
   *
-}


viewImages : Recipe -> Html msg
viewImages recipe =
    let
        mapImgs i =
            div
                [ class "photo"
                , style "background-image" ("url(/imgs/" ++ recipe.slug ++ "-" ++ i)
                ]
                []
    in
    section [ class "photos" ] (List.map mapImgs recipe.imgs)


-- viewInstructions : Recipe -> Int -> Html msg
viewInstructions recipe activeStep =
    let
        mapInstructions index el =
            let
                activeClass = if activeStep == index then "instruction active" else "instruction"
                stepText = [text ((String.fromInt <| (1 + index)) ++ ". " ++ el.original)]
            in
            div [ class activeClass, onClick (SetCurrentStep index) ] stepText
    in
    section [ class "instr-ingr-section", style "flex" "2"]
        [ Ui.sectionHeading "Instructions"
        , div [ class "instructions" ]
            [ div [] (List.indexedMap mapInstructions recipe.instructions)
            ]
        ]


viewIngredients : Recipe -> Html msg
viewIngredients recipe =
    let
        mapIngr i =
            div [ class "ingredient" ]
                [ div [ class "name" ] [ text i.ingredient ]
                , div [ class "quant-unit" ]
                    [ div [ class "quant" ] [ text i.quantity ]
                    , div [ class "unit" ] [ text i.unit ]
                    ]
                ]
    in
    section [ class "instr-ingr-section" ]
        [ Ui.sectionHeading "Ingredients"
        , div [ class "ingredients" ]
            [ div [ class "instructions-list" ] (List.map mapIngr recipe.ingredients)
            ]
        ]


viewSingle model recipeName =
    let
        viewIngrAndInstr recipe =
            div [ class "instruction-ingredients" ]
                [ viewInstructions recipe model.currentStep
                , div [ class "separator" ] []
                , viewIngredients recipe
                ]
    in
    unwrapRecipes
        model
        (\recipes ->
            case Dict.get recipeName recipes of
                Just recipe ->
                    section [ class "RecipeSingle" ]
                        [ viewHero recipe
                        , section [ class "container" ]
                            [ viewIngrAndInstr recipe
                            , viewImages recipe
                            ]
                        ]

                Nothing ->
                    -- FIXME: Add a 404 redirect.
                    div [] [ text "RECIPE NOT FOUND! 404." ]
        )
