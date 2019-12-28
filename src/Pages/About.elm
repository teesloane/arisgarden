module Pages.About exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


aboutStr_1 =
    "Ari is a raccoon who used to eat a lot of trash. Now he's working hard to learn how to cook with just vegetables."


aboutStr_2 =
    "Cooking had never felt very easy or fun for Ari, so with lots of help, he works on finding and trying new recipes and putting them online."


view =
    section [ class "About" ]
        [ div [ class "content" ]
            [ viewHero
            , h2 [] [ text "What is Ari's Garden" ]
            , p [] [ text "Ari's Garden is a site dedicated to cataloguing vegetarian recipes (both original and adapted) and providing tools to making cooking easier and more fun. " ]
            , p [] [ text "Sally H. and Tyler S. started this project to move ourselves toward healthier eating and away from bad habits" ]
            , h2 [] [ text "Who is Ari?" ]
            , p [] [ text aboutStr_1 ]
            , img [ src <| "/imgs/_ari_1.png" ] []
            , div [ class "about-str" ] [ text aboutStr_2 ]
            , img [ src <| "/imgs/_ari_2.png" ] []
            , section [ class "about-text" ]
                [ p [] [ text "" ]
                ]
            ]
        ]


viewHero =
    section [ class "about-hero" ]
        [ div [ class "content" ]
            [ div [ class "mainline" ] [ text "About" ] ]
        ]
