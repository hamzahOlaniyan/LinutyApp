import Svg, { Path } from "react-native-svg";
import { IconProps } from "../types";

export const chevronforward = ({ ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={props.color}
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"
        fill={props.color}
      />
    </Svg>
  );
};
