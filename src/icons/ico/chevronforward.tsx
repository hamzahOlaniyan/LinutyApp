import Svg, { Path } from "react-native-svg";

export const chevronforward = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"
        fill={color}
      />
    </Svg>
  );
};
