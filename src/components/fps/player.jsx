import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';
import { Ship } from "../models/Ship";

const SPEED = 3;
const SPRINT_SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export function Player({ lerp = THREE.MathUtils.lerp, onCollision }) {
  const rapier = useRapier();
  const ref = useRef(null);
  const [, get] = useKeyboardControls();

  useFrame((state) => {
    const { forward, backward, left, right, sprint, jump } = get();
    const velocity = ref.current?.linvel();
    if (ref.current) {
      // update camera
      state.camera.position.set(
        ref.current?.translation().x,
        ref.current?.translation().y + 0.5,
        ref.current?.translation().z
      );
      // movement
      frontVector.set(0, 0, backward - forward);
      sideVector.set(left - right, 0, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(sprint ? SPRINT_SPEED : SPEED)
        .applyEuler(state.camera.rotation);
      ref.current?.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
      // jumping
      const world = rapier.world;
      const ray = world.castRay(
        new RAPIER.Ray(ref.current?.translation(), { x: 0, y: -1, z: 0 })
      );
      const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
      if (jump && grounded) ref.current.setLinvel({ x: 0, y: 1.75, z: 0 });
    }
  });

  return (
    <>
    <RigidBody
      canSleep={false}
      ref={ref}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 2, 3]}
      enabledRotations={[false, false, false]}
      onCollisionEnter={(event) => {
        console.log("Collision detected with:", event.colliderObject?.name);
        if (event.colliderObject?.name === 'IslandCollision' && onCollision) {
          console.log("Switching camera perspective due to collision");
          onCollision(); // Trigger camera toggle on collision with IslandCollision
        }
      }}
      
    >
      <CapsuleCollider args={[1, 0.2]} sensor={false} />
    </RigidBody>
    <Ship 
    scale={0.35}
    position={[4, -2.5, 16]}
    />
    </>
     
  );
}
