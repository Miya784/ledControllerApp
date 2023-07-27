// components/NextPageButton.js
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}>
      <Text style={{color: 'white'}}>Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
