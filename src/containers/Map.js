import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export function Map({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
      <Text style={styles.Heading}> Washington DC</Text>
      <View style={styles.textContainer}>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}> Clear Sky</Text>
          <Text style={styles.text}> Humidity: 70</Text>
          <Text style={styles.text}> Wind Ppeed: 5.52</Text>
          <Text style={styles.text}> Max. Temp: 38°c</Text>
          <Text style={styles.text}> Min. Temp: 27°c</Text>
        </View>
        <View>
          <Text style={styles.temp}> 25°c </Text>
          {/* <Image
            style={styles.tinyLogo}
            source={require('../assets/imagesclouds.jpeg')}
          /> */}
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
    flex: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    left: 16,
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
