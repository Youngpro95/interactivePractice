import React, { useEffect, useRef, useState } from "react";

import { OrbitControls } from "@react-three/drei";
import useResizeEvent from "./components/useResize";
import styled from "@emotion/styled";

function App() {
  const panelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const dimensions = useResizeEvent(panelRef, 100);
  useEffect(() => {
    setSize({ w: dimensions?.width || 0, h: dimensions?.height || 0 });
  }, [dimensions]);
  const handleCanvasResize = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
      window.addEventListener("resize", handleCanvasResize);
      handleCanvasResize();

      let x = canvas.width / 2;
      let y = canvas.height - 30;

      const dx = 0;
      const dy = -2;

      const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(x, y, 20, 0, Math.PI * 2);
        context.fillStyle = "silver";
        context.fill();
        context.closePath();

        x += dx;
        y += dy;
      };
      setInterval(draw, 50);
    }
    return function () {
      window.removeEventListener("resize", handleCanvasResize);
    };
  }, [canvasRef]);

  return (
    <div ref={panelRef} style={{ height: "100vh", backgroundColor: "salmon" }}>
      <Canvas ref={canvasRef}>
        {/* <OrbitControls autoRotate={true} />
        <mesh>
          <ambientLight intensity={1} />
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={"lightskyblue"} />
        </mesh> */}
      </Canvas>
    </div>
  );
}

export default App;

const Canvas = styled.canvas`
  display: block;
  background-color: black;
`;

// 0817 resizeEvent를 이용해서 canvas에 width 와 height 를 주입해서 시도해보았으나 잘 안되었음
// 추후 다시 시도해볼것
