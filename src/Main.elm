module Main exposing (..)

-- import Json.Decode.Pipeline as Pipe exposing (hardcoded, optional, required)

import Browser
import Browser.Navigation as Nav
import Debug as Debug
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder, float, int, nullable, string)
import Json.Decode.Pipeline as JP
import Pages.Router exposing (..)
import Dict exposing (Dict)
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



-- type alias Content =


demoIngredient =
    { ingredient = "", quantity = "", unit = "", id = "" }


demoInstruction =
    Instruction ""


demoRecipe =
    Recipe "." "." "." [ "." ] "." "." "." "." "." "." [ demoIngredient ] [ demoInstruction ]


type alias Recipe =
    { belongs_to : String -- "main" | "salad" etc
    , date_made : String
    , ease_of_making : String
    , imgs : List String
    , meal_type : String -- "Vegetarian | Vegan etc"
    , rating : String
    , original_recipe : String
    , serves : String
    , slug : String
    , time : String
    , ingredients : List Ingredient
    , instructions : List Instruction
    }



-- recipeInstructionDecoder: Decoder Instruction


recipeInstructionDecoder =
    Decode.succeed Instruction
        |> JP.required "original" string



-- recipeIngredientDecoder: Decoder Ingredient


recipeIngredientDecoder =
    Decode.succeed Ingredient
        |> JP.required "ingredient" string
        |> JP.required "quantity" string
        |> JP.required "unit" string
        |> JP.required "id" string


recipesDecoder =
    Decode.dict recipeDecoder


recipeDecoder : Decoder Recipe
recipeDecoder =
    Decode.succeed Recipe
        |> JP.required "belongs_to" string
        |> JP.required "date_made" string
        |> JP.required "ease_of_making" string
        |> JP.required "imgs" (Decode.list string)
        |> JP.required "meal_type" string
        |> JP.required "rating" string
        |> JP.required "original_recipe" string
        |> JP.required "serves" string
        |> JP.required "slug" string
        |> JP.required "time" string
        |> JP.required "ingredients" (Decode.list recipeIngredientDecoder)
        |> JP.required "instructions" (Decode.list recipeInstructionDecoder)


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , recipes : Dict String Recipe -- Just recipes from flags
    }



-- init : Flags -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
-- init flags url key =
--     ( Model key url flags.recipes,  Cmd.none )
--


init flags url key =
    case Decode.decodeValue recipesDecoder flags.recipes of
        Ok recipes ->
            ( Model key url recipes, Cmd.none )

        Err err ->
            -- ( Model key url err,  Cmd.none )
            let
                y = Dict.fromList [("dummyRecipe", demoRecipe)]
                b = Debug.log "y is " y
                c = Debug.log "error is" err
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
        , text "The current URL is: "
        , b [] [ text (Url.toString model.url) ]
        , ul []
            [ viewLink "/"
            , viewLink "/about"
            , router model.url
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
