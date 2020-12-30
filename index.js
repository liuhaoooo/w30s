import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
//redux
import { Provider } from 'react-redux'
import store from './src/redux/reducer/index'
import SplashScreen from 'react-native-splash-screen';
 
const Index = () => {
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  return (
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
};

AppRegistry.registerComponent(appName, () => Index);