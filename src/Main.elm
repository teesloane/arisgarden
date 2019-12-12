module Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JP
import Pages.Recipe as Recipe exposing (Flags, Recipe)
import Pages.Router exposing (..)
import Update exposing (Msg(..))
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


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , recipes : Maybe (Dict String Recipe) -- Just recipes from flags
    , currentStep : Int
    }


init flags url key =
    case Decode.decodeValue Recipe.recipesDecoder flags.recipes of
        Ok recipes ->
            ( Model key url (Just recipes) 0, Cmd.none )

        Err err ->
            ( Model key url Nothing 0, Cmd.none )



-- UPDATE
-- type Msg
--     = LinkClicked Browser.UrlRequest
--     | UrlChanged Url.Url
--     | SetCurrentStep Int


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
            ( { model | url = url, currentStep = 0 }
            , Cmd.none
            )

        SetCurrentStep index ->
            ( { model | currentStep = index }, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = "Ari's Garden"
    , body =
        [ router model
        ]
    }


viewLink : String -> Html msg
viewLink path =
    li [] [ a [ href path ] [ text path ] ]



-- VIEWS VIEWS VIEWS
