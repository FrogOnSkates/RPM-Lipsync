import { useState } from 'react';
import { PointerLockControls } from '@react-three/drei';
import { Player as Player1 } from './player';
import { Player2 } from './player2';
import { IslandCollision } from '../models/IslandCollision';

export const ConvaiFPS = () => {
  const [usePlayer1, setUsePlayer1] = useState(true);

  // Toggle function to switch between Player1 and Player2
  const togglePlayer = () => {
    console.log("Toggling player");
    setUsePlayer1((prev) => !prev);
  };

  return (
    <>
      <PointerLockControls />
      {usePlayer1 ? <Player1 onCollision={togglePlayer} /> : <Player2 onCollision={togglePlayer} />}
      <IslandCollision
      />
    </>
  );
};
