import Svg, { Path } from "react-native-svg";

export const southeast = ({ ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={props.color}
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        d="M360-200v-80h264L160-744l56-56 464 464v-264h80v400H360Z"
        fill={props.color}
      />
    </Svg>
  );
};
