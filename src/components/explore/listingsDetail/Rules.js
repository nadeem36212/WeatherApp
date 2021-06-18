import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { margins, iconSize, withTheme } from "@common";

import { AppText, Icon } from "../..";
import localize from "@common/language/localizeController";

const Rule = (props) => {
  const {
    preset = "rule",
    iconColor,
    textStyle,
    ctnStyle,
    label,
    icon,
    hasInfo = false,
    infoIconColor,
  } = props;
  return (
    <View style={ctnStyle}>
      <Icon
        name={icon}
        size={iconSize.md}
        color={iconColor}
        style={styles.icon}
      />
      <AppText preset={preset} style={textStyle}>
        {label}{" "}
        {hasInfo ? (
          <View style={styles.infoIconCntr}>
            <Icon
              name="Info"
              size={iconSize.sm}
              color={infoIconColor}
              style={styles.infoIcon}
            />
          </View>
        ) : null}
      </AppText>
    </View>
  );
};

const Rules = (props) => {
  const { theme, data, showHelp, policy } = props;
  // eslint-disable-next-line no-unused-vars
  const { checkin_time, checkout_time, min_stay, guests } = data;
  const { colors } = theme;

  const showPolicyHelp = () => {
    let _title = policy.name;
    let content = "";

    if (policy.hasOwnProperty("policies")) {
      content = policy.policies.map((p, idx) => (
        <AppText
          key={"" + idx}
          color={theme.colors.primaryForeground}
          style={{ marginTop: margins.xs }}
        >
          {p.text.replace("<br> ", "\n")}
        </AppText>
      ));

      content = <View>{content}</View>;
    } else {
      content = (
        <AppText color={theme.colors.primaryForeground}>
          {policy.text.replace("<br> ", "\n")}
        </AppText>
      );
    }

    showHelp(_title, content);
  };

  return (
    <View style={styles.rulesContainer}>
      {checkin_time || checkout_time ? (
        <View style={styles.rulesView}>
          <Rule
            icon="ClockFilled"
            iconColor={colors.primaryForeground}
            textStyle={styles.ruleText}
            ctnStyle={{ ...styles.rule, marginRight: margins.sm }}
            label={checkin_time}
          />

          <Rule
            icon="ClockFilled"
            iconColor={colors.primaryForeground}
            textStyle={styles.ruleText}
            ctnStyle={styles.rule}
            label={checkout_time}
          />
        </View>
      ) : null}
      {policy || min_stay ? (
        <View style={styles.rulesView}>
          {policy && (
            <TouchableOpacity
              style={{ ...styles.ruleCell, marginRight: margins.sm }}
              onPress={showPolicyHelp}
            >
              <Rule
                icon="CancellationFilled"
                iconColor={colors.primaryForeground}
                textStyle={styles.ruleText}
                ctnStyle={styles.rule}
                label={policy.name?.replace("policy", "").trim()}
                infoIconColor={colors.secondaryForeground}
                hasInfo
              />
            </TouchableOpacity>
          )}
          {min_stay && (
            <Rule
              icon="NightFilled"
              iconColor={colors.primaryForeground}
              textStyle={styles.ruleText}
              ctnStyle={styles.rule}
              label={min_stay}
            />
          )}
        </View>
      ) : null}
      {/* {guests ? (
        <View style={styles.rulesView}>
          <View style={{ ...styles.ruleCell }}>
            <View style={styles.rule}>
              <Icon
                name="Person"
                size={iconSize.md}
                color={colors.primaryForeground}
              />
              <AppText preset="rule" style={styles.ruleText}>{guests}</AppText>
            </View>
          </View>
        </View>
      ) : null} */}
      <View style={styles.rulesView}>
        <Icon
          name="MaskFilled"
          size={iconSize.md}
          color={colors.primaryForeground}
          style={styles.icon}
        />
        <View style={{ flex: 1 }}>
          <AppText
            preset="ruleBold"
            color={colors.primaryForeground}
            style={{
              ...styles.ruleText,
            }}
          >
            {localize.ADDITIONAL_SAFETY}
          </AppText>
          <AppText
            preset="rule"
            style={{
              ...styles.ruleText,
              color: colors.secondaryForeground,
              marginTop: margins.xxs,
            }}
          >
            {localize.COVID_MSG}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rulesContainer: {
    marginTop: margins.xxs,
  },
  rulesView: {
    marginTop: margins.md,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ruleCell: {
    flex: 0.5,
  },
  rule: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 0.5,
  },
  ruleText: {
    marginLeft: 8,
  },
  icon: {
    marginTop: -4,
  },
  infoIconCntr: {
    width: iconSize.sm,
    height: iconSize.sm,
  },
  infoIcon: {
    position: "absolute",
    right: 0,
    bottom: -2,
  },
  helpCtn: {
    marginTop: margins.lg,
  },
});

export default withTheme(Rules);
