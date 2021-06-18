import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  Platform,
} from "react-native";
import localize from "@common/language/localizeController";
import {
  withTheme,
  fontFamily,
  margins,
  fontSize,
  letterSpacing,
} from "@common";

const { width } = Dimensions.get("window");

const TripTypeList = (props) => {
  const { item, theme, index, length } = props;

  return (
    <ImageBackground
      source={{ uri: item.image }}
      style={[
        styles.image,
        { marginRight: index === length - 1 ? margins.horizontal : 0 },
      ]}
    >
      <View>
        {/* <Text
          style={[styles.descText, { marginTop: 0, color: theme.colors.white }]}
        >
          {item.type}
        </Text> */}
        <Text style={[styles.title, { color: theme.colors.white }]}>
          {item.name}
        </Text>
      </View>
      <View>
        <Text
          style={[
            styles.descText,
            { marginRight: 0, color: theme.colors.white },
          ]}
        >
          {item.banner_text}
        </Text>
      </View>
    </ImageBackground>
  );
};

const KindOfTrip = (props) => {
  const { theme, tripTypeList } = props;
  return (
    <>
      {tripTypeList && !tripTypeList.errorMsg ? (
        <View>
          <Text
            style={[
              styles.nearByHeading,
              { color: theme.colors.exploreHeading },
            ]}
          >
            {localize.KIND_OF_TRIP}
          </Text>
          <Text style={[styles.descText, { color: theme.colors.darkGrey }]}>
            {localize.TRIP_DESC}
          </Text>

          <FlatList
            data={tripTypeList}
            contentContainerStyle={{ marginTop: 16 }}
            horizontal={true}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TripTypeList
                index={index}
                length={tripTypeList.length}
                item={item}
                theme={theme}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : null}
    </>
  );
};

export default withTheme(KindOfTrip);

const styles = StyleSheet.create({
  descText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
    letterSpacing: letterSpacing.normal,
    marginTop: 4,
    marginRight: width / 3,
    marginLeft: 20,
  },
  nearByHeading: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.h1,
    letterSpacing: letterSpacing.normal,
    marginTop: Platform.OS === "ios" ? 48 : 34,
    marginLeft: 20,
  },

  image: {
    height: 433,
    width: 327,
    // flexDirection: 'column',
    // flex:1,
    justifyContent: "space-between",
    borderRadius: 15,
    // margin:10
    padding: 16,
    overflow: "hidden",
    paddingRight: 0,
    resizeMode: "contain",
    marginLeft: 20,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.h1,
    letterSpacing: letterSpacing.normal,
  },
});
