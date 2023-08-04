import React, { useState, useRef } from "react";
import { Canvas, Vector3, useFrame } from "@react-three/fiber";

type BoxProps = {
  position?: Vector3;
};

function Box(boxProps: BoxProps) {
  const { position } = boxProps;

  const mesh = useRef<THREE.Mesh>(null);
  // this is going to be called ever 16.6ms, if for example our app runs at 60fps frame rate
  useFrame((_state, delta) => {
    if (!mesh.current) {
      return;
    }
    if (active) {
      mesh.current.rotation.x += delta * 5;
      mesh.current.rotation.y += delta;
      mesh.current.rotation.z += delta;
      mesh.current.scale.set(2, 2, 2);
    }
  });

  const [active, setActive] = useState(false);
  return (
    <mesh
      ref={mesh}
      position={position}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
    >
      <boxGeometry />
      <meshStandardMaterial color={active ? "green" : "orange"} />
    </mesh>
  );
}

function PlayGround() {
  return (
    <Canvas>
      {/* this is like the day light in the room, all objects lit the same way, will not produce shadows */}
      {/* <ambientLight /> */}
      {/* pointLight this will mimic a light bublb, emit light in all direction porpotionally unitl it hits an object */}
      <pointLight position={[10, 10, 10]} />

      <Box position={[0, 2, 0]} />
      <Box position={[-1, -2, 0]} />
      <Box position={[1, -2, 0]} />

      {/* <mesh scale={0.1}>
        <torusKnotGeometry args={[10, 1, 260, 10, 16]} />
        <meshStandardMaterial color={"red"} />
      </mesh> */}
    </Canvas>
  );
}

export default PlayGround;
