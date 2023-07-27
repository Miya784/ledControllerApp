import {
	Slider_1,
	Slider_2,
	Switch_Fi,
	Switch_Mid,
	Switch_Four,
} from './action';

export const initialState = {
	slider1: 0,
	slider2: 0,
	switchFi: 'off',
	switchMid: 'off',
	switchFour: 'open',
};

const Reducers = (state = initialState, action) => {
	switch (action.type) {
		case Slider_1: {
			const { value } = action.payload;
			return {
				...state,
				slider1: value,
			};
		}
		case Slider_2: {
			const { value } = action.payload;
			return {
				...state,
				slider2: value,
			};
		}
		case Switch_Fi: {
			const { value } = action.payload;
			return {
				...state,
				switchFi: value,
			};
		}
		case Switch_Mid: {
			const { value } = action.payload;
			return {
				...state,
				switchMid: value,
			};
		}
		case Switch_Four: {
			const { value } = action.payload;
			return {
				...state,
				switchFour: value,
			};
		}
		default:
			return state;
	}
};

export default Reducers;
