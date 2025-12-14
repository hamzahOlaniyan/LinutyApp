import Svg, { Path } from "react-native-svg";

export const southeast = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="M360-200v-80h264L160-744l56-56 464 464v-264h80v400H360Z"
        fill={color}
      />
    </Svg>
  );
};
