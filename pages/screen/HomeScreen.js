import React,{useState, useEffect} from 'react';
import dayjs from 'dayjs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import { Appbar } from 'react-native-paper';


const HomeScreen = ({ navigation }) => {
  const [currentTime,setCurrentTime] = useState('')
  
  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000); // 1000 milliseconds = 1 second

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs only once on mount
  


  const handlePress = () => {
    navigation.navigate('Next');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.time}> {currentTime}</Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Coral Of</Text>
        <Text style={styles.TextSee}>      See</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    backgroundColor: '#a49592',
    padding: 15,
    borderRadius: 30,
    width: 200,
  },
  
  time:{
    fontSize:23,
    color: '#ff847c',
    paddingBottom: 20,

  },

  buttonText: {
    color: '#fff',
    fontSize: 25,
  },
  TextSee: {
    fontSize: 50,
    color: '#fff',
  }
});

export default HomeScreen;
