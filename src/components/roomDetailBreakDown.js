import React, { useCallback, useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import localize from "@common/language/localizeController";
import {
  radius,
  margins,
  padding,
  iconSize,
  stripHTML,
  typography,
} from "@common";
import ToggleButton from "./shared/ToggleButton";
import Icon from "./shared/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "./shared/Text";
import { useSelector } from "react-redux";

const AmountItem = (props) => {
  const {
    key,
    item,
    iconColor,
    labelTextStyle,
    containerStyle,
    valueTextStyle,
    showDetailToolTip,
  } = props;
  return (
    <TouchableOpacity
      key={key}
      style={containerStyle}
      disabled={!item.tooltip || item.tooltip === ""}
      onPress={() => {
        showDetailToolTip(item.name, item.tooltip);
      }}
    >
      <AppText style={labelTextStyle}>
        {item.name}{" "}
        {!!item.tooltip && (
          <Icon
            name="Info"
            color={iconColor}
            size={iconSize.sm}
            style={{ marginTop: -1 }}
          />
        )}
      </AppText>

      <AppText style={valueTextStyle}>{item.amount}</AppText>
    </TouchableOpacity>
  );
};

const RoomDetailBreakDown = (props) => {
  const {
    theme,
    title,
    checkin,
    showHelp,
    is_hotel,
    checkout,
    bill_info,
    room_type,
    isAltView,
    room_tax_data,
    room_policies,
    product_images: images,
    number_of_guests: guests,
    cancellation_policy: policy,
  } = props;

  const styles = getStyles(theme, isAltView);

  const showRoomPolicies =
    room_tax_data.length > 0 || !Array.isArray(room_policies);

  const { primaryForeground, secondaryForeground } = theme.colors;

  const currency_sym = useSelector((state) => state.config.currency_sym);

  const [detailVisible, setDetailVisible] = useState(!!isAltView);

  const toggleDetails = () => {
    setDetailVisible(!detailVisible);
  };

  const renderBreakDown = useCallback(() => {
    return bill_info.details.map((r, idx) => {
      return (
        <AmountItem
          item={r}
          key={"rdbd" + idx}
          showDetailToolTip={showDetailToolTip}
          containerStyle={styles.breakDownRow}
          labelTextStyle={{
            ...styles.breakDownStyle,
            ...styles.xsmr,
          }}
          valueTextStyle={styles.breakDownStyle}
          iconColor={secondaryForeground}
        />
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bill_info, styles, isAltView]);

  const renderOtherAmounts = useCallback(() => {
    return bill_info.other_amounts.items.map((r, idx) => {
      return (
        <AmountItem
          item={r}
          key={"rdbd" + idx}
          showDetailToolTip={showDetailToolTip}
          containerStyle={styles.breakDownRow}
          labelTextStyle={{
            ...styles.xsmr,
            color: secondaryForeground,
          }}
          valueTextStyle={{ color: secondaryForeground }}
          iconColor={secondaryForeground}
        />
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bill_info]);

  const showPolicyHelp = () => {
    let isPolicyArr = Array.isArray(policy.policies);
    let _title = isPolicyArr ? policy.type : policy.policies.name;
    let content = (
      <View>
        {!isPolicyArr ? (
          <AppText color={theme.colors.primaryForeground}>
            {stripHTML(policy.policies.text)}
          </AppText>
        ) : (
          policy.policies.map((p) => (
            <>
              {p.name ? (
                <AppText color={theme.colors.primaryForeground}>
                  {p.name}
                </AppText>
              ) : null}
              <AppText color={theme.colors.primaryForeground}>
                {stripHTML(p.text)}
              </AppText>
            </>
          ))
        )}
      </View>
    );

    showHelp(_title, content);
  };

  const showDetailToolTip = (_title, _content) => {
    let content = (
      <View>
        <AppText color={theme.colors.primaryForeground}>
          {stripHTML(_content)}
        </AppText>
      </View>
    );

    showHelp(_title, content);
  };

  // in case of custom cancelation policy there will be no name and the policies [{text: ""}]
  // will be an array - in other cases the policy will be an object with name;
  // {name: "", policies: "", href: ""}
  const renderPolicyName = () => {
    return Array.isArray(policy.policies) ? policy.type : policy.policies.name;
  };

  const renderRoomTax = () => {
    if (room_tax_data.length === 0) return null;
    return (
      <View style={styles.section}>
        <AppText preset="bodyProminent" style={styles.moreInfoTitleStyle}>
          {localize.ROOM_ADDITIONAL_TAX}
        </AppText>
        {room_tax_data.map((tax, idx) => (
          <View key={"" + idx} style={styles.sectionRow}>
            <AppText style={styles.moreInfoRegularStyle}>
              {tax.tax_type}
            </AppText>
            <View style={{ alignItems: "flex-end" }}>
              <AppText style={styles.moreInfoRegularStyle}>
                {tax.currency ? tax.currency : currency_sym + tax.amount}
              </AppText>
              <AppText preset="small" style={styles.moreInfoSmallStyle}>
                {tax.include ? "(included)" : "(not included)"}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderRoomPolicy = () => {
    if (!room_policies || room_policies.length === 0) return null;
    return (
      <View style={styles.section}>
        <AppText preset="bodyProminent" style={styles.moreInfoTitleStyle}>
          {localize.ROOM_POLICY}
        </AppText>
        <AppText style={{ ...styles.moreInfoRegularStyle, ...styles.smb }}>
          {room_policies.policies}
        </AppText>
        {room_policies.meta_policies.map((poly, idx) => (
          <View key={"" + idx} style={styles.sectionRow}>
            <View style={styles.sectionCell}>
              <AppText style={styles.moreInfoRegularStyle}>{poly.key}</AppText>
              <AppText preset="rule" style={styles.moreInfoSmallStyle}>
                {poly.price_unit + " " + poly.t}
              </AppText>
            </View>
            <View style={{ ...styles.sectionCell, alignItems: "flex-end" }}>
              <AppText style={styles.moreInfoRegularStyle}>
                {poly.c + " " + poly.p}
              </AppText>
              <AppText preset="rule" style={styles.moreInfoSmallStyle}>
                {poly.a}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: images[0] }} />

      <View style={styles.detailContainer}>
        <AppText
          preset={!isAltView ? "bodyProminent" : "body"}
          color={theme.colors.primaryForeground}
        >
          {title} {is_hotel ? "• " + room_type : ""}
        </AppText>
        <AppText
          preset={!isAltView ? "body" : "bodyBold"}
          color={primaryForeground}
          style={styles.xsmt}
        >
          {checkin} – {checkout} • {guests}{" "}
          {guests > 1 ? localize.GUESTS_SM : localize.GUEST_SM}
        </AppText>

        {!detailVisible && (
          <AppText
            style={styles.smt}
            preset="smallHeader"
            color={primaryForeground}
          >
            {bill_info.total.amount}
          </AppText>
        )}

        {detailVisible && (
          <>
            <TouchableOpacity
              style={[styles.row, styles.xsmt]}
              onPress={() => showPolicyHelp()}
            >
              <AppText
                preset={!isAltView ? "body" : "bodyBold"}
                style={[styles.checkinStyle, styles.xsmr]}
              >
                {renderPolicyName()}{" "}
                <Icon
                  name="Info"
                  color={secondaryForeground}
                  size={iconSize.sm}
                  style={{
                    marginTop: -1,
                  }}
                />
              </AppText>
            </TouchableOpacity>

            <View style={styles.breakDown}>
              <AppText
                preset="bodyProminent"
                color={isAltView ? secondaryForeground : primaryForeground}
              >
                {localize.PRICE_BREAKDOWN}
              </AppText>
              {renderBreakDown()}
              <View style={styles.breakDownRowAlt}>
                <AppText
                  preset="bodyProminent"
                  style={{
                    color: isAltView ? secondaryForeground : primaryForeground,
                  }}
                >
                  {bill_info.total.name}
                </AppText>
                <AppText
                  preset="smallHeader"
                  style={{
                    color: isAltView ? secondaryForeground : primaryForeground,
                  }}
                >
                  {bill_info.total.amount}
                </AppText>
              </View>
            </View>

            {bill_info.other_amounts && (
              <View style={{ marginTop: margins.lg }}>
                <AppText style={{ color: secondaryForeground }}>
                  {bill_info.other_amounts.heading}
                </AppText>

                <AppText
                  style={{
                    color: secondaryForeground,
                    marginVertical: margins.sm,
                  }}
                >
                  {bill_info.other_amounts.description}
                </AppText>

                {renderOtherAmounts()}
              </View>
            )}

            {showRoomPolicies && (
              <View
                style={{
                  width: "100%",
                  maxHeight: 300,
                  overflow: "hidden",
                }}
              >
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  style={{ marginTop: margins.md }}
                >
                  {renderRoomTax()}
                  {renderRoomPolicy()}
                </ScrollView>
              </View>
            )}
          </>
        )}
      </View>
      {!isAltView && (
        <ToggleButton
          iconOn={
            <Icon
              name="ArrowSmallDown"
              style={{ ...styles.xsml }}
              color={secondaryForeground}
              size={iconSize.md}
            />
          }
          iconOff={
            <Icon
              name="ArrowSmallDown"
              style={{ ...styles.xsml, transform: [{ rotateX: "180deg" }] }}
              color={secondaryForeground}
              size={iconSize.md}
            />
          }
          textOn="Show more details"
          textOff="Hide details"
          textStyle={{
            ...styles.regular,
            color: secondaryForeground,
          }}
          cntrStyle={styles.toggleBtnCntr}
          isIconOnLeft={false}
          onPress={toggleDetails}
          isOn={detailVisible}
        />
      )}
    </View>
  );
};

export default RoomDetailBreakDown;

const getStyles = (theme, isAltView) => {
  return StyleSheet.create({
    container: {
      overflow: "hidden",
      borderRadius: radius.mdx,
      backgroundColor: theme.colors.secondaryBackground,
    },
    image: {
      width: "100%",
      height: 210,
      resizeMode: "cover",
    },
    detailContainer: {
      padding: padding.sm,
    },
    titleStyle: {
      color: theme.colors.primaryForeground,
    },
    checkinStyle: {
      color: theme.colors.primaryForeground,
    },
    regular: {
      ...typography.body,
    },
    breakDown: {
      marginTop: margins.lg + 6,
    },
    breakDownCol: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    breakDownRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginTop: margins.sm,
    },
    breakDownRowAlt: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginTop: margins.lg,
    },
    breakDownStyle: {
      color: isAltView
        ? theme.colors.secondaryForeground
        : theme.colors.primaryForeground,
    },
    toggleBtnCntr: {
      padding: padding.sm,
      alignSelf: "flex-end",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    section: {
      marginBottom: margins.md,
    },
    sectionCell: {
      flex: 1,
    },
    sectionRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: margins.sm,
    },
    moreInfoTitleStyle: {
      marginBottom: margins.sm,
      color: theme.colors.secondaryForeground,
    },
    moreInfoRegularStyle: {
      fontStyle: "italic",
      color: theme.colors.secondaryForeground,
    },
    moreInfoSmallStyle: {
      fontStyle: "italic",
      color: theme.colors.secondaryForeground,
    },
    xsmt: {
      marginTop: margins.xs,
    },
    smt: {
      marginTop: margins.sm,
    },
    xsmb: {
      marginBottom: margins.xs,
    },
    smb: {
      marginBottom: margins.sm,
    },
    xsml: {
      marginLeft: margins.xs,
    },
    xsmr: {
      marginRight: margins.xs,
    },
  });
};
