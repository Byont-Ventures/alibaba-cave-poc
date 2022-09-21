import React, {MutableRefObject, useRef, useState} from "react";
import {RoundedBox} from "@react-three/drei";
import THREE from "three";
import {useFrame} from "@react-three/fiber";


// function goThroughDoor(door: MutableRefObject<THREE.Mesh>, peggy: MutableRefObject<THREE.Mesh>, peggyPath: string, victorPath: string, secretWord: boolean, time: number) {
//     let intervalId = setInterval(() => {
//         if (door.current.position.x <= 4.98) {
//             clearInterval(intervalId)
//             if (peggyPath === "B") {
//                 // peggyReturns1(peggy, secretWord, time)
//             }
//             else {
//                 // peggyReturns2(peggy, secretWord, time)
//             }
//             let intervalId2 = setInterval(() => {
//                 if (peggy.current.position.z >= 2.375 || peggy.current.position.z <= -2.375 || peggy.current.position.z <= 3) {
//                     if (door.current.position.x >= 5.98) {
//                         clearInterval(intervalId2)
//                     }
//                     door.current.position.x += 0.02
//                 }
//             }, time)
//         }
//         door.current.position.x -= 0.02
//     }, time)
// }


export interface DoorProps {secretWord: boolean, victorPath: string, peggyPath: string, canGo1: boolean, canGo2: boolean,
    opened: () => void, closed: () => void}

export const Door : React.FunctionComponent<DoorProps> = ({secretWord, victorPath, peggyPath,
                                                              canGo1, canGo2, opened, closed}) => {
    const door = useRef<THREE.Mesh>(null!)

    const [doorOpened, setDoorOpened] = useState(false)

    function open() {
        if (!door) return
        if (!canGo1) return
        if (doorOpened) return
        if (door.current.position.x <= 4.95) {
            setDoorOpened(true)
            opened()
            return
        }
        door.current.position.x -= 0.05
    }

    function close() {
        if (!door) return
        if (!canGo2) return
        if (!doorOpened) return
        if (door.current.position.x >= 5.95) {
            setDoorOpened(false)
            closed()
            return
        }
        door.current.position.x += 0.05
    }

    useFrame(({clock}) => {
        open()
        close()
    })

    return (
        <RoundedBox
            ref={door}
            args={[1, 1.5, 0.01]}
            position={[6, 1, 0]}>
            <meshStandardMaterial color={'purple'} />
        </RoundedBox>
    )
}

export default Door;