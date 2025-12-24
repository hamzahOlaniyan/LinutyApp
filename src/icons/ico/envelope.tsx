import Svg, { Path } from "react-native-svg";

export const envelope = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
        fill={color}
      />
    </Svg>
  );
};
