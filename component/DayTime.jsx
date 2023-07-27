import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MultiSwitch from 'react-native-multiple-switch';
import { useDispatch, useSelector } from 'react-redux';
import { SwitchFour } from '../redux/action';

const DayTime = () => {
	const options = ['open', 'cloes', 'moon'];

	const value = useSelector((state) => state.switchFour);
	const dispatch = useDispatch();

	const handleValueChange = (val) => {
		dispatch(SwitchFour(val));
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
					handleValueChange(v);
				}}
			/>
		</View>
	);
};

export default DayTime;
