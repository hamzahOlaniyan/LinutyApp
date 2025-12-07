import React from "react";
import { bookmark } from "./ico/bookmark";
import { favorite } from "./ico/favoriteIcon";
import { filter } from "./ico/filter";
import { logout } from "./ico/logout";

const icons = {
  bookmark,
  filter,
  favorite,
  logout,
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
  color = "#1f1f1f",
}) => {
  const IconComponent = icons[name as keyof typeof icons];

  return <IconComponent size={size} strokeWidth={strokeWidth} color={color} />;
};

export default Icon;
