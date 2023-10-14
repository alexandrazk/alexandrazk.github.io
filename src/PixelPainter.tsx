import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const cellSize = 20;
const numRows = 20;
const numCols = 20;
const canvasWidth = cellSize * numCols;
const canvasHeight = cellSize * numRows;

const colorPresets = ["#FAC3C1", "#FD0035", "#2C2C2C"];
const backgroundColor = "#E8E5E3";

const PixelPainter: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(colorPresets[0]);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = backgroundColor;
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

  const clearGrid = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw the grid lines
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
  };

  return (
    <div>
      <div>
        <div>
          <motion.button
            className={`pixel-button red-button ${
              selectedColor === "#FD0035" ? "selected-button" : ""
            }`}
            onClick={() => setSelectedColor("#FD0035")}
            whileHover={{ scale: 1.1 }}
          ></motion.button>
          <motion.button
            className={`pixel-button blue-button ${
              selectedColor === "#2C2C2C" ? "selected-button" : ""
            }`}
            onClick={() => setSelectedColor("#2C2C2C")}
            whileHover={{ scale: 1.1 }}
          ></motion.button>
          <motion.button
            className={`pixel-button black-button ${
              selectedColor === "#FAC3C1" ? "selected-button" : ""
            }`}
            onClick={() => setSelectedColor("#FAC3C1")}
            whileHover={{ scale: 1.1 }}
          ></motion.button>
        </div>
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
        style={{ touchAction: "none" }} // Add this line
      ></motion.canvas>
      <div>
        <button className="clear-button" onClick={clearGrid}>
          Clear Grid
        </button>
      </div>
    </div>
  );
};

export default PixelPainter;
