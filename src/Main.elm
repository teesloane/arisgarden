module Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Pages.Router exposing (..)
import Url
import Json.Decode



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
--
--

type alias Flags =   
    {
        recipes: Json.Decode.Value
    }

type alias Ingredient =
    { name : String
    , quantity : Int
    , global_id : String
    , group : String
    }


type alias Instruction =
    String


type alias Recipe =
    { belongs_to : String -- "main" | "salad" etc
    , date_made : String
    , ease_of_making : Int
    , imgs : List String
    , meal_type : String -- "Vegetarian | Vegan etc"
    , rating : Int
    , original_recipe : String
    , serves : Int
    , slug : String
    , time : String

    -- , ingredients : List Ingredient
    }


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    }                


init : Flags -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( Model key url, Cmd.none )



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
        x = "hi"
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
