import React, { useState, useEffect } from "react";

import TilePalette from "../tile-palette";
import Map from "../map";

import useDraggable from "../../hooks/use-draggable";

export default function App() {
  const { position } = useDraggable("handle");

  const [tileset, setTileset] = useState("rpg-nature-tileset/spring");
  const [activeTile, setActiveTile] = useState({ x: 2 * 32, y: 4 * 32 });
  const [tiles, setTiles] = useState([]);
  const [mapSize, setMapSize] = useState({
    width: 800,
    height: 600,
  });
  const [bgTile, setBgTile] = useState({ x: -32, y: -32 });

  useEffect(() => {
    const _tiles = [];
    let id = 0;

    for (let y = 0; y < mapSize.height; y = y + 32) {
      const row = [];
      for (let x = 0; x < mapSize.width; x = x + 32) {
        row.push({ x, y, id: id++, v: { x: -32, y: -32 } });
      }
      _tiles.push(row);
    }
    setTiles(_tiles);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "grey",
        overflow: "hidden",
        border: "1px solid black",
      }}
    >
      <TilePalette
        position={position}
        tileset={tileset}
        activeTile={activeTile}
        setActiveTile={setActiveTile}
        setTileset={setTileset}
        setBgTile={setBgTile}
      />

      <Map
        tiles={tiles}
        tileset={tileset}
        size={mapSize}
        activeTile={activeTile}
        setTiles={setTiles}
        bgTile={bgTile}
      />
    </div>
  );
}
