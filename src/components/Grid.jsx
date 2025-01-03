import React, { useEffect, useState } from "react";
import "./Grid.css";

const Grid = () => {
  // Dynamically calculate rows and columns based on window size
  const [dimensions, setDimensions] = useState({
    rows: Math.floor(window.innerHeight / 22), // Approx 22px cell height
    cols: Math.floor(window.innerWidth / 22),  // Approx 22px cell width
  });

  const [grid, setGrid] = useState(
    Array(dimensions.rows)
      .fill(null)
      .map(() => Array(dimensions.cols).fill(null))
  );

  // Generate a random color for raindrops
  const randomColor = () => {
    const colors = ["#FF1493", "#9400D3", "#8A2BE2", "#4B0082", "#FF00FF"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Update grid for falling rain effect
  const updateGrid = () => {
    setGrid((prevGrid) => {
      const newGrid = Array(dimensions.rows)
        .fill(null)
        .map(() => Array(dimensions.cols).fill(null));

      for (let r = dimensions.rows - 1; r >= 0; r--) {
        for (let c = 0; c < dimensions.cols; c++) {
          if (prevGrid[r][c]) {
            if (r < dimensions.rows - 1) {
              newGrid[r + 1][c] = prevGrid[r][c]; // Move raindrop down
            }
          } else if (r === 0 && Math.random() > 0.9) {
            newGrid[r][c] = randomColor(); // Add new raindrop
          }
        }
      }

      return newGrid;
    });
  };

  // Update rows and columns when window resizes
  useEffect(() => {
    const handleResize = () => {
      const rows = Math.floor(window.innerHeight / 22);
      const cols = Math.floor(window.innerWidth / 22);
      setDimensions({ rows, cols });
      setGrid(
        Array(rows)
          .fill(null)
          .map(() => Array(cols).fill(null))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateGrid, 150); // Update grid every 150ms
    return () => clearInterval(interval);
  }, [dimensions]);

  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${dimensions.rows}, 20px)`,
        gridTemplateColumns: `repeat(${dimensions.cols}, 20px)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="cell"
            style={{ backgroundColor: cell || "black" }}
          ></div>
        ))
      )}
    </div>
  );
};

export default Grid;
