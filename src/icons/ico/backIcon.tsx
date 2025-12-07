import Svg, { Path } from "react-native-svg";

export const BackIcon = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="m294.92-450 227.85 227.85L480-180 180-480l300-300 42.77 42.15L294.92-510H780v60H294.92Z"
        fill={color}
      />
    </Svg>
  );
};
