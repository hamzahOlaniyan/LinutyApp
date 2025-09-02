import Svg, { Path } from "react-native-svg";

export const HomeSolid = ({ color = "#1f1f1f", size = 28, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path d="M180-140v-450l300-225.77L780-590v450H556.15v-267.69h-152.3V-140H180Z" fill={color} />
      </Svg>
   );
};
