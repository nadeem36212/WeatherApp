import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export function Map(props) {
  const {item} = props.route.params;
  const initialCoord = {
    latitude: item.coord.lat,
    longitude: item.coord.lon,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={initialCoord}>
          <Marker coordinate={initialCoord} title={item.name} />
        </MapView>
      </View>
      <Text style={styles.Heading}> {item.name}</Text>
      <View style={styles.textContainer}>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}> Clear Sky</Text>
          <Text style={styles.text}> Humidity: {item.main.humidity}</Text>
          <Text style={styles.text}> Wind Speed: {item.wind.speed}</Text>
          <Text style={styles.text}> Max. Temp: {item.main.temp_max}°c</Text>
          <Text style={styles.text}> Min. Temp: {item.main.temp_min}°c</Text>
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <Text style={styles.temp}> {item.main.temp}°c </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    flex: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    left: 16,
    marginVertical: 5,
  },
  Heading: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    left: 16,
  },
  temp: {
    fontSize: 22,
    fontWeight: '500',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 30,
  },
});
