module Main exposing (..)

-- FIXME: better names between RecipeSingle RecipeSinglePage and RecipeSingleMsg ?

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Pages.RecipeList as RecipeList
import Pages.RecipeSingle as RecipeSingle exposing (Msg(..))
import Pages.Router as Router exposing (..)
import Ui
import Url



-- MAIN


main : Program RecipeList.Flags Model Msg
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
    , recipes : Maybe (List RecipeSingle.Recipe)
    , route : Route
    , page : Page
    }


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | RecipeSingleMsg RecipeSingle.Msg
    | RecipeListMsg


init flags url key =
    case Decode.decodeValue RecipeList.decodeAll flags.recipes of
        Ok recipes ->
            let
                model =
                    Model key url (Just recipes) (Router.parseUrl url) NotFoundPage
            in
            initCurrentPage ( model, Cmd.none )

        Err _ ->
            let
                model =
                    Model key url Nothing (Router.parseUrl url) NotFoundPage
            in
            initCurrentPage ( model, Cmd.none )


initCurrentPage ( model, existingCmds ) =
    let
        ( currentPage, mappedPageCmds ) =
            case model.route of
                Router.NotFound ->
                    ( NotFoundPage, Cmd.none )

                Router.RecipeSingle recipeName ->
                    let
                        ( pageModel, pageCmds ) =
                            RecipeSingle.init model.recipes recipeName
                    in
                    ( RecipeSinglePage pageModel, Cmd.map RecipeSingleMsg pageCmds )

                RecipeList ->
                    let
                        ( pageModel, pageCmds ) =
                            RecipeList.init model.recipes
                    in
                    ( RecipeListPage pageModel, Cmd.none )
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
            let
                newRoute =
                    Router.parseUrl url
            in
            ( { model | route = newRoute }, Cmd.none )
                |> initCurrentPage

        ( RecipeSingleMsg subMsg, RecipeSinglePage pageModel ) ->
            let
                ( updatedPageModel, updatedCmd ) =
                    RecipeSingle.update subMsg pageModel
            in
            ( { model | page = RecipeSinglePage updatedPageModel }, Cmd.map RecipeSingleMsg updatedCmd )

        ( RecipeListMsg, RecipeListPage pageModel ) ->
            ( { model | page = RecipeListPage pageModel }, Cmd.none )

        -- FIXME: Placeholders
        ( RecipeSingleMsg _, NotFoundPage ) ->
            ( model, Cmd.none )

        ( _, _ ) ->
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
    , body = [ main_ [] [ viewNav model, viewCurrentPage model ] ]
    }


viewCurrentPage model =
    case model.page of
        RecipeSinglePage pageModel ->
            RecipeSingle.view pageModel |> Html.map RecipeSingleMsg

        RecipeListPage pageModel ->
            RecipeList.view pageModel

        NotFoundPage ->
            div [] [ text "not found 404" ]


viewNav : a -> Html msg
viewNav _ =
    nav [ class "Navbar" ]
        [ div [ class "nav-container" ]
            [ a [ class "name-icon links", href "/" ]
                [ div [] [ Ui.icon "c_home.svg" "48" "42" ]

                --, div [ class "link" ] []
                ]
            , div [ class "links" ]
                [--[ a [ class "link" ] [ text "About" ]
                 --, a [ class "link" ] [ text "Pantry" ]
                 --, a [ class "link" ] [ text "Support Ari    !" ]
                ]
            ]
        ]
