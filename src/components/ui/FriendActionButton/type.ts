import { ProfileRowItem } from "@/hooks/useProfileApi";
import { VariantProps } from "class-variance-authority";
import { StyleProp, ViewStyle } from "react-native";
import { buttonVariants } from ".";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];


export type FriendActionButtonProps = {
  item: ProfileRowItem;
  style?: StyleProp<ViewStyle>;
  className?:string;
  variant?: ButtonVariant;
  children?:string;
  color?:string;
  onPress?:()=>void
}