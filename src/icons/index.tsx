import React from "react";
import { bookmark } from "./ico/bookmark";
import { chevrondown } from "./ico/chevrondown";
import { chevronforward } from "./ico/chevronforward";
import { comment } from "./ico/comment";
import { discover } from "./ico/discover";
import { discoverSolid } from "./ico/discoverSolid";
import { favorite } from "./ico/favoriteIcon";
import { filter } from "./ico/filter";
import { home } from "./ico/home";
import { homeSolid } from "./ico/homeSolid";
import { logout } from "./ico/logout";
import { menu } from "./ico/menu";
import { news } from "./ico/news";
import { newsSolid } from "./ico/newsSolid";
import { northwest } from "./ico/northwest";
import { notification } from "./ico/notification";
import { plus } from "./ico/plus";
import { repost } from "./ico/repost";
import { search } from "./ico/search";
import { search2 } from "./ico/search2";
import { share } from "./ico/share";
import { southeast } from "./ico/southeast";
import { store } from "./ico/store";
import { storeSolid } from "./ico/storeSolid";
import { story } from "./ico/story";
import { threeDots } from "./ico/threedots";
import { thumbsup } from "./ico/thumbsup";
import { thumbsupSolid } from "./ico/thumbsupSolid";
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
  plus,
  threeDots,
  thumbsup,
  thumbsupSolid,
  comment,
  share,
  repost,
  story,
  southeast,
  northwest,
  chevrondown,
  chevronforward,
  menu
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
