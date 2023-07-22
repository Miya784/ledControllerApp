// App.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ToggleSwitch from './screenMode/ToggleSwitch';
import NextPageButton from './screenMode/NextPageButton';

const ToggleSwitchLog = ({navigation}) => {
  const handleNextPage = () => {
    navigation.navigate('seletemode');

    console.log('Navigating to the next page...');
    // Implement your navigation logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Switch on off</Text>
      <ToggleSwitch />
      <NextPageButton onPress={handleNextPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ToggleSwitchLog;
