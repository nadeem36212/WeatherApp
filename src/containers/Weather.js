import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {WeatherList} from '@components';
import {actions} from '@actions';

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
  const [isLoading, setIsLoading] = useState(true);
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    doAPICall();
  }, []);
  const doAPICall = async () => {
    const res = await actions.getCities({});
    if (res.cod === '200') {
      setCitiesList(res.list);
    }
    setIsLoading(false);
    console.log('getCitiesAPICall res is-------------=-', res);
  };
  const onItemPress = () => {
    navigation.navigate('Map');
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={citiesList}
          renderItem={({item}) => (
            <WeatherList onItemPress={onItemPress} item={item} />
          )}
          keyExtractor={item => item.id}
          style={styles.listcontainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
