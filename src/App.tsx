import React, {MutableRefObject, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Canvas, ThreeElements, useFrame} from '@react-three/fiber'
import THREE from 'three';
import {CubeCamera, OrbitControls, RoundedBox, Sphere, Text, Text3D} from '@react-three/drei';
// import {clearInterval} from "timers";

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  return (
      <mesh
          {...props}
          ref={ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[2, 1, 3]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
  )
}

// function Peggy(props: ThreeElements['mesh']) {
//     const ref = useRef<THREE.Mesh>(null!)
//     const [clicked, click] = useState(false)
// }

function actPath2(peggy: MutableRefObject<THREE.Mesh>, victor: MutableRefObject<THREE.Mesh>) {

    if (peggy.current.position.x <= 2.1 && peggy.current.position.z >= -0.1 && peggy.current.position.z <= 0.1) {
        let intervalId = setInterval(() => {
            if (peggy.current.position.x >= 3) {
                clearInterval(intervalId)
                let intervalId2 = setInterval(() => {
                    if (peggy.current.position.z >= 2.375) {
                        clearInterval(intervalId2)
                        let intervalId3 = setInterval(() => {
                            if (peggy.current.position.x >= 5.8) {
                                clearInterval(intervalId3)
                                let intervalId4 = setInterval(() => {
                                    if (peggy.current.position.z <= 1) {
                                        clearInterval(intervalId4)
                                        actVictor(victor)
                                    }
                                    peggy.current.position.z -= 0.3
                                }, 30)
                            }
                            peggy.current.position.x += 0.3
                        }, 30)
                    }
                    peggy.current.position.z += 0.3
                }, 30)
            }
            peggy.current.position.x += 0.3
        }, 30)
    }
}

function actPath1(peggy: MutableRefObject<THREE.Mesh>, victor: MutableRefObject<THREE.Mesh>) {

    if (peggy.current.position.x <= 2.1 && peggy.current.position.z >= -0.1 && peggy.current.position.z <= 0.1) {
        let intervalId = setInterval(() => {
            if (peggy.current.position.x >= 3) {
                clearInterval(intervalId)
                let intervalId2 = setInterval(() => {
                    if (peggy.current.position.z <= -2.375) {
                        clearInterval(intervalId2)
                        let intervalId3 = setInterval(() => {
                            if (peggy.current.position.x >= 5.8) {
                                clearInterval(intervalId3)
                                let intervalId4 = setInterval(() => {
                                    if (peggy.current.position.z >= -1) {
                                        clearInterval(intervalId4)
                                        actVictor(victor)
                                    }
                                    peggy.current.position.z += 0.3
                                }, 30)
                            }
                            peggy.current.position.x += 0.3
                        }, 30)
                    }
                    peggy.current.position.z -= 0.3
                }, 30)
            }
            peggy.current.position.x += 0.3
        }, 30)
    }
}

function actVictor(victor: MutableRefObject<THREE.Mesh>) {
    if (victor.current.position.x >= -1.6 && victor.current.position.z <= -1.9) {
        let intervalId = setInterval(() => {
            if (victor.current.position.x <= -4) {
                clearInterval(intervalId)
                let intervalId2 = setInterval(() => {
                    if (victor.current.position.z >= -0.1) {
                        clearInterval(intervalId2)
                        let intervalId3 = setInterval(() => {
                            if (victor.current.position.x >= 2) {
                                clearInterval(intervalId3)
                            }
                            victor.current.position.x += 0.2
                        }, 30)
                    }
                    victor.current.position.z += 0.3
                }, 30)
            }
            victor.current.position.x -= 0.3
        }, 30)
    }
}

function choosePathVictor(victor: MutableRefObject<THREE.Mesh>, victorChoice: MutableRefObject<THREE.Mesh>) {
    if (victor.current.position.x >= 2 && victor.current.position.z >= -0.1) {
        victorChoice.current.visible = true
        const num = Math.random()
        if (num < 0.5) {
            return "A"
        }
        else {
            return "B"
        }
    }
    return ""
}

function peggyReturns1(peggy: MutableRefObject<THREE.Mesh>, secretWord: boolean) {

    if (peggy.current.position.x >= 5.8 && (peggy.current.position.z >= -1 || secretWord)) {
        let intervalId = setInterval(() => {
            if (peggy.current.position.z <= -2.375) {
                clearInterval(intervalId)
                let intervalId2 = setInterval(() => {
                    if (peggy.current.position.x <= 3) {
                        clearInterval(intervalId2)
                        let intervalId4 = setInterval(() => {
                            if (peggy.current.position.z >= -1) {
                                clearInterval(intervalId4)
                            }
                            peggy.current.position.z += 0.1
                        }, 30)
                    }
                    peggy.current.position.x -= 0.1
                }, 30)
            }
            peggy.current.position.z -= 0.1
        }, 30)
    }
}

function peggyReturns2(peggy: MutableRefObject<THREE.Mesh>, secretWord: boolean) {

    if (peggy.current.position.x >= 5.8 && (peggy.current.position.z <= 1 || secretWord)) {
        let intervalId = setInterval(() => {
            if (peggy.current.position.z >= 2.375) {
                clearInterval(intervalId)
                let intervalId2 = setInterval(() => {
                    if (peggy.current.position.x <= 3) {
                        clearInterval(intervalId2)
                        let intervalId4 = setInterval(() => {
                            if (peggy.current.position.z <= 1) {
                                clearInterval(intervalId4)
                            }
                            peggy.current.position.z -= 0.1
                        }, 30)
                    }
                    peggy.current.position.x -= 0.1
                }, 30)
            }
            peggy.current.position.z += 0.1
        }, 30)
    }
}

function goThroughDoor(door: MutableRefObject<THREE.Mesh>, peggy: MutableRefObject<THREE.Mesh>, peggyPath: string, victorPath: string, secretWord: boolean) {
    let intervalId = setInterval(() => {
        if (door.current.position.x <= 4.99) {
            clearInterval(intervalId)
            if (peggyPath === "B") {
                peggyReturns1(peggy, secretWord)
            }
            else {
                peggyReturns2(peggy, secretWord)
            }
            let intervalId2 = setInterval(() => {
                if (peggy.current.position.z >= 2.375 || peggy.current.position.z <= -2.375 || peggy.current.position.z <= 3) {
                    if (door.current.position.x >= 5.99) {
                        clearInterval(intervalId2)
                    }
                    door.current.position.x += 0.01
                }
            }, 30)
        }
        door.current.position.x -= 0.01
    }, 30)
}

function comeBack (door: MutableRefObject<THREE.Mesh>, peggy: MutableRefObject<THREE.Mesh>, peggyPath: string, victorPath: string, secretWord: boolean) {

    // if Peggy knows the Secret word, and she is not at the Path that called Victor, then she opens the door and goes to the right Path
    if (secretWord && victorPath !== peggyPath) {
        goThroughDoor(door, peggy, peggyPath, victorPath, secretWord)
    }
    // sends Peggy back, according to the chosen Path (that returns Victor's response)
    else if (peggyPath === "A") {
        peggyReturns1(peggy, secretWord)
    }
    else {
        peggyReturns2(peggy, secretWord)
    }
}

// use it in case I want to try to change colors

function victorResponds (peggyPath: string, victorPath: string, secretWord: boolean) {
    if (peggyPath !== victorPath && !secretWord) {
        return "Liar"
    }
    return "Ok"
}

function repeat (victor: MutableRefObject<THREE.Mesh>, peggy: MutableRefObject<THREE.Mesh>, victorChoice: MutableRefObject<THREE.Mesh>) {
    if (victor.current.position.x >= 2 && peggy.current.position.x <= 3 && (peggy.current.position.z >= -1 && peggy.current.position.z <= 1)) {
        victorChoice.current.visible = false
        victorReturns(victor)
        peggyReturnsOriginal(peggy)
    }
}

function victorReturns (victor: MutableRefObject<THREE.Mesh>) {

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
                    }, 30)
                }
                victor.current.position.z -= 0.1
            }, 30)
        }
        victor.current.position.x -= 0.2
    }, 30)
}

function peggyReturnsOriginal (peggy: MutableRefObject<THREE.Mesh>) {
    let intervalId = setInterval(() => {
        if (peggy.current.position.z >= -0.1 && peggy.current.position.z <= 0.1) {
            clearInterval(intervalId)
            let intervalId2 = setInterval(() => {
                if (peggy.current.position.x <= 2.1) {
                    clearInterval(intervalId2)
                }
                peggy.current.position.x -= 0.1
            }, 30)
        }
        if (peggy.current.position.z < 0) {
            peggy.current.position.z += 0.1
        }
        else if (peggy.current.position.z > 0) {
            peggy.current.position.z -= 0.1
        }
    }, 30)
}

function calculateConfidence(confidence: number, repetitions: number) {
    const newConf = confidence + 50 / Math.pow(2, repetitions)
    const newRep = repetitions + 1
    return [newConf, newRep]
}

function App() {
    const [hoveredP1, hoverP1] = useState(false)
    const [hoveredP2, hoverP2] = useState(false)
    const [clickedP1, clickP1] = useState(false)
    const [clickedP2, clickP2] = useState(false)
    const [pathName, setPathName] = useState("")
    const [peggyPath, setPeggyPath] = useState("")
    const [confidence, setConfidence] = useState(0.0)
    const [repetitions, setRepetitions] = useState(0)
    const secretWord = true;
    const peggy = useRef<THREE.Mesh>(null!)
    const victor = useRef<THREE.Mesh>(null!)
    const door = useRef<THREE.Mesh>(null!)
    const victorChoice = useRef<THREE.Mesh>(null!)
    return (
      <div style={{height: '100vh'}}>
        <Canvas
            onClick={() => {
                repeat(victor, peggy, victorChoice)
            }}>
            {/*<CubeCamera>*/}

          {/*<pointLight position={[10, 10, 10]} />*/}
            <OrbitControls />
            <ambientLight />
            {/*<Box position={[-1.2, 0, 0]} />*/}

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
                }}
                onPointerOut={() => hoverP2(false)}
                onPointerOver={() => hoverP2(true)}>
                <meshStandardMaterial color={(hoveredP2 || clickedP2) ? 'blue' : 'hotpink'} />
            </RoundedBox>

             {/*The rock*/}
            <RoundedBox args={[2, 2.5, 4]} position={[4.5, 0.99, 0]}>
                <meshStandardMaterial color={'brown'} />
            </RoundedBox>

            {/*Path 2 Name*/}
            <Text position={[4.5, 0.5, 5]} fontSize={5} rotation={[0, 200, 0]} color={'#008081'}>
                B
            </Text>

            {/*Door*/}
            <RoundedBox
                ref={door}
                args={[1, 1.5, 0.01]}
                position={[6, 1, 0]}>
                <meshStandardMaterial color={'purple'} />
            </RoundedBox>

            {/*That's Peggy*/}
            <RoundedBox
                ref={peggy}
                args={[0.75, 0.75, 0.75]}
                position={[2, 1, 0]}
                onClick={() => {
                    if (clickedP1) {
                        actPath1(peggy, victor)
                        setPeggyPath("A")
                    }
                    else if (clickedP2){
                        actPath2(peggy, victor)
                        setPeggyPath("B")
                    }
                }}>
                <meshStandardMaterial color={'red'} />
            </RoundedBox>

            {/*That's Victor*/}
            <RoundedBox
                ref={victor}
                args={[0.75, 0.75, 0.75]}
                position={[-1.5, 1, -2]}
                onClick={() => {
                    if (victor.current.position.x >= 2) {
                        const letter = choosePathVictor(victor, victorChoice)
                        setPathName(letter)
                        comeBack(door, peggy, peggyPath, letter, secretWord)
                        let intervalId = setInterval(() => {
                            if (peggy.current.position.x <= 3) {
                                clearInterval(intervalId)
                                const response = victorResponds(peggyPath, letter, secretWord)
                                setPathName(response)
                                if (response === "Ok") {
                                    const [newConf, newRep] = calculateConfidence(confidence, repetitions)
                                    setConfidence(newConf)
                                    setRepetitions(newRep)
                                } else {
                                    setConfidence(0.0)
                                    setRepetitions(0)
                                }
                            }
                        }, 100)
                    }
                }}>
                <meshStandardMaterial color={'green'} />
            </RoundedBox>

            {/*Victor's lyrics*/}
            <Text
                position={[2.25, 2, 0]}
                visible={false}
                ref={victorChoice}
                fontSize={1.5}
                // rotation={[0, 200, 0]}
                color={'red'}>
                {pathName}
            </Text>

            {/*Confidence meter*/}
            <Text
                position={[2.25, 7, 0]}
                fontSize={1}
                // rotation={[0, 200, 0]}
                color={'black'}>
                Confidence: {confidence}%
            </Text>

        </Canvas>
      </div>
  );
}

export default App;
