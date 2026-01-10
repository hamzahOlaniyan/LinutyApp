import Svg, { Path } from "react-native-svg";

export const northwest = ({ ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={props.color}
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        d="M744-160 280-624v264h-80v-400h400v80H336l464 464-56 56Z"
        fill={props.color}
      />
    </Svg>
  );
};
