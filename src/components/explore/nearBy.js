import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import AppText from "../shared/Text";
import localize from "@common/language/localizeController";
import {
  padding,
  withTheme,
  margins,
  radius,
  HOME_TILE_HEIGHT,
  HOME_TILE_WIDTH,
  decodeNearByUri,
} from "@common";
import LinearGradient from "react-native-linear-gradient";

const NearByList = (props) => {
  const { item, theme, onPress, defaultSearchParams } = props;
  return (
    <TouchableOpacity
      onPress={() => onPress(decodeNearByUri(item.url), defaultSearchParams)}
    >
      <ImageBackground source={{ uri: item.img }} style={[styles.nearByImage]}>
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
        <AppText preset="subhead" color={theme.colors.white}>
          {item.count} {localize.ACCOMODATIONS}
        </AppText>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ExploreNearBy = (props) => {
  const { theme, nearByList, onPress, defaultSearchParams } = props;

  return (
    <>
      {Array.isArray(nearByList) ? (
        <View style={styles.container}>
          <AppText
            preset="header"
            color={theme.colors.primaryForeground}
            style={styles.nearByHeading}
          >
            {localize.NEARBY}
          </AppText>
          <AppText
            preset="subhead"
            color={theme.colors.secondaryForeground}
            style={styles.descText}
          >
            {localize.EXPLORE_DESC}
          </AppText>

          <FlatList
            data={nearByList}
            horizontal={true}
            contentContainerStyle={styles.list}
            ListHeaderComponent={() => <View style={{ width: margins.md }} />}
            ItemSeparatorComponent={() => (
              <View style={{ width: margins.xsm }} />
            )}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <NearByList
                index={index}
                item={item}
                theme={theme}
                onPress={onPress}
                length={nearByList.length}
                defaultSearchParams={defaultSearchParams}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : null}
    </>
  );
};

// export default ExploreNew;
export default withTheme(ExploreNearBy);

const styles = StyleSheet.create({
  container: {
    marginVertical: margins.md,
  },
  list: {
    marginTop: margins.xsm,
  },
  descText: {
    marginTop: margins.xxs,
    marginLeft: margins.md,
  },
  nearByHeading: {
    marginLeft: margins.md,
  },
  nearByImage: {
    overflow: "hidden",
    resizeMode: "contain",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: padding.sm,
    borderRadius: radius.sm,
    width: HOME_TILE_WIDTH,
    height: HOME_TILE_HEIGHT,
  },
  title: {
    marginBottom: margins.xxs,
    letterSpacing: undefined,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
});
