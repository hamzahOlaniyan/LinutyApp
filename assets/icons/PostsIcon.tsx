import Svg, { Path } from "react-native-svg";

export const PostsIcon = ({ color = "#1f1f1f", size = 24, ...props }) => {
   return (
      <Svg viewBox="0 -960 960 960" fill={color} width={size} height={size} {...props}>
         <Path
            d="M241.43-281.43h200v-80h-200v80Zm397.14 0h80v-80h-80v80ZM241.43-440h200v-80h-200v80Zm397.14 0h80v-238.57h-80V-440ZM241.43-598.57h200v-80h-200v80Zm-78.56 486.7q-37.78 0-64.39-26.61t-26.61-64.39v-554.26q0-37.78 26.61-64.39t64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v554.26q0 37.78-26.61 64.39t-64.39 26.61H162.87Zm0-91h634.26v-554.26H162.87v554.26Zm0 0v-554.26 554.26Z"
            fill={color}
         />
      </Svg>
   );
};
