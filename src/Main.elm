port module Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Pages.Recipe as Recipe exposing (Flags, Recipe)
import Pages.RecipeSingle as RecipeSingle
import Pages.Router as Router exposing (..)
import Time
import Ui
import Update exposing (Msg(..), Timer)
import Url
import Util



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
    , route : Route
    , page : Page
    }



-- FIXME: remove need for "pseudo-maybe timer"


init flags url key =
    case Decode.decodeValue Recipe.recipesDecoder flags.recipes of
        Ok recipes ->
            let
                model =
                    { key = key
                    , url = url
                    , recipes = Just recipes
                    , currentStep = 0
                    , currentRecipe = Nothing
                    , timers = [ Timer "" "" 0 ]
                    , route = Router.parseUrl url
                    , page = NotFoundPage
                    }

                commands =
                    Cmd.none
            in
            --( model, commands )
            initCurrentPage model Cmd.none

        Err _ ->
            ( Model key url Nothing 0 Nothing [ Timer "" "" 0 ] (Router.parseUrl url), Cmd.none )


initCurrentPage : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
initCurrentPage ( model, existingCmds ) =
    let
        ( currentPage, mappedPageCmds ) =
            case model.route of
                Router.NotFound ->
                    ( NotFoundPage, Cmd.none )

                Router.RecipeSingle recipeName ->
                    let
                        ( pageModel, _ ) =
                            RecipeSingle.init
                    in
                    ( RecipeSinglePage pageModel, Cmd.none )

                Home ->
                    ( RecipeListPage, Cmd.none )
    in
    ( { model | page = currentPage }
    , Cmd.batch [ existingCmds, mappedPageCmds ]
    )


type BigMsg
    = RecipeSingleMsg RecipeSingle.Msg


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
            ( { model | url = url, currentStep = 0, timers = [ Timer "" "" 0 ] }, Cmd.none )

        SetCurrentStep index ->
            ( model, Cmd.none )

        RandomGot res ->
            ( model, Cmd.none )

        TimerAdd timer ->
            ( { model | timers = model.timers ++ [ timer ] }, Cmd.none )

        TimerDelete timer ->
            ( { model | timers = List.filter (\t -> t.step /= timer.step) model.timers }, Cmd.none )

        TimerDec _ ->
            let
                timeDec t =
                    Util.tern (t.time > 0) (t.time - 1) t.time

                u_timers =
                    List.map (\t -> { t | time = timeDec t }) model.timers
            in
            ( { model | timers = u_timers }, playSound model.timers )



-- SUBSCRIPTIONS


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
    { title = "Ari's Garden — " ++ routeName
    , body =
        [ main_ []
            [ viewNav model
            , route
            ]
        ]
    }


viewNav : a -> Html msg
viewNav _ =
    nav [ class "Navbar" ]
        [ div [ class "nav-container" ]
            [ a [ class "name-icon links", href "/" ]
                [ div [ style "margin-top" "4px" ] [ Ui.icon "c_home.svg" "48" ]
                , div [ class "link" ] [ text "Ari's Garden" ]
                ]

            --, div [ class "links" ]
            --    [ a [ class "link" ] [ text "About" ]
            --    ]
            ]
        ]



-- PORTS


port playSound : List Timer -> Cmd msg
