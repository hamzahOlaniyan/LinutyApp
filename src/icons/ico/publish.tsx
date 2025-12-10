import Svg, { Path } from "react-native-svg";

export const publish = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="M434.5-151.87v-310.69L332.41-360.24l-63.89-65.41L480-637.13l211.48 211.48-63.89 65.41L525.5-462.56v310.69h-91ZM151.87-597.13v-120q0-37.78 26.61-64.39t64.39-26.61h474.26q37.78 0 64.39 26.61t26.61 64.39v120h-91v-120H242.87v120h-91Z"
        fill={color}
      />
    </Svg>
  );
};
