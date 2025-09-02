import Svg, { Path } from "react-native-svg";

export const StoreSolid = ({ color = "#1f1f1f", size = 32, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M172.31-739.54v-45.38h617v45.38h-617Zm5 565.08v-243.46H126v-45.39l46.31-201.61h616.38l45.92 201.61v45.39h-51.3v243.46h-45.39v-243.46H544.31v243.46h-367Zm45.38-45.39h276.23v-198.07H222.69v198.07Z"
            fill={color}
         />
      </Svg>
   );
};
