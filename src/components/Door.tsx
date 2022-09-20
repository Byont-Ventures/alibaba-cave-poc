import React, {useRef} from "react";
import {RoundedBox} from "@react-three/drei";
import THREE from "three";

export interface DoorProps {secretWord: boolean, victorPath: string, peggyPath: string, canGo1: boolean, canGo2: boolean,
    opened: () => void, closed: () => void}

export const Door : React.FunctionComponent<DoorProps> = ({secretWord, victorPath, peggyPath}) => {
    const door = useRef<THREE.Mesh>(null!)

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