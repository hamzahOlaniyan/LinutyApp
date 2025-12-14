import Svg, { Path } from "react-native-svg";

export const northwest = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="M744-160 280-624v264h-80v-400h400v80H336l464 464-56 56Z"
        fill={color}
      />
    </Svg>
  );
};
