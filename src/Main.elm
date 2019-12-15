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
import Time
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
            ( { model | timers = model.timers ++ [ timer ] }, Cmd.none )

        TimerDec _ ->
            -- FIXME: clean this mess.
            let
                u_timers =
                    List.map
                        (\t ->
                            { t
                                | time =
                                    if t.time > 0 then
                                        t.time - 1

                                    else
                                        t.time
                            }
                        )
                        model.timers
            in
            ( { model | timers = u_timers }, Cmd.none )



-- SUBSCRIPTIONS
--
-- loop through timers and check if any times are > 0


timersRunning model =
    List.any (\t -> t.time > 0) model.timers


subscriptions : Model -> Sub Msg
subscriptions model =
    case timersRunning model of
        True ->
            Time.every 1000 TimerDec

        False ->
            Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
    let
        ( route, routeName ) =
            router model
    in
    { title = "Ari's Garden — " ++ routeName, body = [ route ] }
