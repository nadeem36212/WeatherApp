import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { withTheme } from "@common";
import { AppText } from "../..";
import {
  radius,
  margins,
  LDP_MAP_SIZE,
  darkMapStyle,
  parseToNumber,
} from "@common";
import { MapCircle, ExpandArrows, MapPin } from "@ImagesNew";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import localize from "@common/language/localizeController";

const Location = (props) => {
  const { theme, style, subtitleStyle, location, precise } = props;
  const { colors } = theme;

  const _loc = {
    latitude: parseToNumber(location.latitude),
    longitude: parseToNumber(location.longitude),
  };

  const navigation = useNavigation();

  const mapConfigs = precise
    ? {
        pin: <MapPin />,
        anchor: {
          x: 0.5,
          y: 1,
        },
        maxZoom: 20,
        delta: 0.05,
      }
    : {
        pin: <MapCircle />,
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        maxZoom: 12,
        delta: 0.5,
      };

  const initialRegion = {
    ..._loc,
    latitudeDelta: mapConfigs.delta,
    longitudeDelta: mapConfigs.delta,
  };

  return (
    <View style={[styles.container, style]}>
      <AppText preset="smallHeader">{localize.LOCATION}</AppText>
      <AppText style={{ marginTop: margins.sm, ...subtitleStyle }}>
        {location.address}
      </AppText>
      {!!location?.distance?.value && (
        <AppText style={{ marginTop: margins.xxs, color: colors.darkGrey }}>
          {location?.distance?.value.toFixed(2) +
            (location?.distance?.unit === "M" ? " meters" : " km")}{" "}
          from center
        </AppText>
      )}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsCompass={false}
          zoomEnabled={false}
          zoom={12}
          minZoomLevel={12}
          maxZoomLevel={12}
          scrollEnabled={false}
          region={initialRegion}
          customMapStyle={theme.dark ? darkMapStyle : []}
        >
          <Marker
            tracksViewChanges={false}
            coordinate={_loc}
            anchor={mapConfigs.anchor}
          >
            {mapConfigs.pin}
          </Marker>
        </MapView>
        <View style={styles.overlayView} />
        <TouchableOpacity
          style={{ ...styles.expandButton, backgroundColor: colors.colorblack }}
          onPress={() =>
            navigation.navigate("LDPMapModal", {
              location: _loc,
              precise: precise,
            })
          }
        >
          <ExpandArrows style={{ color: colors.plusWhite }} />
        </TouchableOpacity>
      </View>
      {!precise && (
        <AppText
          preset="disclaimer"
          style={styles.disclaimerText}
          color={colors.subtleGrey}
        >
          {localize.LOCATION_DISCLAIMER}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: margins.sm,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: LDP_MAP_SIZE,
  },
  overlayView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  expandButton: {
    position: "absolute",
    top: margins.sm,
    right: margins.sm,
    width: margins.xl,
    height: margins.xl,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  disclaimerText: {
    marginTop: margins.sm,
  },
});

export default withTheme(Location);
