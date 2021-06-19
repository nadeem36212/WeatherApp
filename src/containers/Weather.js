import React from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {WeatherList} from '@components';

const DATA = [
  {
    id: '1',
    city: 'Dkhaka',
    weather: 'cloudy',
    temp: '25',
  },
  {
    id: '2',
    city: 'Chitagone',
    weather: 'Sunny',
    temp: '32',
  },
  {
    id: '3',
    city: 'Lahore',
    weather: 'sunny',
    temp: '40',
  },
  {
    id: '4',
    city: 'Karachi',
    weather: 'cloudy',
    temp: '31',
  },
  {
    id: '5',
    city: 'Islamabad',
    weather: 'sunny',
    temp: '38',
  },
];

export function Weather(props) {
  const {navigation} = props;
  const onItemPress = () => {
    navigation.navigate('Map');
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <WeatherList onItemPress={onItemPress} item={item} />
        )}
        keyExtractor={item => item.id}
        style={styles.listcontainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
