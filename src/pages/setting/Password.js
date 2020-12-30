import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { CMD } from "../../config/cmd";
import { loading_tool } from '../../common/tools';
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'
import { Button, Picker, Icon, Form, Item, Input, Label, Text, Toast } from 'native-base';

const Password = (props) => {
    const navigation = useNavigation();
    const [oldPasswd, setOldPasswd] = useState('')
    const [newPasswd, setNewPasswd] = useState('')
    const [confirmPasswd, setConfirmPasswd] = useState('')
    const [userType, setUserType] = useState(['2'])
    const toastConfig = {
        text: '修改成功',
        duration: 1000,
        position: "center",
        type: "success",
        textStyle: { textAlign: 'center' },
        style: { backgroundColor:'rgba(103, 194, 58,1)' }
    }
    // useEffect(() => {
    //     try {
    //         // props.account_level == "1" ? newPasswdInput.focus() : oldPasswdInput.focus()
    //         props.account_level != "1" && oldPasswdInput.focus()
    //     } catch (error) { }
    // }, [oldPasswdInput])

    function postData() {
        if (props.account_level == "1") {
            superadminPost()
        } else {
            adminPost()
        }
    }
    function superadminPost() {
        let json = {
            cmd: CMD.CHANGE_PASSWD,
            setPasswd: newPasswd,
        }
        if (props.account_level == "2") {
            json.subcmd = 1;
        } else if (props.account_level == "1") {
            json.subcmd = 2;
            json.tz_account = '3';
        }
        fetchRequest_post(json).then(res => {
            loading_tool(false)
            if (message === 'success') {
                Toast.show(toastConfig)
                navigation.goBack()
            } else {
                Toast.show(toastConfig)
            }
        });
    }
    function adminPost() {
        let json = {
            cmd: CMD.CHANGE_PASSWD,
            subcmd: 0,
            newPasswd: newPasswd,
            old_passwd: oldPasswd
        }
        fetchRequest_post(json).then(res => {
            loading_tool(false)
            if (message === 'success') {
                Toast.show(toastConfig)
                navigation.goBack()
            } else {
                Toast.show(toastConfig)
            }
        });
    }
    return (
        <ScrollView
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <Form>
                {props.account_level === '1' ? <Item picker last>
                    <Label>账号类型</Label>
                    <Picker
                        mode="dialog"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="账号类型"
                        selectedValue={userType}
                        onValueChange={val => setUserType(val)}
                    >
                        <Picker.Item label="管理员账户" value="1" />
                        <Picker.Item label="普通账户" value="2" />
                    </Picker>
                </Item> :
                    <Item regular last>
                        <Label>旧密码</Label>
                        <Input value={oldPasswd} onChange={value => setOldPasswd(value)} />
                    </Item>}
                <Item regular last>
                    <Label>新密码</Label>
                    <Input value={newPasswd} onChange={value => setNewPasswd(value)} />
                </Item>
                <Item regular last>
                    <Label>确认密码</Label>
                    <Input value={confirmPasswd} onChange={value => setConfirmPasswd(value)} />
                </Item>
            </Form>
            <Button block info onPress={() => postData()}>
                <Text>确定</Text>
            </Button>
        </ScrollView>
    )
}
const mapStateToProps = (state) => {
    return {
        account_level: state.configData.account_level
    }
}

export default connect(mapStateToProps, null)(Password);