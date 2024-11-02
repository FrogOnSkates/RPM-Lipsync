import { RigidBody } from '@react-three/rapier';

export function IslandCollision({ position = [4, 2, 15], onCollision }) {
  console.log('IslandCollision rendered');

  return (
    <RigidBody
      name="IslandCollision" // Explicitly name the object
      position={position}
      onContactForce={(payload) => {
        console.log('Collision detected:', payload);
        if (onCollision) {
          onCollision(); // Call the toggle function on collision
        }
      }}
    >
      <mesh>
      <sphereGeometry args={[2, 16, 16]} />
      <meshBasicMaterial 
        color="lightgreen" 
        wireframe 
        transparent 
        opacity={0} // Adjust the opacity as needed (0 is fully transparent, 1 is fully opaque)
      />
      </mesh>
    </RigidBody>
  );
}
