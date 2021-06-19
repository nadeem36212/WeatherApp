import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const WeatherList = params => {
  const {item, onItemPress} = params;
  return (
    <TouchableOpacity onPress={onItemPress} style={styles.maincontainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.cityText}>{item.city}</Text>
        <Text style={styles.weatherText}>{item.weather}</Text>
      </View>
      <View style={styles.temContainer}>
        <Text style={styles.tempText}>
          {item.temp}
          <View style={styles.degreeContainer}>
            <Text style={styles.degreeText}>o</Text>
          </View>
          c
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default WeatherList;
const styles = StyleSheet.create({
  listcontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  maincontainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderColor: '#D3D3D3',
  },
  innerContainer: {
    flex: 1,
    margin: 15,
  },
  cityText: {
    fontSize: 16,
    fontWeight: '500',
  },
  temContainer: {
    margin: 15,
  },
  tempText: {
    fontWeight: '400',
    fontSize: 29,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherText: {
    marginTop: 10,
    fontSize: 14,
  },
  degreeContainer: {
    // position: 'absolute',
  },
  degreeText: {
    bottom: 20,
  },
});
