import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {WeatherList} from '@components';
import {actions} from '@actions';

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
  };
  const onItemPress = item => {
    console.log('item is', item);
    navigation.navigate('Map', {item});
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={citiesList}
          renderItem={({item}) => (
            <WeatherList onItemPress={() => onItemPress(item)} item={item} />
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
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
