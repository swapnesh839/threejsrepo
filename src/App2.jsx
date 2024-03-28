// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { FaChevronLeft } from "react-icons/fa";
// import { FaChevronRight } from "react-icons/fa";
// import { Button } from 'react-bootstrap';

// const App2 = () => {
//   const renderDivRef = useRef(null);
//   const clock = new THREE.Clock();
//   const [color, setColor] = useState(false)
//   const [count, setCount] = useState(true)

//   const toggleModel = ()=>{
//     setCount((e)=>!e)
//   }

//   // function countValue(value) {
//   //   if (value === "increment") {
//   //     setCount((prev) => {
//   //       const newCount = prev + 1;
//   //       if (newCount === 3) {
//   //         return 1;
//   //       }
//   //       return newCount;
//   //     });
//   //   } else {
//   //     setCount((prev) => {
//   //       const newCount = prev - 1;
//   //       if (newCount === -1) {
//   //         return 2;
//   //       }
//   //       return newCount;
//   //     });
//   //   }
//   // }



//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       renderDivRef.current.offsetWidth / renderDivRef.current.offsetHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(5, 3, 8);

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(
//       renderDivRef.current.offsetWidth,
//       renderDivRef.current.offsetHeight
//     );
//     renderer.setClearColor("#6B6B6B", 1);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     let loadedobj;

//     // const textureLoader = new THREE.TextureLoader();

//     const Loader = new GLTFLoader();

//     let modelPath 
    
//     if (count) {
//       modelPath = "../src/assets/LOT(308).glb"
//     }else{
//       modelPath="../src/assets/LOT(308)2.glb"
//     }

    
//     Loader.load(modelPath, (gltf) => {
//       loadedobj = gltf.scene;
//       loadedobj.scale.set(3, 3, 3);

//       scene.add(loadedobj);
//     });

//     const ambientLight = new THREE.AmbientLight(0xffffff, 1); // color, intensity
//     scene.add(ambientLight);
//     renderDivRef.current.appendChild(renderer.domElement);

//     function animate() {
//       requestAnimationFrame(animate);
//       // const delta = clock.getDelta();

//       controls.update();
//       renderer.render(scene, camera);
//     }

//     animate();

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     scene.add(directionalLight);

//     return () => {
//       renderDivRef.current.removeChild(renderer.domElement);
//       controls.dispose();
//     };
//   }, [color, count]);


//   return (
//     <>

//       <div className="w-50 vh-100 position-relative start-50 translate-middle-x top-50">
//         {/* <button onClick={() => { countValue("increment") }} className="position-absolute btn btn-success end-0 top-50">
//           <FaChevronRight />
//         </button> */}
//         {/* <button onClick={() => { countValue("decrement") }} className="position-absolute btn btn-success top-50">
//           <FaChevronLeft />
//         </button> */}
//         <Button className="position-absolute top-50 translate-middle-y" style={{right:"-30px"}} onClick={()=>{toggleModel()}}>ToggleModel</Button>
//         <div
//           className="m-auto ratio-1x1 h-100"
//           ref={renderDivRef}
//         />
//       </div>

//     </>
//   );
// };

// export default App2;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Button } from 'react-bootstrap';

const App2 = () => {
  const renderDivRef = useRef(null);

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
    renderer.setClearColor('#6B6B6B', 1);

    const controls = new OrbitControls(camera, renderer.domElement);
    let loadedObj;

    const loader = new GLTFLoader();

    const modelPath = '../src/assets/LOT(308).glb';

    loader.load(modelPath, (gltf) => {
      loadedObj = gltf.scene;
      loadedObj.scale.set(3, 3, 3);

      const textureLoader = new THREE.TextureLoader();
      const texture1 = textureLoader.load('../src/assets/Blue.png');
      const texture2 = textureLoader.load('../src/assets/red.png');

      // Ensure the GLTF model is found
      if (loadedObj) {
        loadedObj.traverse((child) => {
          if (child.isMesh) {
            child.material.map = texture1; // Set the initial texture

            // Handle button click to toggle the texture
            const toggleButton = document.getElementById('toggleButton');
            toggleButton.addEventListener('click', () => {
              child.material.map = child.material.map === texture1 ? texture2 : texture1;
              child.material.needsUpdate = true; // Ensure the material update is applied
            });
          }
        });
      }

      scene.add(loadedObj);
    });

    // Add four directional lights from each side
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1).normalize();
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(-1, 1, 1).normalize();
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xffffff, 1);
    light3.position.set(1, 1, -1).normalize();
    scene.add(light3);

    const light4 = new THREE.DirectionalLight(0xffffff, 1);
    light4.position.set(-1, 1, -1).normalize();
    scene.add(light4);

    renderDivRef.current.appendChild(renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      renderDivRef.current.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, []);

  return (
    <>
      <div className="w-50 vh-100 position-relative start-50 translate-middle-x top-50">
        <Button
          id="toggleButton"
          className="position-absolute top-50 translate-middle-y"
          style={{ right: '-30px' }}
        >
          Toggle Texture
        </Button>
        <div className="m-auto ratio-1x1 h-100" ref={renderDivRef} />
      </div>
    </>
  );
};

export default App2;
