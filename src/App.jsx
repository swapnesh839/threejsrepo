import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const App = () => {
  const renderDivRef = useRef(null);
  const clock = new THREE.Clock();
  const [color, setColor] = useState(false)
  const [count, setCount] = useState(0)

  function countValue(value) {
    if (value === "increment") {
      setCount((prev) => {
        const newCount = prev + 1;
        if (newCount === 3) {
          return 0;
        }
        return newCount;
      });
    } else {
      setCount((prev) => {
        const newCount = prev - 1;
        if (newCount === -1) {
          return 3;
        }
        return newCount;
      });
    }
  }
  


  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      renderDivRef.current.offsetWidth / renderDivRef.current.offsetHeight,
      0.1,
      1000
    );
    camera.position.set(5, 3, 8);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      renderDivRef.current.offsetWidth,
      renderDivRef.current.offsetHeight
    );
    renderer.setClearColor("#6B6B6B", 1);

    const controls = new OrbitControls(camera, renderer.domElement);
    let loadedobj;

    // const textureLoader = new THREE.TextureLoader();

    const Loader = new GLTFLoader();

    let modelPath;

    switch (count) {
      case 0:
        modelPath = "../src/assets/LOT(144).glb";
        break;
      case 1:
        modelPath = "../src/assets/Recline_Sofa.glb";
        break;
      case 2:
        modelPath = "../src/assets/White_Sofa_Smooth_Fabric.glb";
        break;
        // default :
        // modelPath = "../src/assets/LOT(144).glb";
    }



    Loader.load(modelPath, (gltf) => {
      loadedobj = gltf.scene;
      loadedobj.scale.set(3, 3, 3);

      scene.add(loadedobj);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // color, intensity
    scene.add(ambientLight);
    renderDivRef.current.appendChild(renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      // const delta = clock.getDelta();

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directionalLight);

    return () => {
      renderDivRef.current.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, [color, count]);


  return (
    <>
      <div className="w-50 vh-100 position-relative start-50 translate-middle-x top-50">
        <button onClick={() => { countValue("increment") }} className="position-absolute btn btn-success end-0 top-50">
          <FaChevronRight />
        </button>
        <button onClick={() => { countValue("decrement") }} className="position-absolute btn btn-success top-50">
          <FaChevronLeft />
        </button>
        <div
          className="m-auto ratio-1x1 h-100"
          ref={renderDivRef}
        />
      </div>
    </>
  );
};

export default App;
