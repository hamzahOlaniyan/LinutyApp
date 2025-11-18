import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHight } = Dimensions.get("screen");

export const hp = (percentage: number) => {
   return (percentage * deviceHight) / 100;
};

export const wp = (percentage: number) => {
   return (percentage * deviceWidth) / 100;
};

export const stripHtmlTags = (html: any) => {
   return html.replace(/<[^>]*>?/gm, "");
};
