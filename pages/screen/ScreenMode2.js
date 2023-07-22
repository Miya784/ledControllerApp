import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackButton from './screenMode/BackButton';
import {Box, Slider, Stack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {AddTodoMode2} from '../../redux/actions';

const ToggleSwitchLog = ({navigation}) => {
  const handleNextPage = () => {
    navigation.goBack();
  };
  const valueList = useSelector(state => state.mode2);
  const dispatch = useDispatch();

  const handleAddTodo = (id, val) => {
    dispatch(AddTodoMode2(id, val));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native App 2</Text>
      <Box alignItems="center" w="100%">
        <Stack space={4} alignItems="center" w="75%" maxW="300">
          <Text textAlign="center">{`onChangeValue - ${valueList[0]}`}</Text>
          <Slider
            minValue={0}
            maxValue={100}
            value={valueList[0]}
            colorScheme="cyan"
            onChange={v => {
              handleAddTodo(0, Math.floor(v));
            }}>
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Stack>
        <BackButton onPress={handleNextPage} />
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ToggleSwitchLog;
