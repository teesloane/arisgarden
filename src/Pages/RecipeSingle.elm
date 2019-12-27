port module Pages.RecipeSingle exposing (..)

--import Types exposing (Msg(..))

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline as JP
import Parser exposing (..)
import Time exposing (Posix)
import Ui as Ui
import Util


type alias Model =
    { step : Int
    , timers : List Timer
    , recipe : Maybe Recipe
    , modal : Modal
    }


type alias Modal =
    { open : Bool
    , content : Html RecipeSingleMsg
    }


type MealType
    = Vegetarian
    | Vegan


type alias Ingredient =
    { ingredient : String
    , quantity : String
    , unit : String
    , id : String
    }


type alias Commentary =
    { kind : String
    , val : List String
    }


type alias Recipe =
    { belongs_to : String -- "main" | "salad" etc -- FIXME: make this a union type.
    , date_made : String -- FIXME: real dates please.
    , ease_of_making : String
    , imgs : List String
    , meal_type : MealType
    , name : String
    , rating : String
    , original_recipe : String
    , serves : String
    , slug : String
    , time : String
    , ingredients : List Ingredient
    , instructions : List String
    , commentary : Commentary
    }


type alias Timer =
    { step : String
    , timeString : String
    , time : Int
    }


type RecipeSingleMsg
    = SetCurrentStep Int
    | TimerAdd Timer
    | TimerDelete Timer
    | TimerDec Posix
    | ModalClose
    | ModalOpen (Html RecipeSingleMsg)


{-| init takes "recipes" because we currently handle them in a batch from flags.
If we ever move to a rest API, then we would handle loading a single recipe from the parsed url
(and yes, have a much faster page load).
-}
init recipes recipeName =
    case recipes of
        Just recipes_ ->
            ( { step = 0
              , timers = [ Timer "" "" 0 ] -- FIXME: remove need for "pseudo-maybe timer"
              , recipe = List.head (List.filter (\r -> r.slug == recipeName) recipes_)
              , modal = Modal False (div [] [])
              }
            , Cmd.none
            )

        Nothing ->
            ( { step = 0
              , timers = [ Timer "" "" 0 ] -- FIXME: remove need for "pseudo-maybe timer"
              , recipe = Nothing
              , modal = Modal False (div [] [])
              }
            , Cmd.none
            )



-- PARSER --------------------------------------------------------------------------------------------------------------


type alias InstructionParsed =
    { timer : Timer
    , chunks : List InstructionChunk
    }


type alias InstructionChunk =
    { id : String
    , val : String
    }


{-| Parses the timer that MAY exist at the beginning of an instruction string
There are some hacks here because I still don't entirely understand parsing. (see timerType)

[&: 00:05:00] Cook the onions for 5 minutes.
^-----------^-------------------------------

-}
parseTimer =
    oneOf
        [ succeed Timer
            |. spaces
            |. symbol "[&:"
            |. spaces
            |= (getChompedString <| chompUntil "|")
            |. symbol "|"
            |. spaces
            |= (getChompedString <| chompUntil "]")
            |. symbol "]"
            |= succeed 0
            |> andThen
                (\res ->
                    succeed <|
                        { res
                            | step = String.trim res.step
                            , time = Util.strToSec res.timeString
                        }
                )
        , succeed Timer
            |= succeed ""
            |= succeed ""
            |= succeed 0
        ]


parseChunk =
    Parser.loop [] parseChunkHelp


parseChunkHelp revStmts =
    oneOf
        [ succeed (\stmt -> Loop (stmt :: revStmts))
            |= parseIngredientChunk
        , succeed (\stmt -> Loop (stmt :: revStmts))
            |= parseUntilIngredient
        , succeed (\stmt -> Loop (stmt :: revStmts))
            |= parseUntilPeriod
        , succeed ()
            |> Parser.map (\_ -> Done (List.reverse revStmts))
        ]


{-| Parses an instruction string until it reaches an ingredient:
Get a bowl and chop [#: c | celery ] into ....
--------------------^-------------------------
-}
parseUntilIngredient =
    succeed InstructionChunk
        |= succeed ""
        |= (getChompedString <| chompUntil "[")
        |. chompIf (\c -> c == '[')


{-| Parses an instruction string until it reaches an ingredient:
Mix the soup until it warms evenly through.
------------------------------------------^-----

This is necessary for parsing normal strings after all ingreidents
have been parsed by `parseIngredientChunk` or for steps that
don't have any ingredients that need to be parsed in the first place.

-}
parseUntilPeriod =
    succeed InstructionChunk
        |= succeed ""
        |= (getChompedString <| chompUntil ".")
        |. chompIf (\c -> c == '.')
        |> andThen (\res -> succeed <| { res | val = String.append res.val "." })


{-| Parses an ingredient from the instruction string
Get a bowl and chop [#: c | celery ] into ....
------------------- ^==============^ ------

creates an InstructionChunk of {id: "c", val: "celery"}

andThen, in the case that the original string has excess space in the markup:

...and chop [#:...c |... celery ] ...)
...------------^^^---^^^-------------

trim any excess whitespace around the id and the val
{id: " c ", val: " celery "} -> {id: "c", val: "celery"}

-}
parseIngredientChunk =
    succeed InstructionChunk
        |. symbol "#:"
        |. spaces
        |= (getChompedString <| chompUntil " ")
        |. spaces
        |. symbol "|"
        |. spaces
        |= (getChompedString <| chompUntil "]")
        |. symbol "]"
        |> andThen
            (\res -> succeed <| { res | val = String.trim res.val, id = String.trim res.id })


{-| Groups parsers together to result in creating an InstructionParsed type.
-}
parseEverything : Parser InstructionParsed
parseEverything =
    succeed InstructionParsed
        |= parseTimer
        |= parseChunk


runParser str =
    Parser.run parseEverything str



-- DECODERS / ENCODERS --


decoderIngredient : Decoder Ingredient
decoderIngredient =
    Decode.succeed Ingredient
        |> JP.required "ingredient" Decode.string
        |> JP.required "quantity" Decode.string
        |> JP.required "unit" Decode.string
        |> JP.required "id" Decode.string


decodeCommentary : Decoder Commentary
decodeCommentary =
    Decode.succeed Commentary
        |> JP.required "kind" Decode.string
        |> JP.required "val" (Decode.list Decode.string)


decodeMealType : Decoder MealType
decodeMealType =
    Decode.string
        |> Decode.andThen
            (\s ->
                case s of
                    "vegetarian" ->
                        Decode.succeed Vegetarian

                    "vegan" ->
                        Decode.succeed Vegan

                    _ ->
                        Decode.fail ("Unrecognized mealtype " ++ s)
            )


decodeRecipe : Decoder Recipe
decodeRecipe =
    Decode.succeed Recipe
        |> JP.required "belongs_to" Decode.string
        |> JP.required "date_made" Decode.string
        |> JP.required "ease_of_making" Decode.string
        |> JP.required "imgs" (Decode.list Decode.string)
        |> JP.required "meal_type" decodeMealType
        |> JP.required "name" Decode.string
        |> JP.required "rating" Decode.string
        |> JP.required "original_recipe" Decode.string
        |> JP.required "serves" Decode.string
        |> JP.required "slug" Decode.string
        |> JP.required "time" Decode.string
        |> JP.required "ingredients" (Decode.list decoderIngredient)
        |> JP.required "instructions" (Decode.list Decode.string)
        |> JP.required "commentary" decodeCommentary



-- Logic, Getters --


mealType m =
    case m of
        Vegetarian ->
            "Vegetarian"

        Vegan ->
            "Vegan"



-- UPDATE --------------------------------------------------------------------


update : RecipeSingleMsg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        SetCurrentStep index ->
            ( { model | step = index }, Cmd.none )

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

        ModalClose ->
            ( { model | modal = Modal False (div [] []) }, Cmd.none )

        ModalOpen markup ->
            let
                newModal =
                    Modal True markup
            in
            ( { model | modal = newModal }, Cmd.none )



-- VIEWS --


viewHero : Recipe -> Html msg
viewHero recipe =
    let
        url =
            "url(/imgs/" ++ recipe.slug ++ "-hero.JPG)"

        gradient =
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%)"

        finalStyle =
            gradient ++ ", " ++ url

        cleanTime t =
            if String.startsWith "00:0" t then
                String.dropLeft 4 t

            else if String.startsWith "00" t then
                String.dropLeft 3 t

            else if String.startsWith "0" t then
                String.dropLeft 1 t

            else
                t

        recipeName =
            div [ class "vh-recipe-name" ] [ text recipe.name ]

        links =
            [ { el = li [] [ text <| "Serves: " ++ recipe.serves ], show = True }
            , { el = li [] [ text <| "Time: " ++ cleanTime recipe.time ], show = True }
            , { el = li [] [ text <| mealType recipe.meal_type ], show = True }
            , { el = li [] [ text <| "Rating: " ++ recipe.rating ], show = True }
            , { el = li [] [ a [ class "link", href recipe.original_recipe ] [ text "Inspiration →" ] ], show = not <| String.isEmpty recipe.original_recipe }
            ]
    in
    section
        [ class "viewHero", style "background-image" finalStyle ]
        [ div [ class "vh-container" ]
            [ recipeName
            , ul [ class "vh-metadata" ] <|
                List.map
                    (\a -> a.el)
                    (List.filter (\n -> n.show) links)
            ]
        ]


{-| displays timers in the bottom left of the screen.
-}
viewTimers : List Timer -> Html RecipeSingleMsg
viewTimers timers =
    let
        filteredTimers =
            List.filter (\t -> t.time > 0) timers

        timerMarkup t =
            div [ class "timer" ]
                [ div [ class "time-string" ] [ text (t.step ++ ": " ++ Util.intToSec t.time) ]
                , div [ class "close-btn", onClick (TimerDelete t) ] [ text "×" ]
                ]

        mappedTimers =
            List.map timerMarkup filteredTimers
    in
    div [ class "timers" ] mappedTimers


viewImages : Recipe -> Html msg
viewImages recipe =
    let
        mapImages i =
            div
                [ class "photo"
                , style "background-image" ("url(/imgs/" ++ recipe.slug ++ "-" ++ i)
                ]
                []
    in
    if List.length recipe.imgs > 0 then
        section [ class "photos" ] (List.map mapImages recipe.imgs)

    else
        div [] []


{-| viewInstructions does a few things:

  - Parse and display a recipe's instructions.
  - Handle rendering the timer and active step.
  - Handle creation of timers.
  - FIXME: rename :"chunk"
  - FIXME: don't nest let blocks if possible.

-}
viewInstructions : Model -> Recipe -> Html RecipeSingleMsg
viewInstructions model recipe =
    let
        timerExists chunk =
            not <| List.any (\n -> n.step == chunk.timer.step) model.timers

        getIngredientQuantity chunk =
            let
                ingr =
                    List.filter (\n -> n.id == chunk.id) recipe.ingredients

                val =
                    List.head ingr
            in
            case val of
                Just v ->
                    ( v.quantity ++ " " ++ v.unit
                    , div []
                        [ h1 [] [ text <| v.quantity ++ " " ++ v.unit ]
                        , h4 [] [ text <| v.ingredient ]
                        ]
                    )

                Nothing ->
                    ( "", div [] [] )

        buildInstructions parsedInstructions =
            let
                makeTimer chunk =
                    if timerExists chunk then
                        div [ class "timer-icon", onClick (TimerAdd chunk.timer) ] []

                    else
                        div [ class "timer-null" ] []

                getToolTip i =
                    Tuple.first <| getIngredientQuantity i

                htmlModal i =
                    Tuple.second <| getIngredientQuantity i

                makeInstruction i =
                    if String.isEmpty i.id then
                        span [] [ text i.val ]

                    else
                        span
                            [ class "bold", onClick (ModalOpen <| htmlModal i) ]
                            [ span [ class "tooltipped tooltipped-n", attribute "aria-label" <| getToolTip i ] [ text i.val ] ]
            in
            case parsedInstructions of
                Ok c ->
                    div [ class "instruction-and-timer" ]
                        [ div [ class "instruction-compiled" ] (List.map makeInstruction c.chunks)
                        , makeTimer c
                        ]

                Err _ ->
                    div [] [ text <| Debug.toString parsedInstructions ]

        mapInstructions index el =
            let
                stepNum =
                    (String.fromInt <| (1 + index)) ++ ". "

                stepText =
                    div []
                        [ div [ style "display" "flex" ]
                            [ span [ class "instruction-num" ] [ text stepNum ]
                            , buildInstructions <| runParser el
                            ]
                        ]
            in
            div
                [ class <| Util.tern (model.step == index) "instruction active" "instruction"
                , onClick (SetCurrentStep index)
                ]
                [ stepText ]
    in
    section [ class "instr-ingr-section", style "flex" "1.5" ]
        [ Ui.sectionHeading "Instructions"
        , div [ class "instructions-group" ]
            [ div [] (List.indexedMap mapInstructions recipe.instructions)
            ]
        ]


viewIngredients : Recipe -> Html msg
viewIngredients recipe =
    let
        mapIngr i =
            div [ class "ingredient" ]
                [ div [ class "name" ] [ text i.ingredient ]
                , div [ class "quant-unit" ]
                    [ div [ class "quant" ] [ text i.quantity ]
                    , div [ class "unit" ] [ text i.unit ]
                    ]
                ]
    in
    section [ class "instr-ingr-section" ]
        [ Ui.sectionHeading "Ingredients"
        , div [ class "ingredients" ]
            [ div [ class "instructions-list" ] (List.map mapIngr recipe.ingredients)
            ]
        ]


view : Model -> Html RecipeSingleMsg
view model =
    let
        viewIngrAndInstr recipe =
            div [ class "instruction-ingredients" ]
                [ viewInstructions model recipe -- recipe model.timers model.step
                , div [ class "separator" ] []
                , viewIngredients recipe
                , viewTimers model.timers
                ]
    in
    case model.recipe of
        Just recipe ->
            section [ class "RecipeSingle" ]
                [ viewHero recipe
                , viewModal model.modal
                , section [ class "container" ]
                    [ viewIngrAndInstr recipe
                    , viewImages recipe
                    , viewCommentary recipe.commentary
                    ]
                ]

        Nothing ->
            -- FIXME: Add a 404 redirect.
            div [] [ text "RECIPE NOT FOUND! 404." ]


{-| Handles rendering the "Commentary" of a recipe
-}
viewCommentary : Commentary -> Html msg
viewCommentary commentary =
    let
        { kind, val } =
            commentary

        mappedVal =
            List.map (\c -> div [ class "item" ] [ text c ]) val

        separator =
            case kind of
                "whisper" ->
                    "፨"

                "big-quote" ->
                    "“"

                "haiku" ->
                    "&"

                "blurb" ->
                    "⌂"

                "dialogue" ->
                    "⍥"

                _ ->
                    "&"
    in
    section [ class "commentary" ]
        [ viewHr separator
        , div [ class kind ] mappedVal
        ]


viewHr : String -> Html msg
viewHr char =
    div [ class "delta-hr" ]
        [ div [ class "border" ] []
        , div [ class "delta" ] [ text char ]
        , div [ class "border" ] []
        ]


viewModal modal =
    if modal.open then
        div [ class "modal" ]
            [ div [ class "content" ]
                [ div [ class "sidebar", onClick ModalClose ]
                    [ span [ class "close" ]
                        [ text "×" ]
                    ]
                , div [ class "body" ]
                    [ modal.content ]
                ]
            ]

    else
        div [ class "modal-closed" ] []



-- SUBS & PORTS ----------------------------------------------------------------


timersRunning : List Timer -> Bool
timersRunning timers =
    List.any (\t -> t.time > 0) timers


subscriptions : Model -> Sub RecipeSingleMsg
subscriptions model =
    case timersRunning model.timers of
        True ->
            Time.every 1000 TimerDec

        False ->
            Sub.none


port playSound : List Timer -> Cmd msg
