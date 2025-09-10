import Svg, { Path } from "react-native-svg";

export const HomeSolid = ({ color = "#1f1f1f", size = 28, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path d="M148-107v-499l332-248 332 248v499H565v-293H395v293H148Z" fill={color} />
      </Svg>
   );
};
