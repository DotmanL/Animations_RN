import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextureLoader } from "expo-three";
import THREE, { Group, Mesh } from "three";
import {
  useAnimatedSensor,
  SensorType,
  SensorValue3D,
  AnimatedSensor
} from "react-native-reanimated";

type ShoeProps = {
  animatedSensor: AnimatedSensor<SensorValue3D>;
};
function Shoe(props: ShoeProps) {
  const { animatedSensor } = props;
  const mesh = useRef<THREE.Mesh>(null);

  const [base, normal, rough] = useLoader(TextureLoader, [
    require("../../assets/Airmax/textures/BaseColor.jpg"),
    require("../../assets/Airmax/textures/Normal.jpg"),
    require("../../assets/Airmax/textures/Roughness.png")
  ]);

  const material = useLoader(
    MTLLoader,
    require("../../assets/Airmax/shoe.mtl")
  ) as MTLLoader.MaterialCreator;

  const shoeObject = useLoader(
    OBJLoader,
    require("../../assets/Airmax/shoe.obj"),
    (loader) => {
      material.preload();
      loader.setMaterials(material);
    }
  ) as Group;

  useLayoutEffect(() => {
    shoeObject.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.map = base;
        child.material.normal = normal;
        child.material.roughnessMap = rough;
      }
    });
  }, [shoeObject]);

  useFrame((_state, _delta) => {
    if (!mesh.current) {
      return;
    }
    let { x, y } = animatedSensor.sensor.value;
    x = ~~(x * 100) / 5000;
    y = ~~(y * 100) / 5000;
    // z = ~~(z * 100) / 5000;
    mesh.current.rotation.x += x;
    mesh.current.rotation.y += y;
    // mesh.current.rotation.z += z;

    // mesh.current.rotation.x += delta;
    // mesh.current.rotation.y += delta;
    // mesh.current.rotation.z += delta;
    // mesh.current.scale.set(1, 1, 1);
  });

  return (
    <mesh rotation={[0.7, 0, 0]} ref={mesh}>
      <primitive object={shoeObject} scale={13} />
    </mesh>
  );
}

function ThreeDimension() {
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100
  });

  return (
    <Canvas>
      <mesh>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Shoe animatedSensor={animatedSensor} />
        </Suspense>
      </mesh>
    </Canvas>
  );
}

export default ThreeDimension;
