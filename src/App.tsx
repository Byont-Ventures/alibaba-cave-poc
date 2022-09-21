import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import './App.css';
import {Canvas, ThreeElements, useFrame} from '@react-three/fiber'
import THREE from 'three';
import {OrbitControls, RoundedBox, Sphere, Text} from '@react-three/drei';
import { Form } from 'react-bootstrap';
import {Peggy} from "./components/Peggy";
import {Victor} from "./components/Victor";
import Door from "./components/Door";
import Confidence from "./components/Confidence";

function victorResponds (peggyPath: string, victorPath: string, secretWord: boolean) {
    if (peggyPath !== victorPath && !secretWord) {
        return "Liar"
    }
    return "Ok"
}

function App() {
    const [hoveredP1, hoverP1] = useState(false)
    const [hoveredP2, hoverP2] = useState(false)
    const [clickedP1, clickP1] = useState(false)
    const [clickedP2, clickP2] = useState(false)
    const [pathName, setPathName] = useState("")
    const [turboOn, turnTurbo] = useState(false)

    const [secretWord, setSecretWord] = useState(true);
    const [victorPath, setVictorPath] = useState("")
    const [peggyPath, setPeggyPath] = useState("")

    const [peggyCanGo1, letPeggyGo1] = useState(true)
    const [victorCanGo1, letVictorGo1] = useState(false)
    const [doorCanGo1, letDoorGo1] = useState(false)

    const [peggyCanGo2, letPeggyGo2] = useState(false)
    const [victorCanGo2, letVictorGo2] = useState(false)
    const [doorCanGo2, letDoorGo2] = useState(false)

    const [peggyCanGo3, letPeggyGo3] = useState(false)

    const [repetitions, setRepetitions] = useState(0)

    const victorChoice = useRef<THREE.Mesh>(null!)

    // function executeTurbo() {
    //     // Peggy chooses a path and follows it and Victor comes to the paths
    //         interval = setInterval(() => {
    //             console.log("Turbo is ON")
    //             let peggyPathVar = ""
    //             if (victor.current.position.x >= -1.6 && victor.current.position.z <= -1.9) {
    //                 setVictorPath("")
    //                 const rand = Math.random()
    //                 if (rand <= 0.5) {
    //                     actPath1(peggy, victor, 20)
    //                     peggyPathVar = "A"
    //                 } else {
    //                     actPath2(peggy, victor, 20)
    //                     peggyPathVar = "B"
    //                 }
    //
    //                 // let intervalId999 = setInterval(() => {
    //                 //     if (peggyPath === peggyPathVar) {
    //                 //         clearInterval(intervalId999)
    //                 //         console.log("Finally set Peggy's Path: ", peggyPath)
    //                 //     }
    //                 //     console.log("Just spamming")
    //                 //     setVictorPath(peggyPathVar)
    //                 // }, 5)
    //
    //
    //                 // Peggy comes back
    //                 let intervalId = setInterval(() => {
    //                     if (victor.current.position.x >= 2) {
    //                         clearInterval(intervalId)
    //                         const victorPathVar = choosePathVictor(victor, victorChoice)
    //                         setPathName(victorPathVar)
    //                         comeBack(door, peggy, peggyPathVar, victorPathVar, secretWord, 20)
    //                         // Calculation of confidence
    //                         let calculated = false
    //                         let intervalId2 = setInterval(() => {
    //                             if (peggy.current.position.x <= 3 && !calculated) {
    //                                 calculated = true
    //                                 console.log("Got to the calculation")
    //                                 clearInterval(intervalId2)
    //                                 const response = victorResponds(peggyPathVar, victorPathVar, secretWord)
    //                                 setPathName(response)
    //                                 if (response === "Ok") {
    //                                     const [newConf, newRep] = calculateConfidence(confidence, repetitions)
    //                                     setConfidence(newConf)
    //                                     setRepetitions(newRep)
    //                                 } else {
    //                                     setConfidence(0.0)
    //                                     setRepetitions(0)
    //                                     clearInterval(interval)
    //                                     turnTurbo(false)
    //                                 }
    //                                 let intervalId10 = setInterval(() => {
    //                                     if (victor.current.position.x >= 2 && peggy.current.position.x <= 3 && (peggy.current.position.z >= -1 && peggy.current.position.z <= 1)) {
    //                                         clearInterval(intervalId10)
    //                                         repeat(victor, peggy, victorChoice, 20)
    //                                     }
    //                                 }, 20)
    //                             }
    //                         }, 20)
    //                     }
    //                 }, 20)
    //             }
    //         }, 1000)
    // }

    function chooseRandomPeggyPath() {
        const rand = Math.random()
        if (rand < 0.5) {
            setPeggyPath("A")
        } else {
            setPeggyPath("B")
        }
    }

    function chooseRandomVictorPath() {
        const rand = Math.random()
        if (rand < 0.5) {
            setVictorPath("A")
        } else {
            setVictorPath("B")
        }
    }

    function whetherUseDoor(victorChoice: string) {
        // console.log("Peggy and Victor paths are: ", peggyPath, victorPath)
        if (secretWord && victorChoice !== peggyPath) {
            letDoorGo1(true)
            // letPeggyGo2(true)
        } else {
            letPeggyGo2(true)
        }
        // sends Peggy back, according to the chosen Path (that returns Victor's response)
    }

    function whetherIncrConf() {
        if (!secretWord && victorPath !== peggyPath) {
            setRepetitions(0)
        } else {
            setRepetitions(repetitions + 1)
        }
    }


    return (
      <div style={{height: '100vh'}}>
        <Canvas
            onClick={() => {
                // if (!turboOn) {
                //     repeat(victor, peggy, victorChoice, 10)
                // }
            }}>
            <OrbitControls />
            <ambientLight />

            {/*Entrance*/}
            <RoundedBox args={[5, 0.5, 2]}>
                <meshStandardMaterial color={'orange'} />
            </RoundedBox>

            {/*Path 1*/}
            <RoundedBox
                name="path1"
                args={[4, 0.5, 3]}
                position={[4.5, 0, -1.5]}
                onClick={() => {
                    clickP1(!clickedP1)
                    clickP2(false)
                    setVictorPath("A")
                    whetherUseDoor("A")
                } }
                onPointerOut={() => hoverP1(false)}
                onPointerOver={() => hoverP1(true)}>
                <meshStandardMaterial color={(hoveredP1 || clickedP1) ? 'blue' : 'hotpink'} />
            </RoundedBox>

            {/*Path 1 Name*/}
            <Text position={[4.5, 0.5, -5]} fontSize={5} rotation={[0, 90, 0]} color={'#008081'}>
                A
            </Text>

            {/*Path 2*/}
            <RoundedBox
                name="path2"
                args={[4, 0.5, 3]}
                position={[4.5, 0, 1.5]}
                onClick={() => {
                    clickP2(!clickedP2)
                    clickP1(false)
                    setVictorPath("B")
                    whetherUseDoor("B")
                }}
                onPointerOut={() => hoverP2(false)}
                onPointerOver={() => hoverP2(true)}>
                <meshStandardMaterial color={(hoveredP2 || clickedP2) ? 'blue' : 'hotpink'} />
            </RoundedBox>

             {/*The rock*/}
            <RoundedBox
                args={[2, 2.5, 4]}
                position={[4.5, 0.99, 0]}
                >
                <meshStandardMaterial color={'brown'} />
            </RoundedBox>

            {/*Path 2 Name*/}
            <Text position={[4.5, 0.5, 5]} fontSize={5} rotation={[0, 200, 0]} color={'#008081'}>
                B
            </Text>

            {/*Door*/}
            <Door
                secretWord={secretWord}
                victorPath={victorPath}
                peggyPath={peggyPath}
                canGo1={doorCanGo1}
                canGo2={doorCanGo2}
                opened={() => {
                    letDoorGo1(false)
                    letPeggyGo2(true)
                }}
                closed={() => {
                    letDoorGo2(false)
                }}
            />

            {/*That's Peggy*/}
            <Peggy
                canGo1={peggyCanGo1}
                canGo2={peggyCanGo2}
                canGo3={peggyCanGo3}
                peggyPath={peggyPath}
                victorPath={victorPath}
                secretWord={secretWord}
                reachedDoor={() => {
                    letPeggyGo1(false)
                    letVictorGo1(true)
                }}
                cameToVictor={() => {
                    whetherIncrConf()
                    letVictorGo2(true)
                    letPeggyGo2(false)
                    letDoorGo2(true)
                }}
                cameToStart={() => {
                    letPeggyGo1(true)
                    letPeggyGo3(false)
                }}
                randomChoose={() => {
                    chooseRandomPeggyPath()
                }}
            />

            {/*That's Victor*/}
            <Victor
                canGo1={victorCanGo1}
                canGo2={victorCanGo2}
                victorPath={victorPath}
                reachedPaths={() => {
                    letVictorGo1(false)
                }}
                cameToStart={() => {
                    letPeggyGo3(true)
                    letVictorGo2(false)
                }}
            />

            {/*Victor's lyrics*/}
            <Text
                position={[2.25, 2, 0]}
                visible={false}
                ref={victorChoice}
                fontSize={1.5}
                color={'red'}>
                {pathName}
            </Text>

            {/*Confidence meter*/}
            <Confidence
                repetitions={repetitions}
                />

        </Canvas>
          <button
              style={{height: "100px", width: "100px", backgroundColor: "#FEDCBA"}}
              disabled={turboOn}
              onClick={() => {
                  turnTurbo(true)
                  // executeTurbo()
              }}>Turn on Turbo</button>

          <button
              style={{height: "100px", width: "100px", backgroundColor: "#ABCDEF"}}
              onClick={() => {
                  turnTurbo(false)
                  turnOff()
          }}>Turn off Turbo</button>
          <Form.Check
              type="switch"
              id="custom-switch"
              label="Peggy knows the secret word"
              checked={secretWord}
              onChange={() => setSecretWord(!secretWord)}
          />
      </div>
  );
}

// An interval for the Turbo regime
let interval: NodeJS.Timer

function turnOff() {
    console.log("Turbo is OFF")
    clearInterval(interval);
    // release our intervalID from the variable
    // interval = null;
}

export default App;
