import React, { useRef, useState } from "react";
import { withTheme, normalizeX, normalizeY, darkMapStyle } from "@common";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  MapCircle,
  MapPin,
  Cross,
  SatelliteView,
  MinusEnabled,
  Plus,
} from "@ImagesNew";
import { TouchableOpacity } from "react-native";
import { hasNotch } from "react-native-device-info";
import { SCREEN_HEIGHT } from "../../common";

const Map = (props) => {
  const { theme, navigation } = props;
  const { colors } = theme;
  const { precise, location } = props.route.params;

  const mapRef = useRef();

  const [mapType, setMapType] = useState("standard");

  const mapConfigs = precise
    ? {
        pin: <MapPin />,
        anchor: {
          x: 0.5,
          y: 1,
        },
        maxZoom: 20,
        delta: 0.1,
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
    ...location,
    latitudeDelta: mapConfigs.delta,
    longitudeDelta: mapConfigs.delta,
  };

  let currentRegion = initialRegion;

  const zoomIn = () => {
    mapRef.current.animateToRegion(
      {
        ...location,
        latitudeDelta: currentRegion.latitudeDelta / 2,
        longitudeDelta: currentRegion.longitudeDelta / 2,
      },
      500,
    );
  };

  const zoomOut = () => {
    mapRef.current.animateToRegion(
      {
        ...location,
        latitudeDelta: currentRegion.latitudeDelta * 2,
        longitudeDelta: currentRegion.longitudeDelta * 2,
      },
      500,
    );
  };

  const toggleMapType = () => {
    mapType === "standard" ? setMapType("satellite") : setMapType("standard");
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={theme.dark ? darkMapStyle : []}
        initialRegion={initialRegion}
        onRegionChangeComplete={(region) => (currentRegion = region)}
        maxZoomLevel={mapConfigs.maxZoom}
        mapType={mapType}
      >
        <Marker
          tracksViewChanges={false}
          coordinate={location}
          anchor={mapConfigs.anchor}
        >
          {mapConfigs.pin}
        </Marker>
      </MapView>
      <View
        style={{
          ...styles.buttonsView,
          top: normalizeY(25) + (hasNotch() ? 35 : 20),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ ...styles.buttonView, backgroundColor: colors.plusWhite }}
        >
          <Cross style={{ color: colors.colorblack }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleMapType}
          style={{
            ...styles.buttonView,
            backgroundColor: colors.colorblack,
            marginTop: normalizeY(20),
          }}
        >
          <SatelliteView style={{ color: colors.plusWhite }} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.buttonsView,
          top: SCREEN_HEIGHT / 2.5,
          left: undefined,
        }}
      >
        <TouchableOpacity
          onPress={zoomIn}
          style={{ ...styles.buttonView, backgroundColor: colors.colorblack }}
        >
          <Plus style={{ color: colors.plusWhite }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={zoomOut}
          style={{
            ...styles.buttonView,
            backgroundColor: colors.colorblack,
            marginTop: normalizeY(12),
          }}
        >
          <MinusEnabled style={{ color: colors.plusWhite }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsView: {
    position: "absolute",
    left: normalizeX(15),
    right: normalizeX(15),
  },
  buttonView: {
    width: normalizeX(38),
    height: normalizeX(38),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
  },
});

export default withTheme(Map);
