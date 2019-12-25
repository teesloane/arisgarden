module Main exposing (..)

--import Pages.Recipe as Recipe exposing (Flags, Recipe)

import Browser
import Browser.Navigation as Nav
import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Pages.RecipeSingle as RS
import Pages.Router as Router exposing (..)
import Ui
import Url



-- MAIN


main : Program RS.Flags Model Msg
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
    , route : Route
    , page : Page
    }


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | RecipeSingleMsg RS.Msg



-- FIXME: remove need for "pseudo-maybe timer"


init flags url key =
    case Decode.decodeValue RS.recipesDecoder flags.recipes of
        Ok recipes ->
            let
                x =
                    Debug.log "recipes are " recipes

                model =
                    { key = key
                    , url = url
                    , route = Router.parseUrl url
                    , page = NotFoundPage
                    }

                commands =
                    Cmd.none
            in
            initCurrentPage ( model, Cmd.none ) recipes

        Err err ->
            let
                -- FIXME: Clean this up.
                x =
                    Debug.log "recipes are " err

                model =
                    { key = key
                    , url = url

                    --, recipes = Nothing
                    , route = Router.parseUrl url
                    , page = NotFoundPage
                    }

                commands =
                    Cmd.none
            in
            ( model, Cmd.none )


initCurrentPage ( model, existingCmds ) recipes =
    let
        ( currentPage, mappedPageCmds ) =
            case model.route of
                Router.NotFound ->
                    ( NotFoundPage, Cmd.none )

                Router.RecipeSingle recipeName ->
                    let
                        ( pageModel, pageCmds ) =
                            RS.init recipes recipeName
                    in
                    ( RecipeSinglePage pageModel, Cmd.map RecipeSingleMsg pageCmds )

                Home ->
                    ( RecipeListPage, Cmd.none )
    in
    ( { model | page = currentPage }
    , Cmd.batch [ existingCmds, mappedPageCmds ]
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model.page ) of
        ( LinkClicked urlRequest, _ ) ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        ( UrlChanged url, _ ) ->
            ( { model | url = url }, Cmd.none )

        ( RecipeSingleMsg subMsg, RecipeSinglePage pageModel ) ->
            let
                ( updatedPageModel, updatedCmd ) =
                    RS.update subMsg pageModel
            in
            ( { model | page = RecipeSinglePage updatedPageModel }, Cmd.map RecipeSingleMsg updatedCmd )

        ( RecipeSingleMsg subMsg, NotFoundPage ) ->
            ( model, Cmd.none )

        ( RecipeSingleMsg subMsg, RecipeListPage ) ->
            ( model, Cmd.none )



--
-- SUBSCRIPTIONS


timersRunning model =
    List.any (\t -> t.time > 0) model.timers



-- FIXME: implement this based on what page you are on.


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



--case timersRunning model of
--    True ->
--        Time.every 1000 RS.TimerDec
--
--    False ->
--        Sub.none
-- VIEW
--view : Model -> Browser.Document Msg


view model =
    { title = "Ari's Garden"
    , body =
        [ main_ []
            [ viewNav model
            , viewCurrentPage model
            ]
        ]
    }


viewCurrentPage model =
    case model.page of
        RecipeSinglePage pageModel ->
            --RS.view pageModel
            div [] [ text "yo" ]

        RecipeListPage ->
            div [] [ text "rlist page" ]

        --RecipeSingle.view
        NotFoundPage ->
            div [] [ text "not found" ]


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
