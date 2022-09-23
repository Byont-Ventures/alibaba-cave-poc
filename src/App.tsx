import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import './App.css';
import {Canvas, ThreeElements, useFrame} from '@react-three/fiber'
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
      <div >
          <Row className="d-flex justify-content-center mt-2">
              <div style={{height: "60vh", width: "100vw"}}>
        <Canvas
            style={{ backgroundColor: "#040B10"}}
            camera={{position: [-4, 6, 7]}} >
            <OrbitControls />
            <ambientLight />

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

            {/*Confidence meter*/}
            <Confidence
                repetitions={repetitions}
                reset={resetConf}
                resetComplete={() => setResetConf(false)}
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
                      // style={{color: "white"}}
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
