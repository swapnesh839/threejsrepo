import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const App = () => {
  const renderDivRef = useRef(null);
  const clock = new THREE.Clock();
  const [color, setColor] = useState(false)

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

    // Create a TextureLoader instance
    const textureLoader = new THREE.TextureLoader();

    // Create a GLTFLoader instance
    const Loader = new GLTFLoader();
    const modelPath = color ? "../src/assets/LOT(144)2.glb" : "../src/assets/LOT(144).glb";
    Loader.load(modelPath, (gltf) => {
      loadedobj = gltf.scene;
      loadedobj.scale.set(0.8, 0.8, 0.8);

      // Assuming the material you want to texture is at index 0
      // const materialForSpecificPart = loadedobj.children[0].material;
      // const materialForSpecificPart1 = loadedobj.children[1].material;
      // const materialForSpecificPart2 = loadedobj.children[2].material;
      // const materialForSpecificPart3 = loadedobj.children[3].material;
      // const materialForSpecificPart4 = loadedobj.children[4].material;
      // const materialForSpecificPart5 = loadedobj.children[5].material;
      // const materialForSpecificPart6 = loadedobj.children[6].material;

      // Load the texture with UV mapping
      // if (color) {
      //   const materalloader = new THREE.MaterialLoader()
      //   const material = materalloader.load(

      //   )
      //   const texture = textureLoader.load(
      //     "../src/assets/green.png"
        //   // (loadedTexture) => {
        //   //   // loadedTexture.wrapS = THREE.RepeatWrapping;
        //   //   // loadedTexture.wrapT = THREE.RepeatWrapping;
        //   //   // loadedTexture.repeat.set(1, 1); // Adjust repeat values based on your UV mapping

        //   //   // Apply the texture to the material
        //   //   materialForSpecificPart.map = loadedTexture;
        //   //   materialForSpecificPart.needsUpdate = true;

        //   // }
        // )
        // materialForSpecificPart.map = texture;
        // materialForSpecificPart1.map = texture;
        // materialForSpecificPart2.map = texture;
        // // materialForSpecificPart3.map = texture;
        // materialForSpecificPart4.map = texture;
        // materialForSpecificPart5.map = texture;
        // materialForSpecificPart6.map = texture;
        // // materialForSpecificPart.needsUpdate = true;
      // }

      scene.add(loadedobj);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // color, intensity
    scene.add(ambientLight);
    renderDivRef.current.appendChild(renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (loadedobj) {
        // Perform any animations or transformations here
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate(); // all the animate function

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directionalLight);

    // Cleanup on component unmount
    return () => {
      renderDivRef.current.removeChild(renderer.domElement);
      controls.dispose(); // Dispose the controls
    };
  }, [color]);

  function texture() {
    setColor(!color)
    console.log(color);
  }

  return (
    <>
      <div className="d-flex">
        <div
          className="m-auto"
          ref={renderDivRef}
          style={{ width: '100%', height: '100vh' }}
        />
        <button onClick={texture} className="btn btn-bg-success z-3 w-25">button</button>
      </div>
    </>
  );
};

export default App;
