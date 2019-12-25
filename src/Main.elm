module Main exposing (..)

-- FIXME: better names between RecipeSingle RecipeSinglePage and RecipeSingleMsg ?

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Pages.RecipeList as RecipeListPg
import Pages.RecipeSingle as RecipeSingle exposing (Msg(..))
import Pages.Router as Router exposing (..)
import Ui
import Url



-- MAIN


main : Program RecipeListPg.Flags Model Msg
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
    | RecipeSingleMsg RecipeSingle.Msg


init flags url key =
    let
        model =
            Model key url (Router.parseUrl url) NotFoundPage
    in
    case Decode.decodeValue RecipeListPg.decodeAll flags.recipes of
        Ok recipes ->
            initCurrentPage ( model, Cmd.none ) recipes

        Err _ ->
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
                            RecipeSingle.init recipes recipeName
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
    let
        x =
            Debug.log "message received" msg
    in
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
                    RecipeSingle.update subMsg pageModel
            in
            ( { model | page = RecipeSinglePage updatedPageModel }, Cmd.map RecipeSingleMsg updatedCmd )

        -- FIXME: Placeholders
        ( RecipeSingleMsg _, NotFoundPage ) ->
            ( model, Cmd.none )

        ( RecipeSingleMsg _, RecipeListPage ) ->
            ( model, Cmd.none )



-- SUBSCRIPTIONS --


subscriptions model =
    case model.page of
        RecipeSinglePage subModel ->
            RecipeSingle.subscriptions subModel |> Sub.map RecipeSingleMsg

        _ ->
            Sub.none



-- VIEW --


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
            RecipeSingle.view pageModel |> Html.map RecipeSingleMsg

        RecipeListPage ->
            div [] [ text "rlist page" ]

        NotFoundPage ->
            div [] [ text "not found 404" ]


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
