import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screen/HomeScreen';
import NextScreen1 from './screen/ScreenOnOff';
import NextScreen2 from './screen/ScreenMode';
import NextScreen3 from './screen/ScreenMode1';
import NextScreen4 from './screen/ScreenMode2';
import NextScreen5 from './screen/ScreenMode3';
import {NativeBaseProvider} from 'native-base';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{cardStyle: {backgroundColor: '#F4F2DE'}}}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              // cardStyle: {backgroundColor: 'green'},
            }}
          />
          <Stack.Screen
            name="Next"
            component={NextScreen1}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="seletemode"
            component={NextScreen2}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="mode1"
            component={NextScreen3}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="mode2"
            component={NextScreen4}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="mode3"
            component={NextScreen5}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default AppNavigator;
