import React from "react";
import { bookmark } from "./ico/bookmark";
import { discover } from "./ico/discover";
import { discoverSolid } from "./ico/discoverSolid";
import { favorite } from "./ico/favoriteIcon";
import { filter } from "./ico/filter";
import { home } from "./ico/home";
import { homeSolid } from "./ico/homeSolid";
import { logout } from "./ico/logout";
import { news } from "./ico/news";
import { newsSolid } from "./ico/newsSolid";
import { notification } from "./ico/notification";
import { plus } from "./ico/plus";
import { search } from "./ico/search";
import { search2 } from "./ico/search2";
import { store } from "./ico/store";
import { storeSolid } from "./ico/storeSolid";
import { visibility } from "./ico/visibility";
import { visibility_off } from "./ico/visibility-off";

const icons = {
  bookmark,
  filter,
  favorite,
  logout,
  visibility,
  visibility_off,
  homeSolid,
  home,
  discover,
  discoverSolid,
  search,
  search2,
  news,
  newsSolid,
  store,
  storeSolid,
  notification,
  plus
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
  size = 24,
  strokeWidth = 0,
  color = "#404040"
}) => {
  const IconComponent = icons[name as keyof typeof icons];

  return <IconComponent size={size} strokeWidth={strokeWidth} color={color} />;
};

export default Icon;
