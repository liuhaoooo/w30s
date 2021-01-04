import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { ActionSheet, Separator, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { i18n } from '../../i18n/index';
import { CMD } from '../../config/cmd'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'


//led指示灯
const LedSwitch = () => {
    const [ledSwitchVal, setLedSwitchVal] = useState(true)
    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                let res = await fetchRequest_get({ cmd: CMD.LED_SWITCH })
                setLedSwitchVal(res.led_status == "0")
            })()
            return () => { }
        }, [])
    );
    const changeLedSwitch = (val) => {
        fetchRequest_post({ cmd: CMD.LED_SWITCH, led_status: val ? '0' : '1' }).then(() => {
            setLedSwitchVal(val)
        })
    }
    return (
        <ListItem icon>
            <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                    <Icon active name="airplane" />
                </Button>
            </Left>
            <Body>
                <Text>指示灯开关</Text>
            </Body>
            <Right>
                <Switch value={ledSwitchVal} onChange={() => changeLedSwitch(!ledSwitchVal)} />
            </Right>
        </ListItem>
    )
}
export default SysSetting = () => {
    const [dynamicValidateForm, setdynamicValidateForm] = useState(
        {
            name: '',
            phone: '',
            bandwidth: []
        }
    )
    const changeText = (type, text) => {
        let obj = { dynamicValidateForm };
        obj[type] = text;
        setdynamicValidateForm(obj)
    }
    var BUTTONS = [
        { text: "简体中文", icon: "american-football", iconColor: "#2c8ef4" },
        { text: "英文", icon: "analytics", iconColor: "#f42ced" }
    ];
    return (
        <ScrollView>
            <Separator bordered></Separator>
            <LedSwitch />
            <Pressable onPress={() =>
                ActionSheet.show(
                    {
                        options: BUTTONS,
                        cancelButtonIndex: 3,
                        destructiveButtonIndex: 4,
                        title: "Testing ActionSheet"
                    },
                    buttonIndex => { }
                )}>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#43d751" }}>
                            <Icon active name="wifi" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>语言切换</Text>
                    </Body>
                    <Right>
                        <Text>简体中文</Text>
                        <Icon active name="chevron-forward-outline" type="Ionicons" />
                    </Right>
                </ListItem>
            </Pressable>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: "#f92223" }}>
                        <Icon active name="bluetooth" />
                    </Button>
                </Left>
                <Body>
                    <Text>Telnet开关</Text>
                </Body>
                <Right>
                    <Switch value={false} />
                </Right>
            </ListItem>
            <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: "#007AFF" }}>
                        <Icon active name="bluetooth" />
                    </Button>
                </Left>
                <Body>
                    <Text>SSH开关</Text>
                </Body>
                <Right>
                    <Switch value={false} />
                </Right>
            </ListItem>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    elFormItem: {
        marginTop: 0,
        marginBottom: 0,
        height: 50
    },
    input: {
        height: 30,
        width: '100%',
        borderColor: '#8cc5ff',
        borderRadius: 6,
        borderWidth: 1
    }
});
