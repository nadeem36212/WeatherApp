import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { margins } from "@common";
import AppText from "../shared/Text";
import Icon from "../shared/Icon";

const BottomButtons = (props) => {
  const {
    rightDisabled,
    leftDisabled,
    rightColor,
    leftTitle,
    rightTitle,
    rightHeight,
    rightWidth,
    onRightPress,
    onLeftPress,
    leftTitleColor,
    rightTitleColor,
    rightCntrStyle,
    leftCntrStyle,
    rightCellStyle,
    leftCellStyle,
    leftPreset = "body",
    rightPreset = "bodyProminent",
    containerStyle,
    isRightLoading,
    renderLoadingComp,
  } = props;
  return (
    <View style={[styles.nextView, containerStyle]}>
      <View style={{ ...styles.cell, ...leftCellStyle }}>
        <TouchableOpacity
          onPress={onLeftPress}
          disabled={leftDisabled}
          style={{
            height: rightHeight,
            // width: rightWidth,
            justifyContent: "center",
            marginHorizontal: margins.horizontal,
            ...leftCntrStyle,
          }}
        >
          <AppText
            color={leftTitleColor}
            preset={leftPreset}
            style={{ ...styles.btnText, alignSelf: "flex-start" }}
          >
            {leftTitle}
          </AppText>
        </TouchableOpacity>
      </View>
      <View
        style={{ ...styles.cell, alignItems: "flex-end", ...rightCellStyle }}
      >
        <TouchableOpacity
          onPress={onRightPress}
          disabled={rightDisabled}
          style={[
            styles.btnView,
            {
              height: rightHeight,
              width: rightWidth,
              backgroundColor: rightColor,
              ...rightCntrStyle,
            },
          ]}
        >
          {isRightLoading && renderLoadingComp()}
          {!isRightLoading && (
            <AppText
              color={rightTitleColor}
              preset={rightPreset}
              style={styles.btnText}
            >
              {rightTitle}
            </AppText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const StickyBottomButtons = (props) => {
  const {
    leftIcon,
    leftIconSize,
    leftTitleColor,
    leftTitle,
    rightIcon,
    rightIconSize,
    rightTitleColor,
    rightTitle,
    onLeftPress,
    onRightPress,
    leftPreset = "body",
    rightPreset = "bodyProminent",
  } = props;
  return (
    <View style={styles.stickyContainer}>
      <TouchableOpacity onPress={onLeftPress} style={styles.mainView}>
        <Icon
          name={leftIcon}
          type="local"
          size={leftIconSize}
          color={leftTitleColor}
        />
        <AppText
          preset={leftPreset}
          style={{ ...styles.btnText, color: leftTitleColor }}
        >
          {leftTitle}
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRightPress} style={styles.mainView}>
        <Icon
          name={rightIcon}
          type="local"
          size={rightIconSize}
          color={rightTitleColor}
        />
        <AppText
          preset={rightPreset}
          style={{ ...styles.btnText, color: rightTitleColor }}
        >
          {rightTitle}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export { BottomButtons, StickyBottomButtons };

const styles = StyleSheet.create({
  nextView: {
    // height: 92,
    // width: width,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  btnView: {
    borderRadius: 22,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: margins.horizontal,
  },
  btnText: {
    alignSelf: "center",
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    flex: 0.5,
  },
  stickyContainer: {
    flexDirection: "row",
    paddingVertical: margins.xs,
  },
});
