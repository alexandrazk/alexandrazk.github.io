import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const cellSize = 20;
const numRows = 20;
const numCols = 20;
const canvasWidth = cellSize * numCols;
const canvasHeight = cellSize * numRows;

const colorPresets = ["black", "red", "blue"];

const PixelPainter: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(colorPresets[0]);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "gray";
    context.lineWidth = 1;
    for (let row = 1; row < numRows; row++) {
      const y = row * cellSize;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvasWidth, y);
      context.stroke();
    }
    for (let col = 1; col < numCols; col++) {
      const x = col * cellSize;
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvasHeight);
      context.stroke();
    }
  }, []);

  const handleMouseDown = () => {
    setDrawing(true);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    drawPixel(e);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    drawPixel(e.touches[0]);
  };

  const handleTouchEnd = () => {
    setDrawing(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    drawPixel(e.touches[0]);
  };

  const drawPixel = (event: React.Touch | React.MouseEvent) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize) * cellSize;
    const y = Math.floor((event.clientY - rect.top) / cellSize) * cellSize;

    context.fillStyle = selectedColor;
    context.fillRect(x, y, cellSize, cellSize);
  };

  return (
    <div>
      <h1>Pixel Painter</h1>
      <div>
        {colorPresets.map((presetColor, index) => (
          <motion.button
            key={index}
            style={{
              backgroundColor: presetColor,
              width: "30px",
              height: "30px",
              margin: "5px",
              border:
                presetColor === selectedColor ? "2px solid white" : "none",
            }}
            onClick={() => setSelectedColor(presetColor)}
            whileHover={{ scale: 1.2 }}
          ></motion.button>
        ))}
      </div>
      <motion.canvas
        id="canvas"
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      ></motion.canvas>
    </div>
  );
};

export default PixelPainter;
