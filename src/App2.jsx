import React from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const App2 = () => {
  
  return (
    <Canvas style={{width:"100%",height:"100vh"}}>
      <directionalLight position={[0,0,4]} />
      <mesh position={[2,0,0]}>
      <boxGeometry args={[1,1,1]}/>
      <meshStandardMaterial color={"red"} />
      </mesh>
    </Canvas>
  )
}

export default App2