import Svg, { Path } from "react-native-svg";
import { IconProps } from "../types";

export const BackIcon = ({ ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={props.color}
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        d="m294.92-450 227.85 227.85L480-180 180-480l300-300 42.77 42.15L294.92-510H780v60H294.92Z"
        fill={props.color}
      />
    </Svg>
  );
};
