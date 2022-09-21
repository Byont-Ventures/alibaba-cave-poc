import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import './App.css';
import {Canvas, ThreeElements, useFrame} from '@react-three/fiber'
import THREE from 'three';
import {OrbitControls, RoundedBox, Sphere, Text} from '@react-three/drei';
import {Button, Form, Modal} from 'react-bootstrap';
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
    const [turboOn, turnTurbo] = useState(false)
    const [secretWord, setSecretWord] = useState(true);

    const [hoveredP1, hoverP1] = useState(false)
    const [hoveredP2, hoverP2] = useState(false)
    const [clickedP1, clickP1] = useState(false)
    const [clickedP2, clickP2] = useState(false)
    const [pathName, setPathName] = useState("")
    const [speed, setSpeed] = useState(0.05)

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

    const [resetPeggy, setResetPeggy] = useState(false)
    const [resetVictor, setResetVictor] = useState(false)
    const [resetConf, setResetConf] = useState(false)
    const [resetDoor, setResetDoor] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const victorChoice = useRef<THREE.Mesh>(null!)
    const path1 = useRef<THREE.Mesh>(null!)
    const path2 = useRef<THREE.Mesh>(null!)

    function chooseRandomPeggyPath() {
        const rand = Math.random()
        if (rand < 0.5) {
            setPeggyPath("A")
        } else {
            setPeggyPath("B")
        }
    }

    function victorSelectedPath(path: string) {
        setVictorPath(path)
        whetherUseDoor(path)
    }

    function chooseRandomVictorPath() {
        if (!turboOn) return
        if (peggyCanGo1 || peggyCanGo2 || peggyCanGo3 || victorCanGo1 || victorCanGo2) return
        if (victorPath === "A" || victorPath === "B") return
        const rand = Math.random()
        if (rand < 0.5) {
            victorSelectedPath("A")
            clickP1(true)
        } else {
            victorSelectedPath("B")
            clickP2(true)
        }
    }

    function whetherUseDoor(victorChoice: string) {
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
            setShowModal(true)
            turnTurbo(false)
        } else {
            setRepetitions(repetitions + 1)
        }
    }

    function executeTurbo() {
        if (!turboOn) return
        if (peggyCanGo2 || peggyCanGo3 || victorCanGo1 || victorCanGo2) return
        letPeggyGo1(true)
    }

    function resetAll() {
        turnTurbo(false)
        setSpeed(0.05)
        setResetPeggy(true)
        setResetVictor(true)
        setResetConf(true)
        setRepetitions(0)
        setResetDoor(true)
    }

    useEffect(() => {
        executeTurbo()
        chooseRandomVictorPath()
    })

    return (
      <div style={{height: '100vh'}}>
        <Canvas>
            <OrbitControls />
            <ambientLight />

            <RoundedBox args={[5, 0.5, 2]}>
                <meshStandardMaterial color={'orange'} />
            </RoundedBox>

            {/*Path 1*/}
            <RoundedBox
                name="path1"
                ref={path1}
                args={[4, 0.5, 3]}
                position={[4.5, 0, -1.5]}
                onClick={() => {
                    if (turboOn) return
                    clickP1(!clickedP1)
                    clickP2(false)

                    victorSelectedPath("A")
                } }
                onPointerOut={() => {
                    if (turboOn) return
                    hoverP1(false)
                }}
                onPointerOver={() => {
                    if (turboOn) return
                    hoverP1(true)
                }}>
                <meshStandardMaterial color={(hoveredP1 || clickedP1) ? 'blue' : 'hotpink'} />
            </RoundedBox>

            {/*Path 1 Name*/}
            <Text position={[4.5, 0.5, -5]} fontSize={5} rotation={[0, 90, 0]} color={'#008081'}>
                A
            </Text>

            {/*Path 2*/}
            <RoundedBox
                name="path2"
                ref={path2}
                args={[4, 0.5, 3]}
                position={[4.5, 0, 1.5]}
                onClick={() => {
                    if (turboOn) return
                    clickP2(!clickedP2)
                    clickP1(false)

                    victorSelectedPath("B")
                }}
                onPointerOut={() => {
                    if (turboOn) return
                    hoverP2(false)
                }}
                onPointerOver={() => {
                    if (turboOn) return
                    hoverP2(true)
                }}>
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
                canGo1={doorCanGo1}
                canGo2={doorCanGo2}
                reset={resetDoor}
                resetComplete={() => {
                    setResetDoor(false)

                    letDoorGo1(false)
                    letDoorGo2(false)

                    clickP1(false)
                    clickP2(false)
                }}
                opened={() => {
                    letDoorGo1(false)
                    letDoorGo2(false)
                    letPeggyGo2(true)
                }}
                closed={() => {
                    letDoorGo1(false)
                    letDoorGo2(false)
                }}
            />

            {/*That's Peggy*/}
            <Peggy
                speed={speed}
                canGo1={peggyCanGo1}
                canGo2={peggyCanGo2}
                canGo3={peggyCanGo3}
                peggyPath={peggyPath}
                victorPath={victorPath}
                secretWord={secretWord}
                turboOn={turboOn}
                reset={resetPeggy}
                resetComplete={() => {
                    setResetPeggy(false)

                    letPeggyGo1(true)
                    letPeggyGo2(false)
                    letPeggyGo3(false)

                    setPeggyPath("")
                }}
                reachedDoor={() => {
                    letPeggyGo1(false)
                    letVictorGo1(true)
                }}
                cameToVictor={() => {
                    whetherIncrConf()
                    letVictorGo2(true)
                    letPeggyGo2(false)
                    clickP1(false)
                    clickP2(false)
                    letDoorGo2(true)
                    setPeggyPath("")
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
                speed={speed}
                reset={resetVictor}
                resetComplete={() => {
                    setResetVictor(false)

                    letVictorGo1(false)
                    letVictorGo2(false)

                    setVictorPath("")
                }}
                reachedPaths={() => {
                    letVictorGo1(false)
                }}
                cameToStart={() => {
                    setVictorPath("")
                    // letDoorGo2(true)
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
                reset={resetConf}
                resetComplete={() => setResetConf(false)}
            />

        </Canvas>
          <button
              style={{height: "100px", width: "100px", backgroundColor: "#FEDCBA"}}
              disabled={turboOn}
              onClick={() => {
                  turnTurbo(true)
                  setSpeed(0.1)
              }}>Turn on Turbo</button>

          <button
              style={{height: "100px", width: "100px", backgroundColor: "#ABCDEF"}}
              onClick={() => {
                  turnTurbo(false)
                  setSpeed(0.05)
          }}>Turn off Turbo</button>
          <button
              style={{height: "100px", width: "100px", backgroundColor: "orangered"}}
              onClick={() => resetAll()}>Reset</button>
          <Form.Check
              type="switch"
              id="custom-switch"
              label="Peggy knows the secret word"
              checked={secretWord}
              onChange={() => setSecretWord(!secretWord)}
          />
          <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                  <Modal.Title>Peggy didn't know the secret word</Modal.Title>
              </Modal.Header>
              <Modal.Body>You were trying to find out if Peggy knew the Secret word using Zer-Knowledge Proof and it appears that she didn't</Modal.Body>
              <Modal.Footer>
                  {/*<button style={{height: "100px", width: "100px", backgroundColor: "orangered"}}*/}
                  {/*        onClick={() => resetAll()}>Close</button>*/}
                  {/*@ts-ignore*/}
                  <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
              </Modal.Footer>
          </Modal>
      </div>
  );
}

export default App;
