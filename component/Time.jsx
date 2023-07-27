import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import dayjs from 'dayjs';

const CurrentTime = () => {
	const [time, setTime] = useState(dayjs().format('HH:mm:ss'));

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(dayjs().format('HH:mm:ss'));
		}, 1000);

		return () => clearInterval(interval); // Clear interval on component unmount
	}, []);

	return (
		<View>
			<Text>{time}</Text>
		</View>
	);
};

export default CurrentTime;
