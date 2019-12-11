module Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Debug as Debug
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JP
import Pages.Recipe as Recipe exposing (Flags, Recipe)
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


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , recipes : Maybe (Dict String Recipe) -- Just recipes from flags
    }


init flags url key =
    case Decode.decodeValue Recipe.recipesDecoder flags.recipes of
        Ok recipes ->
            ( Model key url (Just recipes), Cmd.none )

        Err err ->
            let
                c =
                    Debug.log "error is" err
            in
            ( Model key url Nothing, Cmd.none )



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
        [ p [] [ text ("url is " ++ Url.toString model.url) ]
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
