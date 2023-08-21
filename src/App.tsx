import React, { useEffect, useRef, useState } from "react";

import { OrbitControls } from "@react-three/drei";
import useResizeEvent from "./components/useResize";
import styled from "@emotion/styled";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKeys((prevKeys) => ({
        ...prevKeys,
        [event.key]: true,
      }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((prevKeys) => ({
        ...prevKeys,
        [event.key]: false,
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        const radius = 20;
        let x = canvas.width / 2;
        let y = canvas.height - radius;

        const drawBall = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fillStyle = "silver";
          context.fill();
          context.closePath();
        };

        const animate = () => {
          if (pressedKeys["w"]) y -= 1;
          if (pressedKeys["a"]) x -= 1;
          if (pressedKeys["s"]) y += 1;
          if (pressedKeys["d"]) x += 1;

          drawBall();
          requestAnimationFrame(animate);
        };

        animate();
      }
    }
  }, [pressedKeys]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", background: "black" }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}

export default App;

const Canvas = styled.canvas`
  display: block;
  background-color: black;
`;
// 0817 resizeEvent를 이용해서 canvas에 width 와 height 를 주입해서 시도해보았으나 잘 안되었음
// 추후 다시 시도해볼것

// 0818 canvas width height 를 기준으로 벽 식별 및 방향 전환
