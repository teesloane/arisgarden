module Pages.About exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


aboutStr_1 =
    "Ari is a raccoon who used to eat a lot of trash. Now he's working hard to learn how to cook with just vegetables."


aboutStr_2 =
    "Cooking had never felt very easy or fun for Ari, so with lots of help, he works on finding and trying new recipes and putting them online."


view =
    section [ class "About" ]
        [ viewHero
         , div [ class "content" ]
            [
             h2 [] [ text "What is Ari's Garden?" ]
            , p [] [ text "Ari's Garden is a site dedicated to cataloguing vegetarian recipes (both original and adapted) and providing tools to making cooking easier and more fun. " ]
            , p [] [ text "We started this project to move ourselves toward healthier eating and away from bad habits." ]
            , p [] [ text "For adapted recipes, please get in touch if you would like them to be taken down; but please note that we do not monetize this site with ads or tracking and make sure to link back to the source materials." ]
            , h2 [] [ text "Who is Ari?" ]
            , p [] [ text aboutStr_1 ]
            , img [ src <| "/imgs/_aris_about.png" ] []
            , div [ class "about-str" ] [ text aboutStr_2 ]
            , section [ class "about-text" ]
                [ p []
                    [h2 [] [text "What machine?"]
                     , span [] [ text "Ari's Garden is built in the Elm programming language. All of the code for this site is available on " ]
                    , a [class "ext-link", href "https://github.com/theiceshelf/arisgarden"] [ text "Github." ]

                    ]
                ]
            ]
        ]


viewHero =
    section [ class "about-hero" ]
        [ div []
            [ div [ class "mainline" ] [ text "About" ] ]
        ]
