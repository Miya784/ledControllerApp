// App.js
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackButton from './screenMode/BackButton';
import {Box, VStack, Slider} from 'native-base';

const ToggleSwitchLog = ({navigation}) => {
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const handleNextPage = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native App 2</Text>
      <Box alignItems="center" w="100%">
        <VStack w="3/4" maxW="300" space={4}>
          <Slider
            defaultValue={70}
            value={data[0]}
            onChange={val => {
              console.log(val);
              setData(state => {
                let newval = state;
                newval[0] = val;
                return newval;
              });
            }}
            colorScheme="orange">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Slider defaultValue={70} value={data[1]} colorScheme="emerald">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Slider defaultValue={70} value={data[2]} colorScheme="indigo">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Slider defaultValue={70} value={data[3]} colorScheme="orange">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Slider defaultValue={70} value={data[4]} colorScheme="emerald">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Slider defaultValue={70} value={data[5]} colorScheme="indigo">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Slider defaultValue={70} value={data[6]} colorScheme="orange">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Slider defaultValue={70} value={data[7]} colorScheme="emerald">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Slider defaultValue={70} value={data[8]} colorScheme="indigo">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Slider defaultValue={70} value={data[9]} colorScheme="indigo">
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </VStack>
      </Box>
      <BackButton onPress={handleNextPage} />
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
