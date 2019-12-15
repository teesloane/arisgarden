module Update exposing (..)

import Browser
import Time exposing (..)
import Url


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SetCurrentStep Int
    | AddTimer Timer
    | TimerDec Posix



-- FIXME: find an appropriate place for this since putting it in
-- Recipe.elm would cause a circular import.


type alias Timer =
    { step : String
    , timeString : String
    , time : Int
    }
