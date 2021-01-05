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
import { changeLoading } from '../../redux/action';


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
//语言切换
const LangChange = () => {
    const [checked,setChecked] = useState('简体中文')
    let lanValue = 'zh'
    var langOption = [
        { text: "简体中文",value:'zh' },
        { text: "日本語",value:'jp' },
        { text: "English",value:'en' },
    ];
    function changeLang(item){
        lanValue = item.value
        setChecked(item.text)
        console.log(lanValue)
    }
    return (
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
                <Button transparent full
                    onPress={() =>
                        ActionSheet.show(
                            {
                                options: langOption,
                                cancelButtonIndex: 3,
                                destructiveButtonIndex: 4,
                                title: "选择语言"
                            },
                            index => changeLang(langOption[index])
                        )}>
                    <Text style={{ color: '#999' }}>{checked}</Text>
                    <Icon active name="chevron-forward-outline" type="Ionicons" style={{ color: '#999' }} />
                </Button>
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
    return (
        <ScrollView>
            <Separator bordered></Separator>
            <LedSwitch />
            <LangChange />
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
        height: 50,
    },
    input: {
        height: 30,
        width: '100%',
        borderColor: '#8cc5ff',
        borderRadius: 6,
        borderWidth: 1
    }
});
