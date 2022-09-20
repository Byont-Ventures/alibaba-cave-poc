import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import './App.css';
import {Canvas, ThreeElements, useFrame} from '@react-three/fiber'
import THREE from 'three';
import {OrbitControls, RoundedBox, Sphere, Text} from '@react-three/drei';
import { Form } from 'react-bootstrap';
import {Peggy} from "./components/Peggy";
import {Victor} from "./components/Victor";
import Door from "./components/Door";

function goThroughDoor(door: MutableRefObject<THREE.Mesh>, peggy: MutableRefObject<THREE.Mesh>, peggyPath: string, victorPath: string, secretWord: boolean, time: number) {
    let intervalId = setInterval(() => {
        if (door.current.position.x <= 4.98) {
            clearInterval(intervalId)
            if (peggyPath === "B") {
                // peggyReturns1(peggy, secretWord, time)
            }
            else {
                // peggyReturns2(peggy, secretWord, time)
            }
            let intervalId2 = setInterval(() => {
                if (peggy.current.position.z >= 2.375 || peggy.current.position.z <= -2.375 || peggy.current.position.z <= 3) {
                    if (door.current.position.x >= 5.98) {
                        clearInterval(intervalId2)
                    }
                    door.current.position.x += 0.02
                }
            }, time)
        }
        door.current.position.x -= 0.02
    }, time)
}

function comeBack (door: MutableRefObject<THREE.Mesh>, peggy: MutableRefObject<THREE.Mesh>, peggyPath: string, victorPath: string, secretWord: boolean, time: number) {

    console.log("This is a path for Peggy: ", peggyPath)
    console.log("This is a path for Victor: ", victorPath)
    // if Peggy knows the Secret word, and she is not at the Path that called Victor, then she opens the door and goes to the right Path
    if (secretWord && victorPath !== peggyPath) {
        goThroughDoor(door, peggy, peggyPath, victorPath, secretWord, time)
    }
    // sends Peggy back, according to the chosen Path (that returns Victor's response)
    else if (peggyPath === "A") {
        // peggyReturns1(peggy, secretWord, time)
    }
    else {
        // peggyReturns2(peggy, secretWord, time)
    }
}

// use it in case I want to try to change colors

function victorResponds (peggyPath: string, victorPath: string, secretWord: boolean) {
    if (peggyPath !== victorPath && !secretWord) {
        return "Liar"
    }
    return "Ok"
}

function repeat (victor: MutableRefObject<THREE.Mesh>, peggy: MutableRefObject<THREE.Mesh>, victorChoice: MutableRefObject<THREE.Mesh>, time: number) {
    if (victor.current.position.x >= 2 && peggy.current.position.x <= 3 && (peggy.current.position.z >= -1 && peggy.current.position.z <= 1)) {
        victorChoice.current.visible = false
        victorReturns(victor, time)
        peggyReturnsOriginal(peggy, time)
    }
}

function victorReturns (victor: MutableRefObject<THREE.Mesh>, time: number) {

    let intervalId = setInterval(() => {
        if (victor.current.position.x <= -4) {
            clearInterval(intervalId)
            let intervalId2 = setInterval(() => {
                if (victor.current.position.z <= -1.9) {
                    clearInterval(intervalId2)
                    let intervalId3 = setInterval(() => {
                        if (victor.current.position.x >= -1.6) {
                            clearInterval(intervalId3)
                        }
                        victor.current.position.x += 0.1
                    }, time)
                }
                victor.current.position.z -= 0.1
            }, time)
        }
        victor.current.position.x -= 0.2
    }, time)
}

function peggyReturnsOriginal (peggy: MutableRefObject<THREE.Mesh>, time: number) {
    let intervalId = setInterval(() => {
        if (peggy.current.position.z >= -0.1 && peggy.current.position.z <= 0.1) {
            clearInterval(intervalId)
            let intervalId2 = setInterval(() => {
                if (peggy.current.position.x <= 2.1) {
                    clearInterval(intervalId2)
                }
                peggy.current.position.x -= 0.1
            }, time)
        }
        if (peggy.current.position.z < 0) {
            peggy.current.position.z += 0.1
        }
        else if (peggy.current.position.z > 0) {
            peggy.current.position.z -= 0.1
        }
    }, time)
}

function calculateConfidence(confidence: number, repetitions: number) {
    const newConf = confidence + 50 / Math.pow(2, repetitions)
    const newRep = repetitions + 1
    console.log("New confidence equal: ", newConf)
    console.log("New repetitions equal: ", newRep)
    return [newConf, newRep]
}

function App() {
    const [hoveredP1, hoverP1] = useState(false)
    const [hoveredP2, hoverP2] = useState(false)
    const [clickedP1, clickP1] = useState(false)
    const [clickedP2, clickP2] = useState(false)
    const [pathName, setPathName] = useState("")
    const [confidence, setConfidence] = useState(0.0)
    const [repetitions, setRepetitions] = useState(0)
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

    function whetherUseDoor() {
        if (secretWord && victorPath !== peggyPath) {
            letDoorGo1(true)
        } else {
            letPeggyGo2(true)
        }
        // sends Peggy back, according to the chosen Path (that returns Victor's response)
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
                    whetherUseDoor()
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
                    whetherUseDoor()
                }}
                onPointerOut={() => hoverP2(false)}
                onPointerOver={() => hoverP2(true)}>
                <meshStandardMaterial color={(hoveredP2 || clickedP2) ? 'blue' : 'hotpink'} />
            </RoundedBox>

             {/*The rock*/}
            <RoundedBox
                args={[2, 2.5, 4]}
                position={[4.5, 0.99, 0]}
                onClick={() => {

            }}>
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
                    letVictorGo2(true)
                    letPeggyGo2(false)
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
                    // letPeggyGo2(true)
                    letVictorGo1(false)
                }}
                cameToStart={() => {
                    letPeggyGo3(true)
                    letVictorGo2(false)
                }}
            />

            {/*<RoundedBox*/}
            {/*    ref={victor}*/}
            {/*    args={[0.75, 0.75, 0.75]}*/}
            {/*    position={[-1.5, 1, -2]}*/}
            {/*    onClick={() => {*/}
            {/*        if (victor.current.position.x >= 2) {*/}
            {/*            const letter = choosePathVictor(victor, victorChoice)*/}
            {/*            setPathName(letter)*/}
            {/*            // comeBack(door, peggy, peggyPath, letter, secretWord, 10)*/}
            {/*            let intervalId = setInterval(() => {*/}
            {/*                // if (peggy.current.position.x <= 3) {*/}
            {/*                    if (victor) {*/}
            {/*                    clearInterval(intervalId)*/}
            {/*                    const response = victorResponds(peggyPath, letter, secretWord)*/}
            {/*                    setPathName(response)*/}
            {/*                    if (response === "Ok") {*/}
            {/*                        const [newConf, newRep] = calculateConfidence(confidence, repetitions)*/}
            {/*                        setConfidence(newConf)*/}
            {/*                        setRepetitions(newRep)*/}
            {/*                    } else {*/}
            {/*                        setConfidence(0.0)*/}
            {/*                        setRepetitions(0)*/}
            {/*                    }*/}
            {/*                }*/}
            {/*            }, 10)*/}
            {/*        }*/}
            {/*    }}>*/}
            {/*    <meshStandardMaterial color={'green'} />*/}
            {/*</RoundedBox>*/}

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
            <Text
                position={[2.25, 7, 0]}
                fontSize={1}
                color={'black'}>
                Confidence: {confidence}%
            </Text>

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
