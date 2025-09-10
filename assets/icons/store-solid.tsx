import Svg, { Path } from "react-native-svg";

export const StoreSolid = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M156-735v-73h650v73H156Zm5 584v-247h-51v-73l46-204h649l46 204v73h-51v247h-73v-247H559v247H161Zm73-73h252v-174H234v174Z"
            fill={color}
         />
      </Svg>
   );
};
