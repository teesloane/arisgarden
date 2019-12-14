module Update exposing (..)

import Browser
import Url


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SetCurrentStep Int
    | AddTimer Timer


type alias Timer =
    { step : String
    , timeString : String
    , time : Int
    }
