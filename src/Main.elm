module Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder, float, int, nullable, string)
import Json.Decode.Pipeline as Pipe exposing (hardcoded, optional, required)
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


type alias Flags =
    { recipes : List Recipe
    }


type alias Ingredient =
    { ingredient : String
    , quantity : String
    , unit : String
    , id : String
    }


type alias Instruction =
    {
    original: String
    }

-- type alias Content =


type alias Recipe =
    { belongs_to : String -- "main" | "salad" etc
    , date_made : String
    , ease_of_making : String
    , imgs : Maybe ( List String )
    , meal_type : String -- "Vegetarian | Vegan etc"
    , rating : String
    , original_recipe : String
    , serves : String
    , slug : String
    , time : String
    , ingredients : List Ingredient
    , instructions: List Instruction
    }



-- recipeDecoder : Decoder Recipe
-- recipeDecoder =
--     Decode.succeed Recipe
--         |> Pipe.required "belongs_to" string
--         |> Pipe.required "date_made" string
--         |> Pipe.required "ease_of_making" int
--         |> Pipe.required "imgs"
--         |> Pipe.required "ease_of_making" int
--         |> Pipe.required "ease_of_making" int
--         |> Pipe.required "ease_of_making" int


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , recipes : List Recipe -- Just recipes from flags
    }


init : Flags -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( Model key url flags.recipes,  Cmd.none )



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
    let
        x =
            "hi"

        -- x =
        --     Recipe "jo" "tues" 100 [ "hi", "20" ] "Vegetarian" 10 "orig recipe" 3 "slug" "twenty min"
        y =
            Debug.log "Recipe is "
    in
    li [] [ a [ href path ] [ text path ] ]



-- VIEWS VIEWS VIEWS


viewHero =
    section
        [ class "viewHero"
        , style "background-image" "url('./media/imgs/kimchi-udon-2.JPG')"
        ]
        [ text "hi" ]
