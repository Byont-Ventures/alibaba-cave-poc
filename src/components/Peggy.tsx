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

    useFrame(({clock}) => {
        if (clicked) doFirstAction()
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