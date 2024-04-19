import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Button } from 'react-bootstrap';

const App3 = () => {
  const renderDivRef = useRef(null);
  const colorInputRef = useRef(null);

  useLayoutEffect(() => {
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
    renderer.setClearColor('#2C2C2C', 3);


    const controls = new OrbitControls(camera, renderer.domElement);
    let loadedObj;

    const loader = new GLTFLoader();

    // const modelPath = 'https://drive.google.com/file/d/1LgVcObhTI4lvK0SwgOBzAFPhAYx1IX8P/view?usp=sharing';
    const modelPath = '../src/assets/car.glb';
    // const modelPath = '../src/assets/penTabblend.glb';
    // const modelPath = '../src/assets/LOT(308).glb';

    loader.load(modelPath, (gltf) => {
      loadedObj = gltf.scene;
      loadedObj.scale.set(1.7, 1.7, 1.7);

      const objectToColor = loadedObj.getObjectByName('Section')
      
      // console.log(objectToColor,loadedObj);
      if (objectToColor) {
        objectToColor.traverse((child) => {
          if (child.isMesh) {
            const initialColor = new THREE.Color(colorInputRef.current.value);
            child.material.color = initialColor;

            // Handle input color change to update the model color
            colorInputRef.current.addEventListener('input', (event) => {
              const selectedColor = new THREE.Color(event.target.value);
              child.material.color.copy(selectedColor); // Use copy to correctly update the color
            });
          }
        });
      }

      scene.add(loadedObj);
    });


    const light1 = new THREE.DirectionalLight(0xffffff, 2);
    light1.position.set(1, 1, 1).normalize();
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 2);
    light2.position.set(-1, 1, 1).normalize();
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xffffff, 2);
    light3.position.set(1, 1, -1).normalize();
    scene.add(light3);

    const light4 = new THREE.DirectionalLight(0xffffff, 2);
    light4.position.set(-1, 1, -1).normalize();
    scene.add(light4);

    // Create a directional light from below the object
    const lightFromBelow = new THREE.DirectionalLight(0xffffff, 2);
    lightFromBelow.position.set(0, -1, 0).normalize(); // Adjust the position as needed
    scene.add(lightFromBelow);


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
        <input
          type="color"
          ref={colorInputRef}
          defaultValue="#3498db"
          className="position-absolute top-50 translate-middle-y border border-3 border-dark-subtle"
          style={{
            right: '-60px',
            width: '30px',
            height: '30px',
            padding: '0',
            cursor: 'pointer',
          }}
        />

        <div className="m-auto ratio-1x1 h-100 bg-black" ref={renderDivRef} />
      </div>
    </>
  );
};

export default App3;
