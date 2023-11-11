import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, PresentationControls } from "@react-three/drei";
import { useControls } from "leva";
import Loader from "./Loader";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Room = () => {
  const { scene } = useLoader(GLTFLoader, "/model/scene.gltf");

  // these are the controls for the model
  const { upDown, rightLeft, nearFar, rotation } = useControls("Model", {
    upDown: {
      value: -1.7,
      step: 0.1,
    },
    rightLeft: {
      value: 0,
      step: 0.1,
    },
    nearFar: {
      value: 0.2,
      step: 0.1,
    },

    rotation: {
      value: [0, 0.7, 0],
      step: 0.1,
    },
  });

  // //traverse fbx
  scene.traverse((child) => {
    //turn off model lights
    if (child.isLight) {
      // Disable lights
      child.intensity = 0.5;
      //child.visible = false;
    }
    if (child.isMesh) {
      if (child.name === "Ground001") {
        child.material.transparent = true;
        child.material.opacity = 0;
      }
    }
  });

  return (
    <group position={[rightLeft, upDown, nearFar]} rotation={rotation}>
      <PresentationControls>
        <primitive object={scene} />
      </PresentationControls>
    </group>
  );
};

function Scene() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
      }}
    >
      {/* this is the 3d scene */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* lighting */}
        <ambientLight intensity={0.3} />

        <directionalLight position={[0, 10, 5]} />

        {/* orbit controls */}
        <Environment preset='sunset' />
        {/* light light */}
        {/* model and its loader */}
        <Suspense fallback={<Loader />}>
          <Room />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
