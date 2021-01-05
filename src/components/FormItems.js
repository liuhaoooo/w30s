import React, { useEffect, useState } from 'react'
import { Picker, Input, Icon, Text, ListItem, Left, Right, Body, Switch, Button,Spinner } from 'native-base';
import { StyleSheet } from 'react-native'

export const MySwitch = ({ title, value, onChange }) => {
    return (
        <ListItem icon last>
            <Left>
                <Text>{title}</Text>
            </Left>
            <Body></Body>
            <Right>
                <Switch value={value} onChange={() => onChange(!value)} />
            </Right>
        </ListItem>
    )
}
export const MyPicker = ({ options, title, value, onChange }) => {
    return (
        <ListItem icon last>
            <Left>
                <Text>{title}</Text>
            </Left>
            <Body>
                <Picker
                    mode="dialog"
                    iosIcon={<Icon name="chevron-forward" type="Ionicons" />}
                    placeholder="请选择"
                    selectedValue={value}
                    onValueChange={val => onChange(val)}
                >
                    {
                        options.map((item, index) => (
                            <Picker.Item label={item.label} value={item.value} key={index} />
                        ))
                    }
                </Picker>
            </Body>
            <Right></Right>
        </ListItem>
    )
}
export const MyInput = ({ title, inputValue, onChange, password = false, rules }) => {
    const [isErr, setIsErr] = useState(false)
    useEffect(() => {
        if (inputValue === '') {
            setIsErr(true)
        } else {
            setIsErr(false)
        }
    }, [inputValue])
    return (
        <ListItem icon last>
            <Left>
                <Text>{title}</Text>
            </Left>
            <Body>
                <Input
                    secureTextEntry={password}
                    placeholder='请输入'
                    value={inputValue}
                    onChangeText={(val) => onChange(val)} />
            </Body>
            <Right>
                {
                    isErr ? <Text style={{ color: 'red', fontSize: 12 }}>不能为空</Text> : null
                }
            </Right>
        </ListItem>
    )
}

export const MyButton = ({ onPress, title='确定', loading, disabled }) => {
    return (
        <Button block info onPress={() => onPress()} style={{ marginTop: 20, marginBottom: 20 }} disabled={loading || disabled}>
            {!loading ?
                <Text style={styles.button_text}>{title}</Text> :
                <Spinner color='#fff' style={{ height: 46 }} />
            }
        </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#409EFF',
        width: '70%',
        height: 46,
        marginTop: 10,
        borderRadius: 20,
    },
    button_text: {
        textAlign: 'center',
        lineHeight: 46,
        color: '#fff',
        fontSize: 16
    }
})