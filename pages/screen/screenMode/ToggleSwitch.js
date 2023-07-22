// components/ToggleSwitch.js
import React, {useState} from 'react';
import {Switch, View, Text} from 'react-native';

const ToggleSwitch = props => {
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = value => {
    console.log(value);
    setSwitchValue(value);
    console.log(`Switch is now ${value ? 'ON' : 'OFF'}`);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text>Switch: </Text>
      <Switch value={switchValue} onValueChange={handleSwitchChange} />
    </View>
  );
};

export default ToggleSwitch;
