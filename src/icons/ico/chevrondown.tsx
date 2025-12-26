import Svg, { Path } from "react-native-svg";

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

<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 -960 960 960"
  width="24px"
  fill="#1f1f1f"
>
  <path />
</svg>;
