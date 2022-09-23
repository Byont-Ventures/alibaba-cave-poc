import React, {useRef, useState} from "react";
import {RoundedBox} from "@react-three/drei";
import THREE from "three";
import {useFrame} from "@react-three/fiber";

export interface DoorProps {canGo1: boolean, canGo2: boolean,
    opened: () => void, closed: () => void, reset: boolean, resetComplete: () => void}

export const Door : React.FunctionComponent<DoorProps> = ({canGo1, canGo2,
                                                              opened, closed, reset, resetComplete}) => {
    const door = useRef<THREE.Mesh>(null!)

    const [doorOpened, setDoorOpened] = useState(false)

    // Opens the  door
    function open() {
        if (!door) return
        if (!canGo1) return
        if (doorOpened) return
        if (door.current.position.x <= 4.95) {
            setDoorOpened(true)
            console.log("The door opened")
            opened()
            return
        }
        door.current.position.x -= 0.05
    }

    // Closes the door
    function close() {
        if (!door) return
        if (!canGo2) return
        if (!doorOpened) return
        if (door.current.position.x >= 5.95) {
            setDoorOpened(false)
            console.log("the door closed")
            closed()
            return
        }
        door.current.position.x += 0.05
    }

    // Resets the door and puts it to the initial state
    function resetAll() {
        if (!reset) return
        door.current.position.x = 6
        door.current.position.y = 1
        door.current.position.z = 0
        console.log("reset the door")
        resetComplete()
    }

    // continuously checks if the actions should be executed and executes them if the criteria are met
    useFrame(({clock}) => {
        open()
        close()
        resetAll()
    })

    return (
        <RoundedBox
            ref={door}
            args={[1, 1.5, 0.01]}
            position={[6, 1, 0]}>
            <meshStandardMaterial color={'#5377EE'} />
        </RoundedBox>
    )
}

export default Door;