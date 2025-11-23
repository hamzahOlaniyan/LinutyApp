import Icon from "@/icons";
import { AccountIcon } from "@/icons/ico/AccountIcon";
import { InfoIcon } from "@/icons/ico/info";
import { LogOutFlow } from "@/Services/authService";
import React from "react";

type SettingOptionsTypes = {
   type: string;
   options: SettingOptions[];
}[];

type SettingOptions = {
   id: number;
   title: string;
   icon: React.ReactNode;
   url: string;
   action?: () => void;
};

export const settingOptions: SettingOptionsTypes = [
   {
      type: "Linuty app",
      options: [
         { id: 5, title: "general", icon: <Icon name="bookmark" size={32} />, url: "general" },
         { id: 6, title: "Account status", icon: <AccountIcon size={32} />, url: "account" },
         { id: 7, title: "saved", icon: <Icon name="bookmark" size={32} />, url: "saved" },
         { id: 4, title: "notification", icon: <Icon name="bookmark" size={32} />, url: "notification" },
      ],
   },
   {
      type: "Help & policy",
      options: [
         { id: 1, title: "help", icon: <Icon name="bookmark" size={32} />, url: "help" },
         { id: 2, title: "about", icon: <InfoIcon size={32} />, url: "about" },
         { id: 3, title: "privacy", icon: <Icon name="bookmark" size={32} />, url: "privacy" },
         { id: 3, title: "security", icon: <Icon name="bookmark" size={32} />, url: "security" },
      ],
   },
   {
      type: "Log out",
      options: [
         {
            id: 1,
            title: "logout",
            icon: <Icon name="logout" size={32} color="black" />,
            url: "help",
            action: LogOutFlow,
         },
      ],
   },
];
