import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ToggleSwitch from './screenMode/ToggleSwitch';
import BackButton from './screenMode/BackButton';

const ToggleSwitchLog = ({navigation}) => {
  const handleNextPage = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native App 3 </Text>
      <ToggleSwitch />
      <BackButton onPress={handleNextPage} />
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
