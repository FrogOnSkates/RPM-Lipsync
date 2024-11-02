import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { CuboidCollider, RigidBody, useRapier } from '@react-three/rapier';
import { Ship } from '../models/Ship';

const SPEED = 3;
const SPRINT_SPEED = 20;
const ROTATION_SPEED = 0.01;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const cameraOffset = new THREE.Vector3(0, 4, -7);

export function Player2({ lerp = THREE.MathUtils.lerp, onCollision }) {
  const rapier = useRapier();
  const ref = useRef(null);
  const [, get] = useKeyboardControls();
  const [rotation, setRotation] = useState(0);

  useFrame((state) => {
    const { forward, backward, left, right, sprint, jump, rotateLeft, rotateRight } = get();
    const velocity = ref.current?.linvel();

    if (ref.current) {
      if (rotateLeft) setRotation((prev) => prev + ROTATION_SPEED);
      if (rotateRight) setRotation((prev) => prev - ROTATION_SPEED);

      const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotation, 0));
      ref.current.setRotation(quaternion);

      const playerPos = ref.current.translation();
      const offset = cameraOffset.clone().applyQuaternion(quaternion);

      const desiredCameraPos = new THREE.Vector3(
        playerPos.x + offset.x,
        playerPos.y + offset.y,
        playerPos.z + offset.z
      );

      state.camera.position.lerp(desiredCameraPos, 0.1);
      state.camera.lookAt(playerPos.x, playerPos.y, playerPos.z);

      frontVector.set(0, 0, forward - backward);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(sprint ? SPRINT_SPEED : SPEED)
        .applyQuaternion(quaternion);

      ref.current?.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

      const world = rapier.world;
      const ray = world.castRay(
        new RAPIER.Ray(ref.current?.translation(), { x: 0, y: -1, z: 0 })
      );
      const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;

      if (jump && grounded) {
        ref.current.setLinvel({ x: 0, y: 1.75, z: 0 });
      }
    }
  });

  return (
    <RigidBody
      canSleep={false}
      ref={ref}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[5, 2, 18]}
      enabledRotations={[false, false, false]}
      onCollisionEnter={(event) => {
        console.log("Collision detected with:", event.colliderObject?.name);
        if (event.colliderObject?.name === 'IslandCollision' && onCollision) {
          console.log("Switching camera perspective due to collision");
          onCollision(); // Trigger camera toggle on collision with IslandCollision
        }
      }}
      
    >
      <CuboidCollider args={[1, 1, 1]} sensor={false} />
      <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial 
          color="lightgreen" 
          wireframe 
          transparent 
          opacity={0} // Adjust the opacity as needed (0 is fully transparent, 1 is fully opaque)
        />
      </mesh>
      <Ship 
      scale={0.35}
      position={[0, -3.5, 0]}
      />
    </RigidBody>
  );
}
