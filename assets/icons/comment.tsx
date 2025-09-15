import Svg, { Path } from "react-native-svg";

export const Comment = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M880-80 720-240H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v740ZM140-300h606l74 80v-600H140v520Zm0 0v-520 520Z"
            fill={color}
         />
      </Svg>
   );
};
