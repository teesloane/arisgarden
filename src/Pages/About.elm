module Pages.About exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


aboutStr_1 =
    "Ari is a raccoon who used to eat a lot of trash. Now he's working hard to learn how to cook with just vegetables."


aboutStr_2 =
    "Cooking had never felt very easy or fun for Ari, so with lots of help, he works on finding and trying new recipes and putting them online."


view =
    section [ class "About" ]
        [ div [ class "container" ]
            [ viewHero
            , div [ class "text-img" ]
                [ div [ class "about-str" ] [ text aboutStr_1 ]
                , img [ src <| "/imgs/_ari_1.png" ] []
                ]
            , div [ class "text-img" ]
                [ img [ src <| "/imgs/_ari_2.png" ] []
                , div [ class "about-str" ] [ text aboutStr_2 ]
                ]
            ]
        ]


viewHero =
    section [ class "about-hero" ]
        [ div [ class "content" ]
            [ div [ class "mainline" ] [ text "About" ] ]
        ]
