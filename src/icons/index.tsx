import React from "react";
import { account } from "./ico/account";
import { accountSolid } from "./ico/accountSolid";
import { add_image } from "./ico/add-image";
import { bookmark } from "./ico/bookmark";
import { calendar } from "./ico/calendar";
import { check } from "./ico/check";
import { chevrondown } from "./ico/chevrondown";
import { chevronforward } from "./ico/chevronforward";
import { close } from "./ico/close";
import { comment } from "./ico/comment";
import { deleteTrash } from "./ico/delete";
import { discover } from "./ico/discover";
import { discoverSolid } from "./ico/discoverSolid";
import { edit } from "./ico/edit";
import { envelope } from "./ico/envelope";
import { events } from "./ico/events";
import { favorite } from "./ico/favorite";
import { filter } from "./ico/filter";
import { home } from "./ico/home";
import { homeSolid } from "./ico/homeSolid";
import { lineage } from "./ico/lineage";
import { location } from "./ico/location";
import { locationSolid } from "./ico/locationSolid";
import { logout } from "./ico/logout";
import { mail } from "./ico/mail";
import { menu } from "./ico/menu";
import { news } from "./ico/news";
import { newsSolid } from "./ico/newsSolid";
import { northwest } from "./ico/northwest";
import { notification } from "./ico/notification";
import { plus } from "./ico/plus";
import { report } from "./ico/report";
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
import { verifySolid } from "./ico/verifySolid";
import { visibility } from "./ico/visibility";
import { visibility_off } from "./ico/visibility-off";
import { warning } from "./ico/warning";

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
  edit,
  chevrondown,
  chevronforward,
  menu,
  add_image,
  close,
  deleteTrash,
  account,
  report,
  events,
  lineage,
  envelope,
  mail,
  calendar,
  location,
  check,
  warning,
  verifySolid,
  locationSolid,
  accountSolid
} as const;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName | null;
  size?: number;
  strokeWidth?: number;
  color?: string;
  fill?: string;
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  strokeWidth = 0,
  color = "#404040"
}) => {
  if (!name) return null;
  const IconComponent = icons[name as keyof typeof icons];
  if (!IconComponent) return null;

  return <IconComponent size={size} strokeWidth={strokeWidth} color={color} />;
};

export default Icon;
