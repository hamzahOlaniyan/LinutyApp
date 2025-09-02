import Svg, { Path } from "react-native-svg";

export const Plus = ({ color = "#1f1f1f", size = 32, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path d="M464.62-160v-304.62H160v-30.76h304.62V-800h30.76v304.62H800v30.76H495.38V-160h-30.76Z" fill={color} />
      </Svg>
   );
};
