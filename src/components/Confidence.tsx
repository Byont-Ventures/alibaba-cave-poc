import React, {useRef, useState} from "react";
import THREE from "three";
import {Text} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";

export interface ConfidenceProps {repetitions: number, reset: boolean, resetComplete: () => void}

export const Confidence : React.FunctionComponent<ConfidenceProps> = ({ repetitions, reset, resetComplete}) => {
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

    function resetAll() {
        if (!confRef) return
        if (!reset) return
        setConfidence(0)
        setCheckReps(0)
        resetComplete()
    }

    useFrame(({clock}) => {
        calculate()
        resetAll()
    })

    return (
        <Text
            ref={confRef}
            position={[2.25, 5.5, 0]}
            fontSize={1}
            color={'white'}>
            Confidence: {confidence}%
        </Text>
    )
}

export default Confidence;