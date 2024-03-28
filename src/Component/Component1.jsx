import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas,useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Plane, Sphere, useGLTF } from '@react-three/drei'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from 'react-icons/fa6';


// const angleradiant = (deg) => (Math.PI / 100) * deg

const Cube = ({ color, position, size }) => {
  const meshref = useRef(null)
  useFrame((state, delta) => {
    // console.log(state,delta);
    meshref.current.rotation.y += delta
    meshref.current.rotation.x += delta
    meshref.current.rotation.z += delta
  })
  return (
    <mesh position={position} ref={meshref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const ImportedFile = (url) => {
  // console.log(url);

  useEffect(()=>{
  },[url])
  const { scene } = useGLTF(url.url);
  useFrame((state, delta) => {
  // ImportedFileref.current.rotation.y += delta
  })
  const ImportedFileref = useRef(null)

  return (
    <>
      <primitive object={scene} ref={ImportedFileref} scale={[2, 2, 2]} />
    </>
  )
};

const Three = ()=>{
  const {scene,camera,gl}= useThree()
  // camera.position.set(5,2,4)
  console.log(scene);
  return null
}

const Component1 = () => {
  const [count, setCount] = useState(true)
  // const btnref = useRef(null)
  const toggleModel = () => {
    setCount((e) => !e)
  }
  return (
    <div className="position-relative w-100 h-100">
      <Canvas className="h-100 w-100 position-relative">
        <PerspectiveCamera makeDefault position={[5, 2, 4]} />
        <Suspense fallback={null}>
          <OrbitControls />
          <Three/>
          {/* <ImportedFile url={(count)?"https://codekart.s3.amazonaws.com/Recline_Sofa+(1).glb":"https://codekart.s3.amazonaws.com/White_Sofa_Smooth_Fabric.glb"} /> */}
          <ImportedFile rotation={[0,20,0]} url={count ? "../../src/assets/untitled2.glb" : "https://codekart.s3.amazonaws.com/White_Sofa_Smooth_Fabric.glb"} />
        </Suspense>
        <directionalLight color={"#bad4f9"} intensity={6} />
        <directionalLight color={"#bad4f9"} intensity={6} position={[0,6,0]} />
        <ambientLight args={["white", 1]} />
      </Canvas>
      <button onClick={toggleModel} className="position-absolute start-0 btn btn-success top-50 translate-middle-y m-1" >
        <FaAngleLeft/>
      </button>
      <button onClick={toggleModel} className="position-absolute end-0 btn btn-success top-50 translate-middle-y m-1" >
        <FaAngleRight/>
      </button>
    </div>
  )
}

export default Component1
