module Util exposing (..)

{-| Fn: "00:20:45" -> 1245

TODO: I'm not sure if there is a better way to get access to the index of
a list in Elm. The original JS function looked like this:

.. this.strToSec = function(str) {
.... var a = str.split(":");
.... return +a[0] \* 60 \* 60 + +a[1] \* 60 + +a[2];
.. },

Also, I wish elmFmt would let this comment stick above the actual function. ಠ\_ಠ

-}


strToSec : String -> Int
strToSec str =
    let
        strToInt s =
            String.toInt s |> Maybe.withDefault 0

        sumInts =
            List.indexedMap
                (\index num ->
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
                (List.map strToInt (String.split ":" str))
                |> List.sum
    in
    sumInts


intToSec : Int -> String
intToSec totalSeconds =
    let
        strFmt num =
            if num < 10 then
                "0" ++ String.fromInt num

            else
                String.fromInt num

        totalSecondsFloat =
            toFloat totalSeconds

        hours =
            truncate <| totalSecondsFloat / 3600

        minutes =
            truncate <| (totalSecondsFloat - toFloat hours * 3600) / 60

        seconds =
            truncate <| totalSecondsFloat - (toFloat hours * 3600) - (toFloat minutes * 60)
    in
    strFmt hours ++ ":" ++ strFmt minutes ++ ":" ++ strFmt seconds


tern test a b =
    if test then
        a

    else
        b


cleanTime : String -> String
cleanTime t =
    if String.startsWith "00:0" t then
        String.dropLeft 4 t

    else if String.startsWith "00" t then
        String.dropLeft 3 t

    else if String.startsWith "0" t then
        String.dropLeft 1 t

    else
        t


{-| Group elements together, using a custom comparison test. Start a new group each time the comparison test doesn't hold for two adjacent elements.
groupWhileTransitively (<) [1,2,3,2,4,1,3,2,1] == [[1,2,3],[2,4],[1,3],[2],[1]]
source: <https://github.com/elm-community/list-extra/blob/7.1.0/src/List/Extra.elm#L1331>
-}
groupWhileTransitively : (a -> a -> Bool) -> List a -> List (List a)
groupWhileTransitively compare list =
    groupWhileTransitivelyHelp [] [] compare list


groupWhileTransitivelyHelp : List (List a) -> List a -> (a -> a -> Bool) -> List a -> List (List a)
groupWhileTransitivelyHelp result currentGroup compare list =
    case list of
        [] ->
            List.reverse <|
                if List.isEmpty currentGroup then
                    result

                else
                    List.reverse (currentGroup :: result)

        [ x ] ->
            List.reverse <|
                (List.reverse (x :: currentGroup) :: result)

        first :: ((second :: _) as rest) ->
            if compare first second then
                groupWhileTransitivelyHelp
                    result
                    (first :: currentGroup)
                    compare
                    rest

            else
                groupWhileTransitivelyHelp
                    (List.reverse (first :: currentGroup) :: result)
                    []
                    compare
                    rest
