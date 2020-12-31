import React from 'react'
import { Picker, Input, Icon, Text, ListItem, Left, Right, Body, Switch } from 'native-base';

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
export const MyInput = ({ title, inputValue, onChange, password = false }) => {
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
            <Right></Right>
        </ListItem>
    )
}