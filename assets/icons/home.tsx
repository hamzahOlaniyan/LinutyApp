import Svg, { Path } from "react-native-svg";

export const Home = ({ color = "#1f1f1f", size = 32, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M225.39-185.39h155.76v-244.99h197.7v244.99h155.76v-381.92L480-759.23 225.39-567.44v382.05ZM180-140v-450l300-225.77L780-590v450H533.46v-245H426.54v245H180Zm300-332.62Z"
            fill={color}
         />
      </Svg>
   );
};
