import React from "react";
import { StyleSheet, View } from "react-native";
import { withTheme, margins, stripHTML } from "@common";
import { AppText } from "..";

const PolicyItem = (props) => {
  const { policies, style: styleOverride, theme } = props;
  const { colors } = theme;

  const renderItem = (item, idx) => {
    return (
      <View key={"" + idx} style={{ ...styles.policyItem, ...styleOverride }}>
        {!!item.category && (
          <AppText
            color={colors.primaryForeground}
            style={{ marginBottom: margins.xxs }}
          >
            {item.category}
          </AppText>
        )}
        {!!item.text && !Array.isArray(item.text) && (
          <AppText color={colors.primaryForeground}>{item.text}</AppText>
        )}
        {!!item.text &&
          Array.isArray(item.text) &&
          item.text.map((txt, tdx) => (
            <AppText
              key={"" + tdx}
              color={colors.primaryForeground}
              style={{ marginBottom: margins.xxs }}
            >
              {txt}
            </AppText>
          ))}
        {item.items.length > 0
          ? item.items.map((i, _idx) => {
              if (typeof i === "string") {
                return (
                  <AppText
                    key={"" + _idx}
                    color={colors.primaryForeground}
                    style={{ marginBottom: margins.xxs }}
                  >
                    {stripHTML(i)}
                  </AppText>
                );
              } else if (typeof i === "object") return renderItem(i);
            })
          : null}
      </View>
    );
  };

  return policies.map((p, idx) => renderItem(p, idx));
};

export default withTheme(PolicyItem);

const styles = StyleSheet.create({
  policyItem: {
    marginTop: margins.xxs,
  },
});
