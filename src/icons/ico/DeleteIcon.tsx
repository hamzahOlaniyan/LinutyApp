import Svg, { Path } from "react-native-svg";

export const DeleteIcon = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="M277.37-111.87q-37.78 0-64.39-26.61t-26.61-64.39v-514.5h-45.5v-91H354.5v-45.5h250.52v45.5h214.11v91h-45.5v514.5q0 37.78-26.61 64.39t-64.39 26.61H277.37Zm405.26-605.5H277.37v514.5h405.26v-514.5ZM355.7-280.24h85.5v-360h-85.5v360Zm163.1 0h85.5v-360h-85.5v360ZM277.37-717.37v514.5-514.5Z"
        fill={color}
      />
    </Svg>
  );
};
