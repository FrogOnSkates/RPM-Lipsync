import { useRef } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BOAT_SPEED = 2;

export function Boat({ onBoard }) {
  const boatRef = useRef(null);

  // Boat movement logic
  useFrame((state) => {
    if (onBoard && boatRef.current) {
      const { forward, backward, left, right } = onBoard;
      const direction = new THREE.Vector3(
        left - right,
        0,
        backward - forward
      )
        .normalize()
        .multiplyScalar(BOAT_SPEED);

      boatRef.current.setLinvel({
        x: direction.x,
        y: 0,
        z: direction.z,
      });

      // Update camera to follow the boat
      state.camera.position.set(
        boatRef.current.translation().x,
        boatRef.current.translation().y + 3, // Adjusted camera height
        boatRef.current.translation().z - 5 // Adjusted camera distance
      );
    }
  });

  return (
    <RigidBody
      ref={boatRef}
      type="dynamic"
      mass={500}
      position={[0, 4, 0]} // Set the boat at a higher starting point
      enabledRotations={[false, true, false]} // Only rotate on the Y-axis
    >
      {/* Boat Placeholder Mesh */}
      <mesh>
        <boxGeometry args={[10, 10, 10]} /> {/* Boat dimensions */}
        <meshStandardMaterial color="orange" wireframe /> {/* Brighter color for visibility */}
      </mesh>

      {/* Boat Collider */}
      <CuboidCollider args={[2, 0.5, 1]} />
    </RigidBody>
  );
}
