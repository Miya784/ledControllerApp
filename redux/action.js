export const Slider_1 = 'SliderComponent1';
export const Slider_2 = 'SliderComponent2';
export const Switch_Fi = 'Switch_Fi';
export const Switch_Mid = 'Switch_Mid';
export const Switch_Four = 'Switch_Four';

export const ValueChange1 = (val) => ({
	type: Slider_1,
	payload: {
		value: val,
	},
});

export const ValueChange2 = (val) => ({
	type: Slider_2,
	payload: {
		value: val,
	},
});

export const SwitchAction = (val) => ({
	type: Switch_Fi,
	payload: {
		value: val,
	},
});

export const SwitchMid = (val) => ({
	type: Switch_Mid,
	payload: {
		value: val,
	},
});

export const SwitchFour = (val) => ({
	type: Switch_Four,
	payload: {
		value: val,
	},
});
