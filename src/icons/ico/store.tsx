import Svg, { Path } from "react-native-svg";

export const store = ({ color = "#1f1f1f", size = 24, ...props }) => {
  return (
    <Svg
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
      {...props}
    >
      <Path
        d="M151-742v-73h660v73H151Zm5 597v-260h-51v-73l46-204h659l46 204v73h-51v260h-73v-260H554v260H156Zm73-73h252v-187H229v187Zm-52-260h607-607Zm0 0h607l-29-131H207l-30 131Z"
        fill={color}
      />
    </Svg>
  );
};
