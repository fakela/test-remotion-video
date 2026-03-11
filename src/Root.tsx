import { Composition } from "remotion";
import { MotionGraphicsIntro } from "./MotionGraphicsIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MotionGraphicsIntro"
      component={MotionGraphicsIntro}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
