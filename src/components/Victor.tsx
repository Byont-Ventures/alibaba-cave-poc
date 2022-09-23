import React, {useRef, useState} from "react";
import THREE from "three";
import {useFrame} from "@react-three/fiber";
import {RoundedBox} from "@react-three/drei";

export interface VictorProps {canGo1: boolean, canGo2: boolean,
    reachedPaths: () => void, cameToStart: () => void, speed: number, reset: boolean, resetComplete: () => void}

export const Victor : React.FunctionComponent<VictorProps> = ({canGo1, canGo2, speed,
                                                                  cameToStart, reachedPaths, reset, resetComplete}) => {

    const victor = useRef<THREE.Mesh>(null!)
    
    const [firstStepDone1, setFirstStepDone1] = useState(false)
    const [secondStepDone1, setSecondStepDone1] = useState(false)
    const [thirdStepDone1, setThirdStepDone1] = useState(false)

    const [firstStepDone2, setFirstStepDone2] = useState(false)
    const [secondStepDone2, setSecondStepDone2] = useState(false)
    const [thirdStepDone2, setThirdStepDone2] = useState(false)


    const [firstActionDone, setFirstActionDone] = useState(false)
    const [secondActionDone, setSecondActionDone] = useState(false)

    const [rightPosOne, setRightPosOne] = useState(false)

    // *** Victor's first action animation (that when he comes to the paths) ***

    // checks if Peggy at the starting position, before letting her move
    function checkPosOne() {
        if (rightPosOne) return
        if (victor.current.position.x >= -1.6 && victor.current.position.z <= -1.9) {
            setRightPosOne(true)
            return
        }
    }

    function doFirstStep() {
        if (firstStepDone1) return
        if (!rightPosOne) return
        if (victor.current.position.x <= -4) {
            setFirstStepDone1(true)
            return
        }
        victor.current.position.x -= speed
    }

    function doSecondStep () {
        if (!firstStepDone1) return
        if (secondStepDone1) return
        if (victor.current.position.z >= -0.05) {
            setSecondStepDone1(true)
            return
        }
        victor.current.position.z += speed
    }

    function doThirdStep () {
        if (!firstStepDone1) return
        if (!secondStepDone1) return
        if (thirdStepDone1) return
        if (victor.current.position.x >= 2) {
            setThirdStepDone1(true)
            return
        }
        victor.current.position.x += speed
    }

    function doFirstAction() {
        if (!victor) return
        if (!canGo1) return
        if (firstActionDone) return
        if (thirdStepDone1) {
            console.log("Finished the first Action for Victor")
            setFirstActionDone(true)
            reachedPaths()
            return
        }
        checkPosOne()
        doFirstStep()
        doSecondStep()
        doThirdStep()
    }

    // *** The end of Victor's first action ***

    // *** Victor's second action animation (that when he comes back to his initial position) ***

    function doFirstStep2() {
        if (firstStepDone2) return
        if (victor.current.position.x <= -4) {
            setFirstStepDone2(true)
            return
        }
        victor.current.position.x -= speed
    }

    function doSecondStep2 () {
        if (!firstStepDone2) return
        if (secondStepDone2) return
        if (victor.current.position.z <= -1.9) {
            setSecondStepDone2(true)
            return
        }
        victor.current.position.z -= speed
    }

    function doThirdStep2 () {
        if (!firstStepDone2) return
        if (!secondStepDone2) return
        if (thirdStepDone2) return
        if (victor.current.position.x >= -1.6) {
            setThirdStepDone2(true)
            return
        }
        victor.current.position.x += speed
    }

    function doSecondAction() {
        if (!victor) return
        if (!canGo2) return
        if (secondActionDone) return
        if (thirdStepDone2) {
            console.log("Finished the second Action for Victor")
            setSecondActionDone(true)
            cameToStart()
            return
        }
        doFirstStep2()
        doSecondStep2()
        doThirdStep2()
    }

    // *** The end of Victor's second action ***

    // resets all Victor's actions and puts him on his initial position if "reset" button was triggered
    function resetAll() {
        if ((!firstActionDone || !secondActionDone) && !reset) return

        setRightPosOne(false)

        setFirstStepDone1(false)
        setSecondStepDone1(false)
        setThirdStepDone1(false)

        setFirstStepDone2(false)
        setSecondStepDone2(false)
        setThirdStepDone2(false)

        setFirstActionDone(false)
        setSecondActionDone(false)

        if (reset) {
            victor.current.position.x = -1.5
            victor.current.position.y = 1
            victor.current.position.z = -2
            resetComplete()
            console.log("reset all for Victor")
        }
    }

    // continuously checks if the actions should be executed and executes them if the criteria are met
    useFrame(({clock}) => {
        doFirstAction()
        doSecondAction()
        resetAll()
    })

    return (
        <RoundedBox
            ref={victor}
            args={[0.75, 0.75, 0.75]}
            position={[-1.5, 1, -2]}
        >
            <meshStandardMaterial color={'#32CD32'} />
        </RoundedBox>

    )
}

