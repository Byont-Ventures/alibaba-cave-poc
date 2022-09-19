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
//
// function actPath2(peggy: MutableRefObject<THREE.Mesh>,  time: number) {
//
//     if (peggy.current.position.x <= 2.1 && peggy.current.position.z >= -0.1 && peggy.current.position.z <= 0.1) {
//         let intervalId = setInterval(() => {
//             if (peggy.current.position.x >= 3) {
//                 clearInterval(intervalId)
//                 let intervalId2 = setInterval(() => {
//                     if (peggy.current.position.z >= 2.375) {
//                         clearInterval(intervalId2)
//                         let intervalId3 = setInterval(() => {
//                             if (peggy.current.position.x >= 5.8) {
//                                 clearInterval(intervalId3)
//                             }
//                             peggy.current.position.x += 0.1
//                         }, time)
//                     }
//                     peggy.current.position.z += 0.1
//                 }, time)
//             }
//             peggy.current.position.x += 0.1
//         }, time)
//     }
// }

// let peggyPath = ""
//
// export function setPeggyPath(path: string) {
//     peggyPath = path
// }
//

export function Peggy({peggyPath = ""}) {

    const peggy = useRef<THREE.Mesh>(null!)

    // export const [peggyPath, setPeggyPath] = useState("")

    const [clicked, setClicked] = useState(false)

    const [firstStepDone, setFirstStepDone] = useState(false)
    const [secondStepDone, setSecondStepDone] = useState(false)
// const [secondStepDoneB, setSecondStepDoneB] = useState(false)
    const [thirdStepDone, setThirdStepDone] = useState(false)
    const [forthStepDone, setForthStepDone] = useState(false)


    const [firstActionDone, setFirstActionDone] = useState(false)

    function doFirstStep () {
        if (firstStepDone) return
        if (peggy.current.position.x >= 3) {
            setFirstStepDone(true)
            return
        }
        peggy.current.position.x += 0.05
    }

    function doSecondStep () {
        if (!firstStepDone) return
        if (secondStepDone) return
        if (peggy.current.position.z >= 2.35 || peggy.current.position.z <= -2.35) {
            setSecondStepDone(true)
            return
        }
        if (peggyPath === "A") {
            peggy.current.position.z -= 0.05
        } else {
            peggy.current.position.z += 0.05
        }
    }

    function doThirdStep () {
        if (!firstStepDone) return
        if (!secondStepDone) return
        if (thirdStepDone) return
        if (peggy.current.position.x >= 5.8) {
            setThirdStepDone(true)
            return
        }
        peggy.current.position.x += 0.05
    }

    function doForthStep () {
        if (!firstStepDone) return
        if (!secondStepDone) return
        if (!thirdStepDone) return
        if (forthStepDone) return
        if (peggy.current.position.z >= -1 && peggy.current.position.z <= 1) {
            setForthStepDone(true)
            return
        }
        if (peggyPath === "A") {
            peggy.current.position.x += 0.05
        } else {
            peggy.current.position.x -= 0.05
        }
    }

    function doFirstAction () {
        if (!peggy) return
        if (firstActionDone) return
        if (peggyPath === "") return
        doFirstStep()
        doSecondStep()
        doThirdStep()
        doForthStep()
        if (forthStepDone) {
            setFirstActionDone(true)
        }
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

// export default [Peggy, setPeggyPath];