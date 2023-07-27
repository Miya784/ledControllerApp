import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screen/HomeScreen';
import ScreenNext from './screen/ScreenNext';
import custom from './screen/ScreenMode';

import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();

const AppNavigator = () => {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{ cardStyle: { backgroundColor: '#F4F2DE' } }}>
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
						component={ScreenNext}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="custom"
						component={custom}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
};

export default AppNavigator;
