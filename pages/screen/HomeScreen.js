import React, { useState, useEffect } from 'react';
import { View, Text, buttom, TouchableOpacity, StyleSheet } from 'react-native';
import BLEConnect from '../../component/BleConnect';
import CurrentTime from '../../component/Time';

//import { Appbar } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
	const [connected, setConnected] = useState(false);

	const handlePress = () => {
		navigation.navigate('Next');
	};

	return (
		<View style={styles.container}>
			<CurrentTime />

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

	// 	<View style={styles.container}>
	// 		<TouchableOpacity onPress={handlePress} style={styles.button}>
	// 			<Text style={styles.buttonText}>Coral Of</Text>
	// 			<Text style={styles.TextSee}> See</Text>
	// 		</TouchableOpacity>
	// 	</View>

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
