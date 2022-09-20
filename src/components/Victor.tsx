import React, {MutableRefObject, useRef, useState} from "react";
import THREE from "three";
import {useFrame} from "@react-three/fiber";
import {RoundedBox} from "@react-three/drei";

// function actVictor(victor: MutablevictorObject<THREE.Mesh>, time: number) {
//     if (victor.current.position.x >= -1.6 && victor.current.position.z <= -1.9) {
//         let intervalId = setInterval(() => {
//             if (victor.current.position.x <= -4) {
//                 clearInterval(intervalId)
//                 let intervalId2 = setInterval(() => {
//                     if (victor.current.position.z >= -0.1) {
//                         clearInterval(intervalId2)
//                         let intervalId3 = setInterval(() => {
//                             if (victor.current.position.x >= 2) {
//                                 clearInterval(intervalId3)
//                             }
//                             victor.current.position.x += 0.2
//                         }, time)
//                     }
//                     victor.current.position.z += 0.1
//                 }, time)
//             }
//             victor.current.position.x -= 0.1
//         }, time)
//     }
// }

export interface VictorProps {canGo1: boolean, canGo2: boolean,
    reachedPaths: () => void, cameToStart: () => void, victorPath: string}

export const Victor : React.FunctionComponent<VictorProps> = ({canGo1, canGo2, victorPath}) => {

    const victor = useRef<THREE.Mesh>(null!)

    const [clicked, setClicked] = useState(false)

    const [firstStepDone, setFirstStepDone] = useState(false)
    const [secondStepDone, setSecondStepDone] = useState(false)
// const [secondStepDoneB, setSecondStepDoneB] = useState(false)
    const [thirdStepDone, setThirdStepDone] = useState(false)
    const [forthStepDone, setForthStepDone] = useState(false)


    const [firstActionDone, setFirstActionDone] = useState(false)

    const [rightPosOne, setRightPosOne] = useState(false)

    function checkPosOne() {
        if (rightPosOne) return
        if (victor.current.position.x >= -1.6 && victor.current.position.z <= -1.9) {
            setRightPosOne(true)
            return
        }
    }

    function doFirstStep() {
        if (firstStepDone) return
        if (!rightPosOne) return
        if (victor.current.position.x <= -4) {
            setFirstStepDone(true)
            return
        }
        victor.current.position.x -= 0.05
    }

    function doSecondStep () {
        if (!firstStepDone) return
        if (secondStepDone) return
        if (victor.current.position.z >= -0.05) {
            setSecondStepDone(true)
            return
        }
        victor.current.position.z += 0.05
    }

    function doThirdStep () {
        if (!firstStepDone) return
        if (!secondStepDone) return
        if (thirdStepDone) return
        if (victor.current.position.x >= 2) {
            setThirdStepDone(true)
            return
        }
        victor.current.position.x += 0.05
    }

    function doFirstAction() {
        if (!victor) return
        if (!canGo1) return
        if (firstActionDone) return
        if (thirdStepDone) {
            setFirstActionDone(true)
            return
        }
        checkPosOne()
        doFirstStep()
        doSecondStep()
        doThirdStep()
    }

    useFrame(({clock}) => {
        doFirstAction()
    })

    return (
        <RoundedBox
            ref={victor}
            args={[0.75, 0.75, 0.75]}
            position={[-1.5, 1, -2]}

        >
            <meshStandardMaterial color={'green'} />
        </RoundedBox>

    )
}

