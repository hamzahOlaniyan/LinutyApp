import Svg, { Path } from "react-native-svg";

export const Home = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M242.87-202.87H354.5V-445.5h251v242.63h111.63v-355.7L480-736.41 242.87-558.57v355.7Zm-91 91v-492.2L480-850.28l328.13 246.13v492.28H518.09v-246.22h-76.18v246.22H151.87ZM480-469.52Z"
            fill={color}
         />
      </Svg>
   );
};
