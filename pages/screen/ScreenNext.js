import React, { useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';
import SwitchOnOff from '../../component/switchOnOff';
import DayTime from '../../component/DayTime';
import CurrentTime from '../../component/Time';
import MultiSwitch from 'react-native-multiple-switch';
import { useDispatch, useSelector } from 'react-redux';
import { SwitchMid } from '../../redux/action';

const ToggleSwitchLog = ({ navigation }) => {
	const items = ['on', 'off'];

	const value = useSelector((state) => state.switchMid);
	const dispatch = useDispatch();

	const handleValueChangeON = (val) => {
		dispatch(SwitchMid(val));
	};

	const onButtonPress = () => {
		if (value === 'on') {
			console.log('Navigating to the next page...');
			navigation.navigate('custom');
		} else {
			console.log(
				'The switch is off. Turn it on to navigate to the next page.',
			);
		}
	};

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<CurrentTime />
			<Text style={styles.header}>Switch on off</Text>
			<SwitchOnOff />

			<Text></Text>
			<DayTime />

			<Text></Text>
			<Text style={styles.header}>custom Switch</Text>
			<MultiSwitch
				items={items}
				value={value}
				circleSize={300}
				containerStyle={{
					width: 300,
					height: 60,
					borderColor: '#007BFF',
					borderWidth: 1,
					borderRadius: 60,
					overflow: 'scroll',
				}}
				onChange={(v) => {
					handleValueChangeON(v);
				}}
			/>
			<Text></Text>
			<Button
				title="Press me"
				onPress={onButtonPress}
				disabled={value === 'off'} // disable the button if the switch is 'off'
			/>
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
