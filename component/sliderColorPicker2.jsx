import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';

import { ValueChange2 } from '../redux/action';

const SliderComponent = () => {
	const value2 = useSelector((state) => state.slider2);
	const dispatch = useDispatch();

	const handleValueChange2 = (val) => {
		dispatch(ValueChange2(val));
	};

	return (
		<View style={{ alignItems: 'center' }}>
			<Text style={{ fontWeight: 'bold' }}>Slider 2 Value: {value2}</Text>

			<Slider
				style={{ width: 200, height: 40 }}
				minimumValue={0}
				maximumValue={100}
				step={1}
				minimumTrackTintColor="#FFFFFF"
				maximumTrackTintColor="#000000"
				value={value2}
				onValueChange={(v) => {
					handleValueChange2(Math.floor(v));
				}}
			/>
		</View>
	);
};

export default SliderComponent;
