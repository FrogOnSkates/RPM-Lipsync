import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function SeaMonster(props) {
  const { nodes, materials } = useGLTF('/models/sea_monster_shark_concept.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[1.06, 2.968, 1099.779]} rotation={[1.493, 0.04, -3.137]} scale={5.664}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.teeth_lp_z_0.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.teeth_lp_tlo_0.geometry}
            material={materials.material_1}
          />
          <mesh
            castShadowS
            receiveShadow
            geometry={nodes.teeth_lp_g_0.geometry}
            material={materials.material_2}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/sea_monster_shark_concept.glb')
