module Pages.RecipeSingle exposing (..)

import Time exposing (Posix)


type alias Model =
    { step : Int
    , timers : List Timer
    }


type alias Timer =
    { step : String
    , timeString : String
    , time : Int
    }


type Msg
    = SetCurrentStep Int
    | TimerAdd Timer
    | TimerDelete Timer
    | TimerDec Posix



--init : a -> ( Model, Cmd msg )


init =
    ( { step = 0, timers = [ Timer "" "" 0 ] }, Cmd.none )
