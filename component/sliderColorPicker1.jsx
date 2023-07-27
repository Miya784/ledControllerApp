import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { ValueChange1 } from '../redux/action';

const SliderComponent1 = () => {
	const value1 = useSelector((state) => state.slider1);
	const dispatch = useDispatch();

	const handleValueChange1 = (val) => {
		dispatch(ValueChange1(val));
	};

	return (
		<View style={{ alignItems: 'center' }}>
			<Text style={{ fontWeight: 'bold' }}>Slider 1 Value: {value1}</Text>

			<Slider
				style={{ width: 200, height: 40 }}
				minimumValue={0}
				maximumValue={100}
				step={1}
				minimumTrackTintColor="#FFFFFF"
				maximumTrackTintColor="#000000"
				value={value1}
				onValueChange={(v) => {
					handleValueChange1(Math.floor(v));
				}}
			/>
		</View>
	);
};

export default SliderComponent1;
