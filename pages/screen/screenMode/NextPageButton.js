// components/NextPageButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const NextPageButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
      <Text style={{ color: 'white' }}>Next Page</Text>
    </TouchableOpacity>
  );
};

export default NextPageButton;
