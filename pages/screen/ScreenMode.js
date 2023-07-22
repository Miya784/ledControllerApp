// App.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import NextPageButton from './screenMode/NextPageButton';

const ToggleSwitchLog = ({navigation}) => {
  const [mode1, setMode1] = useState(true);
  const [mode2, setMode2] = useState(false);
  const [mode3, setMode3] = useState(false);
  console.log(mode1);
  const handleNextPage = () => {
    navigation.navigate('mode1');

    console.log('Navigating to the next page...');
    // Implement your navigation logic here
  };
  const HandleSwitch = (val, typemode) => {
    switch (typemode) {
      case 1:
        setMode1(val);
        setMode2(false);
        setMode3(false);
        break;
      case 2:
        setMode1(false);
        setMode2(val);
        setMode3(false);
        break;
      case 3:
        setMode1(false);
        setMode2(false);
        setMode3(val);
        break;
      default:
        setMode1(val);
        setMode2(false);
        setMode3(false);
        break;
    }
    if (!val) {
      setMode1(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>select mode</Text>
      <Text> mode1</Text>
      <Switch value={mode1} onValueChange={val => HandleSwitch(val, 1)} />
      <NextPageButton onPress={() => navigation.navigate('mode1')} />

      <Text> mode2</Text>
      <Switch value={mode2} onValueChange={val => HandleSwitch(val, 2)} />
      <NextPageButton onPress={() => navigation.navigate('mode2')} />

      <Text> mode3</Text>
      <Switch value={mode3} onValueChange={val => HandleSwitch(val, 3)} />
      <NextPageButton onPress={() => navigation.navigate('mode3')} />
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
