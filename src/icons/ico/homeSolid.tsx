import Svg, { Path } from "react-native-svg";

export const homeSolid = ({ ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={props.color}
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        d="M151.87-111.87v-492.2L480-850.28l328.13 246.13v492.28H561.91v-290.04H398.09v290.04H151.87Z"
        fill={props.color}
      />
    </Svg>
  );
};
