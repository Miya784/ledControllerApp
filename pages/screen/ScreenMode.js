import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from './functionBasis/BackButton';
import CurrentTime from '../../component/Time';
import SliderComponent1 from '../../component/sliderColorPicker1';
import SliderComponent2 from '../../component/sliderColorPicker2';

const ToggleSwitchLog = ({ navigation }) => {
	const handleNextPage = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<CurrentTime />
			<Text style={styles.header}>React Native App 1 </Text>
			<SliderComponent1 />
			<SliderComponent2 />
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
