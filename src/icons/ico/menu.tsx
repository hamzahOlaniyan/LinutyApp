import Svg, { Path } from "react-native-svg";

export const menu = ({ ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={props.color}
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"
        fill={props.color}
      />
    </Svg>
  );
};
