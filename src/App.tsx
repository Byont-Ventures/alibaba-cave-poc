import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Canvas} from '@react-three/fiber'
import THREE from 'three';
import {OrbitControls, RoundedBox, Sphere, Text} from '@react-three/drei';
import {Button, Col, Form, Modal, Row, Stack} from 'react-bootstrap';
import {Peggy} from "./components/Peggy";
import {Victor} from "./components/Victor";
import Door from "./components/Door";
import Confidence from "./components/Confidence";

function App() {
    const [turboOn, turnTurbo] = useState(false)
    const [secretWord, setSecretWord] = useState(true);

    const [hoveredP1, hoverP1] = useState(false)
    const [hoveredP2, hoverP2] = useState(false)
    const [clickedP1, clickP1] = useState(false)
    const [clickedP2, clickP2] = useState(false)
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

    const path1 = useRef<THREE.Mesh>(null!)
    const path2 = useRef<THREE.Mesh>(null!)

    // chooses a random path that Peggy will follow
    function chooseRandomPeggyPath() {
        const rand = Math.random()
        if (rand < 0.5) {
            setPeggyPath("A")
        } else {
            setPeggyPath("B")
        }
    }

    // executes actions that should happen after Victor chooses a path
    function victorSelectedPath(path: string) {
        setVictorPath(path)
        whetherUseDoor(path)
    }

    // chooses a random path for Victor, when the Turbo regime is On
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

    // triggers magic door opening if all criteria met, otherwise triggers next Peggy move
    function whetherUseDoor(victorChoice: string) {
        if (secretWord && victorChoice !== peggyPath) {
            letDoorGo1(true)
        } else {
            letPeggyGo2(true)
        }
    }

    // checks if the confidence should be increased and triggers needed actions accordingly
    function whetherIncrConf() {
        if (!secretWord && victorPath !== peggyPath) {
            setRepetitions(0)
            setShowModal(true)
            turnTurbo(false)
        } else {
            setRepetitions(repetitions + 1)
        }
    }

    // executes Turbo functions
    function executeTurbo() {
        if (!turboOn) return
        if (peggyCanGo2 || peggyCanGo3 || victorCanGo1 || victorCanGo2) return
        letPeggyGo1(true)
    }

    // resets Peggy, Victor, Door, Confidence and turns off Turbo
    function resetAll() {
        turnTurbo(false)
        setSpeed(0.05)
        setResetPeggy(true)
        setResetVictor(true)
        setResetConf(true)
        setRepetitions(0)
        setResetDoor(true)
    }

    // helps to continuously execute Turbo functions
    useEffect(() => {
        executeTurbo()
        chooseRandomVictorPath()
    })

    return (
      <div >
          <Row className="d-flex justify-content-center mt-2">
              <div style={{height: "60vh", width: "100vw"}}>
        <Canvas
            style={{ backgroundColor: "#040B10"}}
            camera={{position: [-4, 6, 7]}} >
            <OrbitControls />
            <ambientLight />

            {/*Main path*/}
            <RoundedBox args={[5, 0.5, 2]}>
                <meshStandardMaterial color={'#C5EE53'} />
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
                <meshStandardMaterial color={(hoveredP1 || clickedP1) ? '#16324B' : '#BBD8F1'} />
            </RoundedBox>

            {/*Path 1 Name*/}
            <Text position={[4.5, 0.5, -5]} fontSize={5} rotation={[0, 90, 0]} color={'#6495ED'}>
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
                <meshStandardMaterial color={(hoveredP2 || clickedP2) ? '#16324B' : 'hotpink'} />
            </RoundedBox>

            {/*The rock*/}
            <RoundedBox
                args={[2, 2.5, 4]}
                position={[4.5, 0.99, 0]}
            >
                <meshStandardMaterial color={'#593392'} />
            </RoundedBox>

            {/*Path 2 Name*/}
            <Text position={[4.5, 0.5, 5]} fontSize={5} rotation={[0, 200, 0]} color={'#6495ED'}>
                B
            </Text>

            {/*Door*/}
            <Door
                canGo1={doorCanGo1}
                canGo2={doorCanGo2}
                reset={resetDoor}
                resetComplete={() => {
                    // when the Door is reset, put all related values to their initial state
                    setResetDoor(false)

                    letDoorGo1(false)
                    letDoorGo2(false)

                    clickP1(false)
                    clickP2(false)
                }}
                opened={() => {
                    // when the door opens, stops it and triggers Peggy's next move
                    letDoorGo1(false)
                    letDoorGo2(false)
                    letPeggyGo2(true)
                }}
                closed={() => {
                    // when the door closes, stops it
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
                    // when Peggy is reset, put all related values to their initial state
                    setResetPeggy(false)

                    letPeggyGo1(true)
                    letPeggyGo2(false)
                    letPeggyGo3(false)

                    setPeggyPath("")
                }}
                reachedDoor={() => {
                    // when reaches the door, stops and triggers Victor's next move
                    letPeggyGo1(false)
                    letVictorGo1(true)
                }}
                cameToVictor={() => {
                    // when comes to Victor, triggers a number of actions
                    whetherIncrConf()
                    letVictorGo2(true)
                    letPeggyGo2(false)
                    clickP1(false)
                    clickP2(false)
                    letDoorGo2(true)
                    setPeggyPath("")
                }}
                cameToStart={() => {
                    // when comes back to the initial position, triggers Peggy's first action
                    letPeggyGo1(true)
                    letPeggyGo3(false)
                }}
                randomChoose={() => {
                    // triggers a random choosing of a path  for Peggy
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
                    // when Victor is reset, put all related values to their initial state
                    setResetVictor(false)

                    letVictorGo1(false)
                    letVictorGo2(false)

                    setVictorPath("")
                }}
                reachedPaths={() => {
                    // when reaches the paths, stops
                    letVictorGo1(false)
                }}
                cameToStart={() => {
                    // when comes to the initial position, lets Peggy move and resets Victor's path choice
                    setVictorPath("")
                    letPeggyGo3(true)
                    letVictorGo2(false)
                }}
            />

            {/*Confidence meter*/}
            <Confidence
                repetitions={repetitions}
                reset={resetConf}
                resetComplete={() => {
                    // when the Confidence is reset, put all related values to their initial state
                    setResetConf(false)
                }}
            />

        </Canvas>
              </div>
          </Row>
          <Row className="mx-3 px-3 mt-4">
              <Col xs={3} className="d-flex justify-content-center">
                  <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Peggy knows the secret word"
                      checked={secretWord}
                      onChange={() => setSecretWord(!secretWord)}
                  />
              </Col>
              <Col xs={9} className="d-flex justify-content-end">
                  <Stack direction="horizontal" gap={3}>
                      {/*@ts-ignore*/}
                      <Button
                          style={{height: "75px", width: "150px"}}
                          variant="success"
                          disabled={turboOn}
                          onClick={() => {
                              turnTurbo(true)
                              setSpeed(0.1)
                          }}>Turn on Turbo</Button>

                      {/*@ts-ignore*/}
                      <Button
                          style={{height: "75px", width: "150px"}}
                          variant="warning"
                          onClick={() => {
                              turnTurbo(false)
                              setSpeed(0.05)
                          }}>Turn off Turbo</Button>

                      {/*@ts-ignore*/}
                      <Button
                          style={{height: "75px", width: "150px"}}
                          variant="danger"
                          onClick={() => {
                              resetAll()
                          }}>Reset</Button>
                  </Stack>
              </Col>
          </Row>

          {/*This modal appears when Victor finds out that Peggy doesn't know the secret word*/}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                  <Modal.Title>Peggy didn't know the secret word</Modal.Title>
              </Modal.Header>
              <Modal.Body>You were trying to find out if Peggy knew the Secret word using Zer-Knowledge Proof and it appears that she didn't</Modal.Body>
              <Modal.Footer>
                  {/*@ts-ignore*/}
                  <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
              </Modal.Footer>
          </Modal>
      </div>
  );
}

export default App;
