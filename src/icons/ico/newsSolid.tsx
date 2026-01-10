import Svg, { Path } from "react-native-svg";

export const newsSolid = ({ ...props }: IconProps) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={props.color}
      width={props.size}
      height={props.size}
      {...props}
    >
      <Path
        d="M71.87-111.87v-736.26h816.26v736.26H71.87Zm169.56-169.56h477.14v-80H241.43v80Zm0-158.57h160v-238.57h-160V-440ZM480-440h238.57v-80H480v80Zm0-158.57h238.57v-80H480v80Z"
        fill={props.color}
      />
    </Svg>
  );
};
