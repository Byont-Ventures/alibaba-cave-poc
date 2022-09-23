# Getting Started

This is an interactive implementation of a well-known Zero-Knowledge Proof example called Ali Baba cave. It involves an interaction between two people: Peggy, a prover, (a red cube) and Victor, a verifier, (a green cube). It shows how Peggy can prove that she knows the word and Victor on the other hand can verify that using Zero-Knowledge Proof. 

This example is a part of series of blogs about Zero-Knowledge Proof which you can find here:

[Series about Zero-Knowledge Proof](https://www.byont.io/blog/zero-knowledge-proof-how-it-works-and-the-alibaba-cave-experiment)

# How it works

To begin with, there are two ways of using this modal: a normal way and a Turbo way. 

## Normal regime

1. Click on Peggy (a red cube). She will then follow a randomly chosen path. After that Victor (a green cube) will come to the paths.
2. Now click one of the paths you want to check from Victor's perspective. Then Peggy will come back using this path or another of if she got unlucky and didn't know the secret word.
3. According to how Peggy returned (with the path that Victor named or not), the Confidence (the one above the "cave") will either rise (if Peggy returned with the right path) or drop to 0% (if Peggy returned with the wrong path). Confidence shows Victor's confidence in the fact that Peggy really knows the secret word.
4. After that both Victor and Peggy will return to their initial positions. 
5. Now repeat the stops from step 1 to continue the modal.

## Turbo regime

Below the 3D scene you can see one toggle button and three normal buttons. To turn Turbo regime click "Turn ob Turbo" button. Then all the steps mentioned in the Normal regime will be executed automatically and faster. To turn the Turbo off you can press "Turn off Turbo" button. Then you can interact with the modal as in the Normal regime.

## Additional features

Among "Turn on Turbo" and "Turn off Turbo" buttons you can see two more buttons: a toggle button and a "Reset" button.

### Toggle button

Toggle button, as its label says, lets a user turn on and off the fact that Peggy knows the secret word. 
When the toggle button is "switched on" (with blue color), it means that Peggy knows the secret word and that she will always come back with a path that Victor names. If the toggle button is "switched off" (with white/no color), at some point Victor will learn that Peggy doesn't know the secret word and then a corresponding modal will appear.

### Reset button

"Reset" button allows a user to reset everything to its initial state, meaning that Peggy, Victor and the Door will go to their initial positions and the Confidence will be set back to 0. 

