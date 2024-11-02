
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Dock(props) {
  const { nodes, materials } = useGLTF('/models/dock.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0.062, 0, -15.227]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[3.831, 0, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.531, -0.221, -2.991]}>
            <group
              position={[7.221, -0.798, 0.978]}
              rotation={[-Math.PI, 0, 0]}
              scale={[-8, -0.548, -0.04]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials['Material.002']}
                position={[0.427, 0, 0]}
                scale={[1.565, 1, 1]}
              />
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials['Material.001']}
              position={[-7.489, 0, 0]}
              scale={[1.565, 1, 1]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials['Material.001']}
              position={[15.82, -1.508, 0]}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/dock.glb')



