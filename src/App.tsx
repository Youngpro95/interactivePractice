import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <div style={{ background: "silver", height: "100vh" }}>
      <Canvas>
        <OrbitControls autoRotate={true} />
        <mesh>
          <ambientLight intensity={1} />
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={"lightskyblue"} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
