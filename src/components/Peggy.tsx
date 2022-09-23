import {RoundedBox} from "@react-three/drei";
import React, {MutableRefObject, useRef, useState} from "react";
import THREE from "three";
import {useFrame} from "@react-three/fiber";

export interface PeggyProps{ reachedDoor: () => void, cameToVictor: () => void, cameToStart: () => void,
    canGo1: boolean, canGo2: boolean, canGo3: boolean, peggyPath: string, victorPath: string,
    secretWord: boolean, randomChoose: () => void, turboOn: boolean, speed: number, reset: boolean, resetComplete: () => void }

export const Peggy: React.FunctionComponent<PeggyProps> = ({reachedDoor, randomChoose, canGo1, canGo2, canGo3,
                                                               peggyPath = "", victorPath, secretWord,
                                                               cameToVictor, cameToStart, turboOn, speed,
                                                               reset, resetComplete}) => {

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

    const [firstStepDone3, setFirstStepDone3] = useState(false)
    const [secondStepDone3, setSecondStepDone3] = useState(false)

    const [firstActionDone, setFirstActionDone] = useState(false)
    const [secondActionDone, setSecondActionDone] = useState(false)
    const [thirdActionDone, setThirdActionDone] = useState(false)

    const [rightPosOne, setRightPosOne] = useState(false)

    function checkPosOne() {
        if (rightPosOne) return
        if (peggy.current.position.x <= 2.2 && peggy.current.position.z >= -0.15 && peggy.current.position.z <= 0.15) {
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
        peggy.current.position.x += speed
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
            peggy.current.position.z -= speed
        } else {
            peggy.current.position.z += speed
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
        peggy.current.position.x += speed
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
            peggy.current.position.z += speed
        } else {
            peggy.current.position.z -= speed
        }
    }

    function doFirstAction () {
        if (!peggy) return
        if (!canGo1) return
        if (!clicked && !turboOn) return
        if (firstActionDone) return
        if (forthStepDone1) {
            console.log("Finished the first Action for Peggy")
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
        peggy.current.position.z += speed
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
        peggy.current.position.z -= speed
    }

    // goes back by path A
    function return1NW1() {
        if (secretWord && victorPath !== peggyPath) return
        if (peggyPath === "B") return
        if (peggy.current.position.z <= -2.375) {
            setFirstStepDone2(true)
            return
        }
        peggy.current.position.z -= speed
    }

    // goes back by path A
    function return1NW2() {
        if (secretWord && victorPath !== peggyPath) return
        if (peggyPath === "A") return
        if (peggy.current.position.z >= 2.375) {
            setFirstStepDone2(true)
            return
        }
        peggy.current.position.z += speed
    }
    
    function doSecondStep2() {
        if (!firstStepDone2) return
        if (secondStepDone2) return
        if (peggy.current.position.x <= 3) {
            setSecondStepDone2(true)
            return
        }
        peggy.current.position.x -= speed
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
        peggy.current.position.z -= speed
    }

    // finishes on A path if she knew secret word and went the wrong way first
    function return2SW2() {
        if (!secretWord) return
        if (victorPath === peggyPath) return
        if (peggyPath === "A") return
        if (peggy.current.position.z >= -1) {
            setThirdStepDone2(true)
            return
        }
        peggy.current.position.z += speed
    }

    // goes back by path A
    function return2NW1() {
        if (secretWord && victorPath !== peggyPath) return
        if (peggyPath === "B") return
        if (peggy.current.position.z >= -1) {
            setThirdStepDone2(true)
            return
        }
        peggy.current.position.z += speed
    }

    // goes back by path B
    function return2NW2() {
        if (secretWord && victorPath !== peggyPath) return
        if (peggyPath === "A") return
        if (peggy.current.position.z <= 1) {
            setThirdStepDone2(true)
            return
        }
        peggy.current.position.z -= speed
    }

    function doSecondAction () {
        if (!peggy) return
        if (!canGo2) return
        if (secondActionDone) return
        if (thirdStepDone2) {
            console.log("Finished the second Action for Peggy")
            setSecondActionDone(true)
            cameToVictor()
            return
        }
        doFirstStep2()
        doSecondStep2()
        doThirdStep2()
    }

    function doFirstStep3() {
        if (firstStepDone3) return
        if (peggy.current.position.z >= -0.11 && peggy.current.position.z <= 0.11) {
            setFirstStepDone3(true)
            return
        }
        returnOrig1()
        returnOrig2()
    }

    // if she is on path A right now
    function returnOrig1() {
        if (firstStepDone3) return
        if (peggy.current.position.z >= 0.05) return
        peggy.current.position.z += speed
    }

    // if she is on path B right now
    function returnOrig2() {
        if (firstStepDone3) return
        if (peggy.current.position.z < -0.05) return
        peggy.current.position.z -= speed
    }

    function doSecondStep3() {
        if (!firstStepDone3) return
        if (secondStepDone3) return
        if (peggy.current.position.x <= 2.1) {
            setSecondStepDone3(true)
            return
        }
        peggy.current.position.x -= speed
    }

    function doThirdAction () {
        if (!peggy) return
        if (!canGo3) return
        if (thirdActionDone) return
        if (secondStepDone3) {
            console.log("Finished the third Action for Peggy")
            setThirdActionDone(true)
            cameToStart()
            return
        }
        doFirstStep3()
        doSecondStep3()
    }

    function resetAll() {
        if ((!firstActionDone || !secondActionDone || !thirdActionDone) && !reset) return
        // if (!firstActionDone) return
        // if (!secondActionDone) return
        // if (!thirdActionDone) return

        setClicked(false)

        setRightPosOne(false)

        setFirstStepDone1(false)
        setSecondStepDone1(false)
        setThirdStepDone1(false)
        setForthStepDone1(false)

        setFirstStepDone2(false)
        setSecondStepDone2(false)
        setThirdStepDone2(false)

        setFirstStepDone3(false)
        setSecondStepDone3(false)

        setFirstActionDone(false)
        setSecondActionDone(false)
        setThirdActionDone(false)

        // console.log("resets Peggy")

        if (reset) {
            peggy.current.position.x = 2
            peggy.current.position.y = 1
            peggy.current.position.z = 0
            resetComplete()
            console.log("reset all for Peggy")
        }

    }

    useFrame(({clock}) => {
        doFirstAction()
        doSecondAction()
        doThirdAction()
        resetAll()
    })

    return (
        <RoundedBox
            ref={peggy}
            args={[0.75, 0.75, 0.75]}
            position={[2, 1, 0]}
            onClick={() => {
                if (turboOn) return
                setClicked(!clicked)
            }}>
            <meshStandardMaterial color={'#DC143C'} />
        </RoundedBox>
    )
}

export default Peggy;