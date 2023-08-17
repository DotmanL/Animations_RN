import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

//causes infinite loading
function PlayThreeDimension() {
  const gltf = useLoader(FBXLoader, require("../../assets/greenRhino.fbx"));

  return (
    <Canvas>
      <mesh>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <primitive object={gltf} scale={3} />
        </Suspense>
      </mesh>
    </Canvas>
  );
}
export default PlayThreeDimension;
