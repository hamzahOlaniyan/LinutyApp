import Svg, { Path } from "react-native-svg";

export const Bookmark = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M191.87-107.8v-649.33q0-37.78 26.61-64.39t64.39-26.61h394.26q37.78 0 64.39 26.61t26.61 64.39v649.33L480-231.15 191.87-107.8Zm91-138.5L480-330.87l197.13 84.57v-510.83H282.87v510.83Zm0-510.83h394.26-394.26Z"
            fill={color}
         />
      </Svg>
   );
};
