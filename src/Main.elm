module Main exposing (..)

import Browser
import Browser.Dom
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode exposing (Decoder)
import Pages.About as About
import Pages.NotFound
import Pages.RecipeList as RecipeList
import Pages.RecipeSingle as RecipeSingle
import Pages.Router as Router exposing (..)
import Task
import Types as T
import Ui
import Url



-- MAIN


main : Program RecipeList.Flags Model T.Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = T.UrlChanged
        , onUrlRequest = T.LinkClicked
        }



-- MODEL


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , recipes : Maybe (List RecipeSingle.Recipe)
    , route : Route
    , page : Page
    }


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


{-| initCurrentPage cases over the possible model.routes,
returning the model and the commands for each possible sub page.

TODO: type annotations
TODO: maybe move this to the router, or at least, the case model.route...
-}
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
                    ( RecipeSinglePage pageModel, Cmd.map T.RecipeSingleMsg pageCmds )

                Router.RecipeList ->
                    let
                        ( pageModel, pageCmds ) =
                            RecipeList.init model.recipes
                    in
                    ( RecipeListPage pageModel, Cmd.map T.RecipeListMsg pageCmds )

                Router.About ->
                    ( AboutPage, Cmd.none )
    in
    ( { model | page = currentPage }
    , Cmd.batch [ existingCmds, mappedPageCmds ]
    )


{-| The main update function for the application.
It aggregates all the sub-update functions of each page.

For each possible permutation of the union type of Msg + model.page,
we pass the state into the update functions of the sub-update on each page.

-}
update : T.Msg -> Model -> ( Model, Cmd T.Msg )
update msg model =
    case ( msg, model.page ) of
        ( T.LinkClicked urlRequest, _ ) ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        ( T.UrlChanged url, _ ) ->
            let
                newRoute =
                    Router.parseUrl url
            in
            ( { model | route = newRoute }, Task.perform (\_ -> T.NoOp) <| Browser.Dom.setViewport 0 0 )
                |> initCurrentPage

        ( T.RecipeSingleMsg subMsg, RecipeSinglePage pageModel ) ->
            let
                ( updatedPageModel, updatedCmd ) =
                    RecipeSingle.update subMsg pageModel
            in
            ( { model | page = RecipeSinglePage updatedPageModel }, Cmd.map T.RecipeSingleMsg updatedCmd )

        ( T.RecipeListMsg subMsg, RecipeListPage pageModel ) ->
            let
                ( updatedPageModel, updatedCmd ) =
                    RecipeList.update subMsg pageModel
            in
            ( { model | page = RecipeListPage pageModel }, Cmd.map T.RecipeListMsg updatedCmd )

        ( _, _ ) ->
            ( model, Cmd.none )



-- SUBSCRIPTIONS --


subscriptions : Model -> Sub T.Msg
subscriptions model =
    case model.page of
        RecipeSinglePage subModel ->
            RecipeSingle.subscriptions subModel |> Sub.map T.RecipeSingleMsg

        _ ->
            Sub.none



-- VIEW --


view model =
    { title = "Ari's Garden"
    , body =
        [ main_ [ class "main" ]
            [ viewNav model
            , div [ class "currentPage" ] [ viewCurrentPage model ]
            , div [ class "footer" ]
                [ div [] [ text "Built by \u{00A0}" ]
                , a [ class "link", target "_blank", href "https://theiceshelf.com" ] [ text "The Ice Shelf" ]
                , a [ target "_blank", class "link", href "https://github.com/theiceshelf/arisgarden" ] [ Ui.icon "github.svg" "20" "20" ]
                , a [ target "_blank", class "link", href "https://twitter.com/theiceshelf" ] [ Ui.icon "twitter.svg" "20" "20" ]
                ]
            ]
        ]
    }


viewCurrentPage model =
    case model.page of
        RecipeSinglePage pageModel ->
            RecipeSingle.view pageModel |> Html.map T.RecipeSingleMsg

        RecipeListPage pageModel ->
            RecipeList.view pageModel |> Html.map T.RecipeListMsg

        AboutPage ->
            About.view

        NotFoundPage ->
            Pages.NotFound.view


viewNav : a -> Html msg
viewNav _ =
    nav [ class "Navbar" ]
        [ div [ class "nav-container" ]
            [ a [ class "name-icon", href "/" ]
                [ Ui.icon "c_home.svg" "46" "38"
                , div [ class "link" ] [ text "Ari's Garden" ]
                ]
            , div [ class "links" ]
                [ a [ href "/about", class "link" ] [ text "About" ]

                --, a [ class "link" ] [ text "Pantry" ]
                -- , a [ class "link" ] [ text "Support Ari    !" ]
                ]
            ]
        ]
