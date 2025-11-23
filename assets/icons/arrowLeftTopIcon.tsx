import Svg, { Path } from "react-native-svg";

export const ArrowLeftTopIcon = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path d="M258.39-232.11 194.5-296 573-674.5H236.89v-91h491v491h-91v-336.11l-378.5 378.5Z" fill={color} />
      </Svg>
   );
};
