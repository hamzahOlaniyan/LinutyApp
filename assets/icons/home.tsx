import Svg, { Path } from "react-native-svg";

export const Home = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M221-180h138v-257h243v257h137v-389L480-763 221-569.33V-180Zm-73 73v-499l332-248 332 248v499H529v-257h-97v257H148Zm332-365Z"
            fill={color}
         />
      </Svg>
   );
};
