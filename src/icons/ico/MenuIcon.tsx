import Svg, { Path } from "react-native-svg";

export const MenuIcon = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M111.87-228.28v-91h736.26v91H111.87Zm0-206.22v-91h736.26v91H111.87Zm0-206.22v-91h736.26v91H111.87Z"
            fill={color}
         />
      </Svg>
   );
};
