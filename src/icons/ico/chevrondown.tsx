import Svg, { Path } from "react-native-svg";
import { IconProps } from "../types";

export const chevrondown = ({ ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={props.color}
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
        fill={props.color}
      />
    </Svg>
  );
};
