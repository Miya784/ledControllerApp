import React from 'react';
import AppNavigator from './pages/AppNavigator';
import 'react-native-gesture-handler';
import {Text} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
