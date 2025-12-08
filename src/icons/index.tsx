import React from "react";
import { bookmark } from "./ico/bookmark";
import { favorite } from "./ico/favoriteIcon";
import { filter } from "./ico/filter";
import { logout } from "./ico/logout";
import { visibility } from "./ico/visibility";
import { visibility_off } from "./ico/visibility-off";

const icons = {
  bookmark,
  filter,
  favorite,
  logout,
  visibility,
  visibility_off
} as const;

type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  color?: string;
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 32,
  strokeWidth = 0,
  color = "#404040"
}) => {
  const IconComponent = icons[name as keyof typeof icons];

  return <IconComponent size={size} strokeWidth={strokeWidth} color={color} />;
};

export default Icon;
