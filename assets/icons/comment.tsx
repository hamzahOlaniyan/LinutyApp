import Svg, { Path } from "react-native-svg";

export const CommentIcon = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM899.22-60.78l-160-160H166.78q-44.3 0-75.15-30.85-30.85-30.85-30.85-75.15v-466.44q0-44.3 30.85-75.15 30.85-30.85 75.15-30.85h626.44q44.3 0 75.15 30.85 30.85 30.85 30.85 75.15v732.44Zm-732.44-266h606.44l20 19.56v-486H166.78v466.44Zm0 0v-466.44 466.44Z"
            fill={color}
         />
      </Svg>
   );
};
