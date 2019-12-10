module Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Debug as Debug
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JP
import Pages.Router exposing (..)
import Url



-- MAIN


main : Program Flags Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }



-- MODEL


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


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , recipes : Dict String Recipe -- Just recipes from flags
    }


init flags url key =
    case Decode.decodeValue recipesDecoder flags.recipes of
        Ok recipes ->
            ( Model key url recipes, Cmd.none )

        Err err ->
            -- ( Model key url err,  Cmd.none )
            let
                y =
                    Dict.fromList [ ( "dummyRecipe", demoRecipe ) ]

                -- FIXME - This is not how you should handle a missing/failing decoded recipe
                b =
                    Debug.log "y is " y

                c =
                    Debug.log "error is" err
            in
            ( Model key url y, Cmd.none )



-- UPDATE


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = "URL Interceptor"
    , body =
        [ viewHero
        , p [] [ text ("url is " ++ (Url.toString model.url)) ]
        , ul []
            [ viewLink "/"
            , viewLink "/about"
            , router model
            ]
        ]
    }



viewLink : String -> Html msg
viewLink path =
    li [] [ a [ href path ] [ text path ] ]



-- VIEWS VIEWS VIEWS


viewHero =
    section
        [ class "viewHero"
        , style "background-image" "url('./media/imgs/kimchi-udon-2.JPG')"
        ]
        [ text "hi" ]
