import Svg, { Path } from "react-native-svg";

export const filter = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path d="M185.5-149v-294h-82v-71h235v71h-82v294h-71Zm0-425v-237h71v237h-71Zm177-41v-71h82v-125h71v125h82v71h-235Zm82 466v-406h71v406h-71Zm259 0v-127h-82v-71h235v71h-82v127h-71Zm0-258v-404h71v404h-71Z" />
    </Svg>
  );
};
