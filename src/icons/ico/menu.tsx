import Svg, { Path } from "react-native-svg";

export const menu = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"
        fill={color}
      />
    </Svg>
  );
};
