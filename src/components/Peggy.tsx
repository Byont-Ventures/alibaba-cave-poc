import {RoundedBox} from "@react-three/drei";
import React, {MutableRefObject, useRef, useState} from "react";
import THREE from "three";
import {useFrame} from "@react-three/fiber";

// function actPath1(peggy: MutableRefObject<THREE.Mesh>, time: number) {
//
//     if (peggy.current.position.x <= 2.1 && peggy.current.position.z >= -0.1 && peggy.current.position.z <= 0.1) {
//         let intervalId = setInterval(() => {
//             if (peggy.current.position.x >= 3) {
//                 clearInterval(intervalId)
//                 let intervalId2 = setInterval(() => {
//                     if (peggy.current.position.z <= -2.375) {
//                         clearInterval(intervalId2)
//                         let intervalId3 = setInterval(() => {
//                             if (peggy.current.position.x >= 5.8) {
//                                 clearInterval(intervalId3)
//                             }
//                             peggy.current.position.x += 0.1
//                         }, time)
//                     }
//                     peggy.current.position.z -= 0.1
//                 }, time)
//             }
//             peggy.current.position.x += 0.1
//         }, time)
//     }
// }

// function peggyReturns1(peggy: MutableRefObject<THREE.Mesh>, secretWord: boolean, time: number) {
//
//     if (peggy.current.position.x >= 5.8 && (peggy.current.position.z >= -1 || secretWord)) {
//         let intervalId = setInterval(() => {
//             if (peggy.current.position.z <= -2.375) {
//                 clearInterval(intervalId)
//                 let intervalId2 = setInterval(() => {
//                     if (peggy.current.position.x <= 3) {
//                         clearInterval(intervalId2)
//                         let intervalId4 = setInterval(() => {
//                             if (peggy.current.position.z >= -1) {
//                                 clearInterval(intervalId4)
//                             }
//                             peggy.current.position.z += 0.1
//                         }, time)
//                     }
//                     peggy.current.position.x -= 0.1
//                 }, time)
//             }
//             peggy.current.position.z -= 0.1
//         }, time)
//     }
// }
//
// function peggyReturns2(peggy: MutableRefObject<THREE.Mesh>, secretWord: boolean, time: number) {
//
//     if (peggy.current.position.x >= 5.8 && (peggy.current.position.z <= 1 || secretWord)) {
//         let intervalId = setInterval(() => {
//             if (peggy.current.position.z >= 2.375) {
//                 clearInterval(intervalId)
//                 let intervalId2 = setInterval(() => {
//                     if (peggy.current.position.x <= 3) {
//                         clearInterval(intervalId2)
//                         let intervalId4 = setInterval(() => {
//                             if (peggy.current.position.z <= 1) {
//                                 clearInterval(intervalId4)
//                             }
//                             peggy.current.position.z -= 0.1
//                         }, time)
//                     }
//                     peggy.current.position.x -= 0.1
//                 }, time)
//             }
//             peggy.current.position.z += 0.1
//         }, time)
//     }
// }

// export interface PeggyProps{ reachedDoor: () => void, peggyPath: string, canGo1: boolean }
export interface PeggyProps{ reachedDoor: () => void, cameToVictor: () => void, cameToStart: () => void,
    canGo1: boolean, canGo2: boolean, canGo3: boolean, peggyPath: string, victorPath: string, secretWord: boolean, randomChoose: () => void }

export const Peggy: React.FunctionComponent<PeggyProps> = ({reachedDoor, randomChoose, canGo1, canGo2, canGo3, peggyPath = "", victorPath, secretWord}) => {

    const peggy = useRef<THREE.Mesh>(null!)

    // const [peggyPath, setPeggyPath] = useState("")

    const [clicked, setClicked] = useState(false)

    const [firstStepDone1, setFirstStepDone1] = useState(false)
    const [secondStepDone1, setSecondStepDone1] = useState(false)
    const [thirdStepDone1, setThirdStepDone1] = useState(false)
    const [forthStepDone1, setForthStepDone1] = useState(false)

    const [firstStepDone2, setFirstStepDone2] = useState(false)
    const [secondStepDone2, setSecondStepDone2] = useState(false)
    const [thirdStepDone2, setThirdStepDone2] = useState(false)

    const [firstActionDone, setFirstActionDone] = useState(false)
    const [secondActionDone, setSecondActionDone] = useState(false)

    const [rightPosOne, setRightPosOne] = useState(false)

    function checkPosOne() {
        if (rightPosOne) return
        if (peggy.current.position.x <= 2.1 && peggy.current.position.z >= -0.1 && peggy.current.position.z <= 0.1) {
            setRightPosOne(true)
            return
        }
    }

    function doFirstStep () {
        if (firstStepDone1) return
        if (!rightPosOne) return
        if (peggy.current.position.x >= 3) {
            setFirstStepDone1(true)
            return
        }
        peggy.current.position.x += 0.05
    }

    function choosePath() {
        if (peggyPath !== "") return
        randomChoose()
    }

    function doSecondStep () {
        if (!firstStepDone1) return
        if (peggyPath === "") return
        if (secondStepDone1) return
        if (peggy.current.position.z >= 2.35 || peggy.current.position.z <= -2.35) {
            setSecondStepDone1(true)
            return
        }
        if (peggyPath === "A") {
            peggy.current.position.z -= 0.05
        } else {
            peggy.current.position.z += 0.05
        }
    }

    function doThirdStep () {
        if (!firstStepDone1) return
        if (peggyPath === "") return
        if (!secondStepDone1) return
        if (thirdStepDone1) return
        if (peggy.current.position.x >= 5.925) {
            setThirdStepDone1(true)
            return
        }
        peggy.current.position.x += 0.05
    }

    function doForthStep () {
        if (!firstStepDone1) return
        if (peggyPath === "") return
        if (!secondStepDone1) return
        if (!thirdStepDone1) return
        if (forthStepDone1) return
        if (peggy.current.position.z >= -1 && peggy.current.position.z <= 1) {
            setForthStepDone1(true)
            return
        }
        if (peggyPath === "A") {
            peggy.current.position.z += 0.05
        } else {
            peggy.current.position.z -= 0.05
        }
    }

    function doFirstAction () {
        if (!peggy) return
        if (!canGo1) return
        if (firstActionDone) return
        if (forthStepDone1) {
            setFirstActionDone(true)
            reachedDoor();
            return
        }
        checkPosOne()
        doFirstStep()
        choosePath()
        doSecondStep()
        doThirdStep()
        doForthStep()
    }

    function doFirstStep2() {
        // can this nested "if" be improved?
        if (!victorPath || victorPath === "") return
        if (!peggyPath || peggyPath === "") return
        if (firstStepDone2) return

        // mb below some functions will be executed together because of bad if-statements
        return1SW1()
        return1SW2()
        return1NW1()
        return1NW2()
    }

    // goes from A to B if she knows secret word
    function return1SW1() {
        if (!secretWord) return
        if (victorPath === peggyPath) return
        if (peggyPath === "B") return
        if (peggy.current.position.z >= 2.375) {
            setFirstStepDone2(true)
            return
        }
        peggy.current.position.z += 0.05
    }

    // goes from B to A if she knows secret word
    function return1SW2() {
        if (!secretWord) return
        if (victorPath === peggyPath) return
        if (peggyPath === "A") return
        if (peggy.current.position.z <= -2.375) {
            setFirstStepDone2(true)
            return
        }
        peggy.current.position.z -= 0.05
    }

    // goes back by path A
    function return1NW1() {
        if (peggyPath === "B") return
        if (peggy.current.position.z <= -2.375) {
            setFirstStepDone2(true)
            return
        }
        peggy.current.position.z -= 0.05
    }

    // goes back by path A
    function return1NW2() {
        if (peggyPath === "A") return
        if (peggy.current.position.z >= 2.375) {
            setFirstStepDone2(true)
            return
        }
        peggy.current.position.z += 0.05
    }
    
    function doSecondStep2() {
        if (!firstStepDone2) return
        if (secondStepDone2) return
        if (peggy.current.position.x <= 3) {
            setSecondStepDone2(true)
            return
        }
        peggy.current.position.x += 0.05
    }
    
    function doThirdStep2() {
        if (!firstStepDone2) return
        if (!secondStepDone2) return
        if (thirdStepDone2) return

        // mb below some functions will be executed together because of bad if-statements
        return2SW1()
        return2SW2()
        return2NW1()
        return2NW2()
    }

    // finishes on B path if she knew secret word and went the wrong way first
    function return2SW1() {
        if (!secretWord) return
        if (victorPath === peggyPath) return
        if (peggyPath === "B") return
        if (peggy.current.position.z <= 1) {
            setThirdStepDone2(true)
            return
        }
        peggy.current.position.z -= 0.05
    }

    // finishes on A path if she knew secret word and went the wrong way first
    function return2SW2() {
        if (!secretWord) return
        if (victorPath === peggyPath) return
        if (peggyPath === "A") return
        if (peggy.current.position.z >= -1) {
            setFirstStepDone2(true)
            return
        }
        peggy.current.position.z += 0.05
    }

    // goes back by path A
    function return2NW1() {
        if (peggyPath === "B") return
        if (peggy.current.position.z >= -1) {
            setFirstStepDone2(true)
            return
        }
        peggy.current.position.z += 0.05
    }

    // goes back by path B
    function return2NW2() {
        if (peggyPath === "A") return
        if (peggy.current.position.z <= 1) {
            setThirdStepDone2(true)
            return
        }
        peggy.current.position.z -= 0.05
    }

    function doSecondAction () {
        if (!peggy) return
        if (!canGo2) return
        if (secondActionDone) return
        if (thirdStepDone2) {
            setSecondActionDone(true)
            // reachedDoor();
            return
        }
        doFirstStep2()
        doSecondStep2()
        doThirdStep2()
    }

    useFrame(({clock}) => {
        if (clicked) doFirstAction()
        doSecondAction()
    })

    return (
        <RoundedBox
            ref={peggy}
            args={[0.75, 0.75, 0.75]}
            position={[2, 1, 0]}
            onClick={() => {
                setClicked(!clicked)
            }}>
            <meshStandardMaterial color={'red'} />
        </RoundedBox>
    )
}

export default Peggy;