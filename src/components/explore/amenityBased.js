import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import localize from "@common/language/localizeController";
import {
  radius,
  margins,
  padding,
  withTheme,
  HOME_TILE_WIDTH,
  HOME_TILE_HEIGHT,
} from "@common";
import AppText from "../shared/Text";
import LinearGradient from "react-native-linear-gradient";

const AminityBased = (props) => {
  const { item, theme, index, length, onPress } = props;
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <ImageBackground
        source={{ uri: item.image }}
        style={[
          styles.nearByImage,
          { marginRight: index === length - 1 ? margins.horizontal : 0 },
        ]}
      >
        <LinearGradient
          colors={["#24252600", "#24252670"]}
          style={styles.overlay}
        />
        <AppText
          preset="largeBodyBold"
          color={theme.colors.white}
          style={styles.title}
        >
          {item.name}
        </AppText>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const AmenityTiles = (props) => {
  const { theme, amenityData, onPress, defaultSearchParams } = props;
  return (
    <>
      {amenityData && !amenityData.errorMsg ? (
        <View style={styles.container}>
          <AppText
            preset="header"
            color={theme.colors.exploreHeading}
            style={{ marginLeft: margins.md }}
          >
            {localize.AMENITY_BASED}
          </AppText>
          <AppText
            preset="subhead"
            color={theme.colors.darkGrey}
            style={styles.descText}
          >
            {localize.AMENITY_DESC}
          </AppText>

          <FlatList
            data={amenityData}
            contentContainerStyle={styles.list}
            horizontal={true}
            ListHeaderComponent={() => <View style={{ width: margins.md }} />}
            ItemSeparatorComponent={() => (
              <View style={{ width: margins.xsm }} />
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, idx) => "" + idx}
            renderItem={({ item, index }) => (
              <AminityBased
                item={item}
                index={index}
                theme={theme}
                onPress={onPress}
                length={amenityData.length}
                defaultSearchParams={defaultSearchParams}
              />
            )}
          />
        </View>
      ) : null}
    </>
  );
};

// export default ExploreNew;
export default withTheme(AmenityTiles);

const styles = StyleSheet.create({
  container: {
    marginVertical: margins.md,
  },
  list: {
    marginTop: margins.sm,
  },
  descText: {
    marginTop: margins.xxs,
    marginHorizontal: margins.md,
  },
  nearByImage: {
    width: HOME_TILE_WIDTH,
    height: HOME_TILE_HEIGHT,
    overflow: "hidden",
    resizeMode: "contain",
    borderRadius: radius.sm,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: padding.sm,
  },
  title: {
    letterSpacing: undefined,
  },
  overlay: {
    position: "absolute",
    // backgroundColor: "#000",
    // opacity: 0.4,
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
});
