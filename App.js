import React, { useEffect, useState } from 'react';
import { Appearance, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Root } from "native-base";
// import { BlurView } from 'expo-blur';
//react-navigation
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//pages
import { connect } from 'react-redux';
import { changeConnectAction, changeConfigData } from './src/redux/action'
import { fetchRequest_get, fetchRequest_post } from './src/common/fetchRequest'
import { CMD } from './src/config/cmd'
import { authScreens, userScreens, disconnect } from './src/router/index'
import { MyTheme } from './src/styles/themes'

const Stack = createStackNavigator();
const scheme = Appearance.getColorScheme()
let getStatus_Timeout = null

const App = (props) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      props.changeConnect(state.type)
    });
    return () => unsubscribe();
  }, [])
  useEffect(() => {//监听登录状态变化
    clearTimeout(getStatus_Timeout);
    if (props.loginState) {
      getConfigData()
      getLoginStatus()
    }
  }, [props.loginState])
  const getConfigData = async () => {
    let data = await fetchRequest_get({ cmd: CMD.INIT_PAGE })
    props.changeConfig(data)
  }
  const getLoginStatus = () => {
    fetchRequest_get({ cmd: CMD.GET_DEVICE_NAME }).then(res => {
      getStatus_Timeout = setTimeout(() => {
        getLoginStatus()
      }, 6000)
    }).catch(err => {
      clearTimeout(getStatus_Timeout);
    })
  }
  //动画样式
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 100,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  //头部样式
  const option = (item) => {
    return {
      headerShown: item.headerShown,//是否显示头部
      headerTitleAlign: 'center',//标题居中
      headerBackImage: () => <Ionicons name='chevron-back-outline' size={26} color={'#409EFF'} />,//返回图标
      headerBackground: () =>
        <LinearGradient
          style={{ height: '100%', width: '100%' }}
          start={{ x: 0.25, y: 0.25 }}
          end={{ x: 0.75, y: 0.75 }}
          colors={['#ffeab3', '#cdffdb', '#cce9ff']}
          style={{ height: 150, flex: 1 }}>
        </LinearGradient>,//渐变背景
      // <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />,//半透明背景
      // headerTransparent: true,
      title: item.title,
      gestureEnabled: true,//安卓开启滑动返回
      gestureDirection: 'horizontal',//滑动返回方向（左右）
      headerTintColor: '#666',//标题颜色
      headerStyle: { height: 45 },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,//页面跳转动画
      transitionSpec: {
        open: config,
        close: config,
      },
      headerRight: () => {
        return (
          item.showMeun ? <TouchableOpacity onPress={() => { }} style={{ marginRight: 20 }}>
            <Ionicons name='list' size={30} color={'#666'} />
          </TouchableOpacity> : null
        )
      }
    }
  }
  return (
    <Root>
      <NavigationContainer theme={MyTheme}  /*theme={scheme === 'dark' ? DarkTheme : DefaultTheme}*/>
        <Stack.Navigator gesturesEnabled={true}>
          {[...(props.isConnect ? (props.loginState ? authScreens : userScreens) : disconnect)].map((item, index) => (
            <Stack.Screen
              options={() => option(item)}
              name={item.name}
              component={item.component}
              key={index} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  )
}

const mapStateToProps = (state) => {
  return {
    loginState: state.loginState,
    isConnect: state.isConnect
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeConnect: (value) => {
      dispatch(changeConnectAction(value));
    },
    changeConfig: (value) => {
      dispatch(changeConfigData(value))
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);


