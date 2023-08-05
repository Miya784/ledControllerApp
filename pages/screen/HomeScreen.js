import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, Text, buttom, TouchableOpacity, StyleSheet } from 'react-native';
=======
import dayjs from 'dayjs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
>>>>>>> bfb5b53de95d1c69997cf1f0ae8e99ab831b72ec
import BLEConnect from '../../component/BleConnect';
import CurrentTime from '../../component/Time';

//import { Appbar } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
<<<<<<< HEAD
	const [connected, setConnected] = useState(false);

	const handlePress = () => {
		navigation.navigate('Next');
	};

	return (
		<View style={styles.container}>
			<CurrentTime />

=======
	const [currentTime, setCurrentTime] = useState('');
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		// Update the time every second
		const interval = setInterval(() => {
			setCurrentTime(dayjs().format('HH:mm:ss'));
		}, 1000); // 1000 milliseconds = 1 second
		// Clean up the interval when the component is unmounted
		return () => clearInterval(interval);
	}, []); // Empty dependency array ensures the effect runs only once on mount

	const handlePress = () => {
		navigation.navigate('Next');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.time}> {currentTime}</Text>
>>>>>>> bfb5b53de95d1c69997cf1f0ae8e99ab831b72ec
			<TouchableOpacity
				onPress={handlePress}
				disabled={!connected}
				style={styles.button}>
				<Text style={styles.buttonText}>Coral Of</Text>
				<Text style={styles.TextSee}> See</Text>
				<Text>
					{!connected ? `Device isn't connected` : `Device is connected`}
				</Text>
			</TouchableOpacity>

			<BLEConnect
				navigation={navigation}
				connected={connected}
				setConnected={(val) => setConnected(val)}
			/>
		</View>

		// <View style={styles.container}>
<<<<<<< HEAD
		// 	<TouchableOpacity onPress={handlePress} style={styles.button}>
		// 		<Text style={styles.buttonText}>Coral Of</Text>
		// 		<Text style={styles.TextSee}> See</Text>
		// 	</TouchableOpacity>
=======
		//   <Text style={styles.time}> {currentTime}</Text>
		//   <TouchableOpacity onPress={handlePress} style={styles.button}>
		//     <Text style={styles.buttonText}>Coral Of</Text>
		//     <Text style={styles.TextSee}> See</Text>
		//   </TouchableOpacity>
>>>>>>> bfb5b53de95d1c69997cf1f0ae8e99ab831b72ec
		// </View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},

	button: {
		backgroundColor: '#a49592',
		padding: 15,
		borderRadius: 30,
		width: 200,
	},

	time: {
		fontSize: 23,
		color: '#ff847c',
		paddingBottom: 20,
	},

	buttonText: {
		color: '#fff',
		fontSize: 25,
	},
	TextSee: {
		fontSize: 50,
		color: '#fff',
	},
});

export default HomeScreen;
