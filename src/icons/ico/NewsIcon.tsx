import Svg, { Path } from "react-native-svg";

export const NewsIcon = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="M71.87-111.87v-736.26h816.26v736.26H71.87Zm91-91h634.26v-554.26H162.87v554.26Zm78.56-78.56h477.14v-80H241.43v80Zm0-158.57h160v-238.57h-160V-440ZM480-440h238.57v-80H480v80Zm0-158.57h238.57v-80H480v80Zm-317.13 395.7v-554.26 554.26Z"
        fill={color}
      />
    </Svg>
  );
};
