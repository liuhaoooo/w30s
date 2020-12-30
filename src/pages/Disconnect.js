import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { List, Flex, WhiteSpace } from '@ant-design/react-native';
import { View, Button, Text, NativeModules, Platform } from 'react-native'
export default Disconnect = () => {
    const openSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
                .catch(err => console.log('error', err))
        } else {
            NativeModules.OpenSettings.openNetworkSettings(data => {
                console.log(data)
            })
        }

    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Feather name='wifi-off' size={80} color='#F56C6C' />
            <WhiteSpace size="lg" />
            <Text>当前设备未连接WiFi</Text>
            <WhiteSpace size="lg" />
            <Button
                onPress={() => openSettings()}
                title="前往连接WiFi"
                color="#009688"
            />
        </View>
    )
}