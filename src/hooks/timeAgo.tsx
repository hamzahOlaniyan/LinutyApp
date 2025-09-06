import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AppText from "../components/ui/AppText";
import { appColors } from "../constant/colors";

dayjs.extend(relativeTime);

export const TimeAgo = ({
   time,
   size = "xs",
   color = appColors.grey,
}: {
   time: string;
   size?: any;
   color?: string;
}) => {
   dayjs.locale({
      name: "short-en",
      relativeTime: {
         future: "%s", // no "in"
         past: "%s", // no "ago"
         s: "1s",
         m: "1m",
         mm: "%dm",
         h: "1h",
         hh: "%dh",
         d: "1d",
         dd: "%dd",
         M: "1mo",
         MM: "%dmo",
         y: "1y",
         yy: "%dy",
      },
      formats: {
         LTS: "h:mm:ss A",
         LT: "h:mm A",
         L: "MM/DD/YYYY",
         LL: "MMMM D, YYYY",
         LLL: "MMMM D, YYYY h:mm A",
         LLLL: "dddd, MMMM D, YYYY h:mm A",
      },
   });

   return (
      <AppText size={size} color={color}>
         {dayjs(time).fromNow()}
      </AppText>
   );
};
