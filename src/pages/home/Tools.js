import React, { useEffect } from "react";
import { logout_tool, loading_tool, restart_tool, reset_tool } from '../../common/tools'
import { StyleSheet, ScrollView, Text, View, Image, Pressable } from "react-native";
import { i18n } from '../../i18n/index';
// import { Grid, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Picker, Icon, Form, Item, Input, Label, Toast, Col, Row, Thumbnail } from 'native-base';
const data = [
  [
    { icon: require("../../assets/images/0.png"), text: '2.4G设置', route: "Wifiset24g" },
    { icon: require("../../assets/images/1.png"), text: '5G设置', route: "Wifiset5g" },
    { icon: require("../../assets/images/2.png"), text: '上网设置', route: "Networksetting" }
  ],
  [
    { icon: require("../../assets/images/3.png"), text: '修改密码', route: "Password" },
    { icon: require("../../assets/images/4.png"), text: '无线中继', route: "Relay" },
    { icon: require("../../assets/images/5.png"), text: '系统设置', route: "SysSetting" }
  ],
  [
    { icon: require("../../assets/images/6.png"), text: '安全设置', route: "Password" },
    { icon: require("../../assets/images/7.png"), text: 'Wi-Fi定时', route: "Wifitiming" },
    { icon: require("../../assets/images/8.png"), text: '定时重启', route: "Password" }
  ],
  [
    { icon: require("../../assets/images/6.png"), text: '退出登录', id: 1 },
    { icon: require("../../assets/images/7.png"), text: '重启设备', id: 2 },
    { icon: require("../../assets/images/8.png"), text: '恢复出厂', id: 3 }
  ]
]

export default Status = () => {
  const navigation = useNavigation();
  function press(item) {
    if (item.route) {
      navigation.push(item.route)
      return
    }
    switch (item.id) {
      case 1: logout_tool(i18n.t('tips.logout')); break;
      case 2: restart_tool(i18n.t('tips.restart')); break;
      case 3: reset_tool(i18n.t('tips.reset')); break;
    }
  }
  return (
    <ScrollView>
      <View style={{ ...styles.flex, flexDirection: 'column' }}>
        {
          data.map((items, index) => (
            <View style={{ ...styles.flex, flexDirection: 'row' }} key={index}>
              {
                items.map((item, i) => (
                  <Pressable style={styles.content} key={i} onPress={() => press(item)}>
                    <Thumbnail circle source={item.icon} />
                    <Text style={{ textAlign: 'center' }}>{item.text}</Text>
                  </Pressable>
                ))
              }
            </View>
          ))
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "30%",
    height: 130
  }
})