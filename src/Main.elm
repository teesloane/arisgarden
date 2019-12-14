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
import Update exposing (Msg(..), Timer)
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
    , recipes : Maybe (Dict String Recipe)
    , currentStep : Int
    , currentRecipe : Maybe String
    , timers : List Timer
    }


init flags url key =
    case Decode.decodeValue Recipe.recipesDecoder flags.recipes of
        Ok recipes ->
            ( Model key url (Just recipes) 0 Nothing [ Timer "" "" 0 ], Cmd.none )

        Err err ->
            ( Model key url Nothing 0 Nothing [ Timer "" "" 0 ], Cmd.none )


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
            ( { model | url = url, currentStep = 0 }, Cmd.none )

        SetCurrentStep index ->
            ( { model | currentStep = index }, Cmd.none )

        AddTimer timer ->
            let
                x =
                    Debug.log "ADD TIMER UPDATE CALLED" timer
            in
            ( { model | timers = model.timers ++ [ timer ] }, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
    let
        ( route, routeName ) =
            router model
    in
    { title = "Ari's Garden — " ++ routeName, body = [ route ] }
