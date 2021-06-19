import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Map = props => {
  // var imageUri = require('../assets/');
  const [data, setData] = useState();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  screenContainer: {
    flex: 1,
    // backgroundColor: Colors.background,
  },
  container: {
    flex: 2.2,
    paddingTop: hp(1),
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1.5,
    paddingTop: hp(2),
    justifyContent: 'center',
    marginVertical: hp(4),
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: hp(1),
  },
  Heading: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    left: hp(2.5),
  },
  temp: {
    fontSize: hp(5),
    fontWeight: '500',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp(3),
  },
});
export default Map;
