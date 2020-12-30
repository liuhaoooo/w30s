import React, { useEffect } from "react";
import { logout_tool, loading_tool, restart_tool,reset_tool } from '../../common/tools'
import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import { i18n } from '../../i18n/index';
// import { Grid, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Picker, Icon, Form, Item, Input, Label, Toast } from 'native-base';
const data = [
  { icon: require("../../assets/images/0.png"), text: '2.4G设置',route:"Wifiset24g" },
  { icon: require("../../assets/images/1.png"), text: '5G设置',route:"Wifiset5g" },
  { icon: require("../../assets/images/2.png"), text: '上网设置',route:"Networksetting" },
  { icon: require("../../assets/images/3.png"), text: '修改密码',route:"Password" },
  { icon: require("../../assets/images/4.png"), text: '无线中继',route:"Relay" },
  { icon: require("../../assets/images/5.png"), text: '网络工具',route:"Networksetting" },
  { icon: require("../../assets/images/6.png"), text: '退出登录',id:1 },
  { icon: require("../../assets/images/7.png"), text: '重启设备',id:2 },
  { icon: require("../../assets/images/8.png"), text: '恢复出厂',id:3 },
]
const GridItem = ({ el }) => {
  return (
    <Flex direction="column">
      <Flex.Item>
        <Image style={{ width: 60, height: 60 }} source={el.icon} />
        <Text style={{textAlign:'center'}}>{el.text}</Text>
      </Flex.Item>
    </Flex>
  )
}
export default Status = () => {
  const navigation = useNavigation();
  function press(_el){
    if(_el.route){
      navigation.push(_el.route)
      return
    }
    switch(_el.id){
      case 1:logout_tool(i18n.t('tips.logout'));break;
      case 2:restart_tool(i18n.t('tips.restart'));break;
      case 3:reset_tool(i18n.t('tips.reset'));break;
    }
  }
  return (
    <ScrollView>
      {/* <View style={[{ padding: 10 }]}>
        <WhiteSpace size="lg" />
        <Grid
          data={data}
          hasLine={false}
          columnNum={3}
          onPress={(_el, index) => press(_el)}
          renderItem={(_el, index) => <GridItem el={_el} />}
        />
      </View> */}
      <Button block info onPress={() => navigation.push('Networksetting')}>
                <Text>确定</Text>
            </Button>
    </ScrollView>
  );
}; 

