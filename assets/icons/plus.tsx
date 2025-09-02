import Svg, { Path } from "react-native-svg";

export const Plus = ({ color = "#1f1f1f", size = 28, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path d="M457.31-140v-317.31H140v-45.38h317.31V-820h45.38v317.31H820v45.38H502.69V-140h-45.38Z" fill={color} />
      </Svg>
   );
};
