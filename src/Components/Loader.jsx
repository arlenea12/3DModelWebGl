import { Html, useProgress } from "@react-three/drei";

//this is a loader thats displayed until the model is loaded
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html
      center
      style={{
        width: "20%",
        color: "white",
      }}
    >
      {progress.toFixed(0)} %
    </Html>
  );
};

export default Loader;
