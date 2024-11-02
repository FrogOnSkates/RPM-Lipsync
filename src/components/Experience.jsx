import {ContactShadows, OrbitControls, Sky, Stats } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { ConvaiFPS } from './fps/convaiFPS';
import { Anita } from './models/Anita';
import { FloatingIsland } from "./models/FloatingIsland";
import { Grass } from "./models/Grass";
import { Ocean } from "./models/Ocean";
import { Ship } from "./models/Ship";
import { SeaMonster } from "./models/SeaMonster";
import { IslandCollision } from './models/IslandCollision';
import * as THREE from 'three';
import { Dock } from './models/dock';
import { Beast } from './models/Beast';
export const Experience = ({ client }) => {
  const [gravity, setGravity] = useState([0, 0, 0]);

  useEffect(() => {
    setGravity([0, -9.81, 0]);
  }, []);

  const handleEnter = (event) => {
    console.log('Entered the sphere!', event);
  };

  const handleExit = (event) => {
    console.log('Exited the sphere!', event);
  };

  // Helper function to visualize colliders
  const DebugBox = ({ args, position, rotation }) => (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="red" opacity={0.5} transparent />
    </mesh>
  );

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <hemisphereLight
        skyColor={'#87ceeb'}
        groundColor={'#ffffff'}
        intensity={0.3}
      />
      <directionalLight
        position={[-10, 10, -5]}
        intensity={0.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Models */}
      <Stats />
      <Suspense fallback={null}>
        <Physics gravity={gravity}>
          <ConvaiFPS />
          <Sky />
          <Anita client={client} />
          <FloatingIsland />
          <Grass />
          <Ocean />
          <IslandCollision 
           position={[20, 4, 10]}
          />
          <Beast
           scale={0.1}
           rotation={[0, -Math.PI / 2, 0]}
           position={[120, 0, 20]}/>
          <Beast
           scale={0.1}
           position={[-120, 0, 20]}/>
    
          <Dock
           position={[17, 0, 10]}
           rotation={[0, Math.PI / 2, 0]}
           scale={0.8}
            />
          
          {/* <Ship
            position={[-20, -4, -40]}
            rotation={[0, 4.1015282992312, 0]}
            scale={[0.5, 0.5, 0.5]} // Scale down uniformly
          /> */}

          <SeaMonster
           position={[20, -6, -20]}
           rotation={[-0.785398, 0, -0.785398]} 
           />  

          {/* Visible Colliders for Debugging */}
          <RigidBody type="fixed">
            <CuboidCollider
              args={[2000, 2000, 0.1]}
              position={[0, -0.2, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            />
      
          </RigidBody>
        </Physics>
      </Suspense>

      <ContactShadows opacity={0.7} />
      {/* <OrbitControls /> */}
    </>
  );
};
