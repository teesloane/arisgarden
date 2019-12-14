module Util exposing (..)


strToSec str =
    let
        x =
            String.split ":" str

        y =
            Debug.log "X is " x

        intIt s =
            String.toInt s |> Maybe.withDefault 0

        z =
            List.indexedMap
                (\num index ->
                    case index of
                        0 ->
                            num * 60 * 60

                        1 ->
                            num * 60

                        2 ->
                            num

                        _ ->
                            num
                )
                (List.map intIt x)

        z2 =
            Debug.log "z is " z
    in
    "hello"
