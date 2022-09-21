import React, {useRef, useState} from "react";
import THREE from "three";
import {Text} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";

export interface ConfidenceProps {repetitions: number}

export const Confidence : React.FunctionComponent<ConfidenceProps> = ({ repetitions}) => {
    const confRef = useRef<THREE.Mesh>(null!)

    const [confidence, setConfidence] = useState(0.0)
    const [checkReps, setCheckReps] = useState(0)

    function calculate() {
        if (!confRef) return
        if (checkReps === repetitions) return
        if (repetitions > checkReps) {
            const newConf = confidence + 50 / Math.pow(2, checkReps)
            setCheckReps(checkReps + 1)
            setConfidence(newConf)
        }
        if (repetitions === 0) {
            setCheckReps(0)
            setConfidence(0)
        }
    }

    useFrame(({clock}) => {
        calculate()
    })

    return (
        <Text
            ref={confRef}
            position={[2.25, 7, 0]}
            fontSize={1}
            color={'black'}>
            Confidence: {confidence}%
        </Text>
    )
}

export default Confidence;