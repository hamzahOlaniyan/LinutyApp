import { Font } from "@/assets/fonts/FontFamily";
import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import React, { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import AppText from "../AppText";
import { Props } from "./type";

export default function Tab<TValue extends string>({
  tabs,
  value,
  onChange,
  containerStyle,
  tabStyle,
  activeTabStyle,
  labelStyle,
  activeLabelStyle,
  contentContainerStyle,
  disabled
}: Props<TValue>) {
  const activeTab = tabs.find(t => t.value === value) ?? tabs[0];

  const scrollRef = useRef<ScrollView>(null);

  return (
    <View className="gap-2">
      <ScrollView
        horizontal
        style={[styles.wrap]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        ref={scrollRef}
      >
        {tabs.map(t => {
          const active = t.value === value;

          return (
            <Pressable
              key={t.value}
              testID={t.testID}
              disabled={disabled}
              onPress={() => onChange(t.value)}
              style={[
                styles.tab,
                tabStyle,
                active && styles.activeTab,
                active && activeTabStyle,
                disabled && styles.disabled
              ]}
            >
              {t.icon ? <Icon name={t.icon} size={24} /> : null}

              <AppText
                numberOfLines={1}
                style={[
                  labelStyle,
                  styles.label,
                  active && styles.activeLabel,
                  active && activeLabelStyle
                ]}
              >
                {t.label}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Content */}
      <View style={[contentContainerStyle, containerStyle]}>
        {activeTab?.content ?? null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    flex: 1,
    borderBottomColor: appColors.border,
    borderBottomWidth: 2
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
    flex: 1,
    gap: 20,
    width: "100%"
  },
  activeTab: {
    borderBottomColor: appColors.text,
    borderBottomWidth: 2
  },
  icon: {
    marginBottom: 6
  },
  label: {
    fontSize: 17,
    color: "#5F6368"
  },
  activeLabel: {
    color: appColors.text,
    fontFamily: Font.Medium
  },
  disabled: {
    opacity: 0.6
  }
});
