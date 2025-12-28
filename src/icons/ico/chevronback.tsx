import Svg, { Path } from "react-native-svg";
import { IconProps } from "../types";

export const chevronback = ({ ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={props.color}
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"
        fill={props.color}
      />
    </Svg>
  );
};
