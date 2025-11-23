import Svg, { Path } from "react-native-svg";

export const StoreSolid = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M154.5-720v-91h651v91h-651Zm-.09 571v-240H113.3v-91l41.2-200h651l41.2 200v91h-41.2v240h-91v-240h-149v240H154.41Zm91.09-91h229v-149h-229v149Z"
            fill={color}
         />
      </Svg>
   );
};
