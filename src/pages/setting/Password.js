import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { CMD } from "../../config/cmd";
import { loading_tool } from '../../common/tools';
import { fetchRequest_get, fetchRequest_post } from '../../common/fetchRequest'
import { Button, Picker, Icon, Form, Item, Input, Label, Text, Toast } from 'native-base';
import { MyPicker, MyInput,MyButton } from '../../components/FormItems'
import { changeLoginStateAction } from '../../redux/action/index';

const Password = (props) => {
    const navigation = useNavigation();
    const [oldPasswd, setOldPasswd] = useState('')
    const [newPasswd, setNewPasswd] = useState('')
    const [confirmPasswd, setConfirmPasswd] = useState('')
    const [userType, setUserType] = useState(['2'])
    const [loading,setLoading] = useState(false)
    const toastConfig = {
        text: '修改成功',
        duration: 1000,
        position: "center",
        type: "success",
        textStyle: { textAlign: 'center' },
    }
    const userType_option = [
        { label: '管理员账户', value: '1' },
        { label: '普通账户', value: '2' },
    ]
    // useEffect(() => {
    //     try {
    //         // props.account_level == "1" ? newPasswdInput.focus() : oldPasswdInput.focus()
    //         props.account_level != "1" && oldPasswdInput.focus()
    //     } catch (error) { }
    // }, [oldPasswdInput])

    function postData() {
        setLoading(true)
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
            setLoading(false)
            if (res.message === 'success') {
                Toast.show(toastConfig)
                navigation.goBack()
            } else {
                Toast.show({...toastConfig,text:'修改失败',type:'danger'})
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
            setLoading(false)
            if (res.message === 'success') {
                Toast.show(toastConfig)
                props.changeLoginState(false)
            } else {
                Toast.show({...toastConfig,text:'修改失败',type:'danger'})
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
                {props.account_level === '1' ?
                    <MyPicker
                        onChange={(val) => { setUserType(val) }}
                        title='账号类型'
                        value={userType}
                        options={userType_option} /> :
                    <MyInput
                        onChange={(val) => { setOldPasswd(val) }}
                        title='旧密码'
                        password={true}
                        inputValue={oldPasswd} />}
                <MyInput
                    onChange={(val) => { setNewPasswd(val) }}
                    title='新密码'
                    password={true}
                    inputValue={newPasswd} />
                <MyInput
                    onChange={(val) => { setConfirmPasswd(val) }}
                    title='确认密码'
                    password={true}
                    inputValue={confirmPasswd} />
            </Form>
            <MyButton loading={loading} onPress={() => postData()}/>
        </ScrollView>
    )
}
const mapStateToProps = (state) => {
    return {
        account_level: state.configData.account_level
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginState: (value) => {
            dispatch(changeLoginStateAction(value));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Password);