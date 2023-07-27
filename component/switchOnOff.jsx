import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MultiSwitch from 'react-native-multiple-switch';
import { SwitchAction } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const SwitchOnOff = () => {
	const options = ['on', 'off'];
	// const [value, setValue] = useState(options[0]);

	const value = useSelector((state) => state.switchFi);
	const dispatch = useDispatch();

	const handleValueChange = (val) => {
		dispatch(SwitchAction(val));
	};

	useEffect(() => {
		console.log(`Switch state changed to: ${value}`);
	}, [value]);

	return (
		<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<MultiSwitch
				trackColor={{ true: 'gray', false: 'white' }}
				items={options}
				value={value}
				circleSize={200}
				containerStyle={{
					width: 200,
					height: 60,
					borderColor: '#007BFF',
					borderWidth: 1,
					borderRadius: 60,
					overflow: 'scroll',
				}}
				onChange={(v) => {
					handleValueChange(v);
				}}
			/>
		</View>
	);
};

export default SwitchOnOff;
