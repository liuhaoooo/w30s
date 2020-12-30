import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
// import { InputItem, Button, Switch, List, Picker, WhiteSpace, Provider } from '@ant-design/react-native'
import { Container, Button, Content, Picker, Form, Toast, Text } from 'native-base';
export default Networksetting = () => {
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
            <Container>
                <Content>
                    <Button onPress={() => Toast.show({
                        text: 'Wrong password!',
                        buttonText: 'Okay',
                        position: 'center'
                    })}>
                        <Text>Toast</Text>
                    </Button>
                    <Form>
                        <Picker
                            note
                            mode="dropdown"
                            style={{ width: 120 }}
                            selectedValue={dynamicValidateForm.bandwidth}
                            onValueChange={text => changeText('bandwidth', text)}
                        >
                            <Picker.Item label="Wallet" value="key0" />
                            <Picker.Item label="ATM Card" value="key1" />
                            <Picker.Item label="Debit Card" value="key2" />
                            <Picker.Item label="Credit Card" value="key3" />
                            <Picker.Item label="Net Banking" value="key4" />
                        </Picker>
                    </Form>

                </Content>
            </Container>
            {/* <Form.elForm
                model={dynamicValidateForm}
                ref={ref => setFormVal(ref)}>
                <List>
                    <Picker
                        title="选择带宽"
                        data={encryption_option}
                        cols={1}
                        value={dynamicValidateForm.bandwidth}
                        onChange={text => changeText('bandwidth', text)}
                        onOk={text => changeText('bandwidth', text)}
                    >
                        <List.Item arrow="horizontal">带宽</List.Item>
                    </Picker>
                    <List.Item>
                        <Form.elFormItem
                            prop="phone"
                            label="设置"
                            rules={[
                                { required: true, message: 'Please enter  numerals' },
                                { pattern: /^\d{6}$/, message: 'Please enter 6 Arabic numerals' }
                            ]}
                        >
                            <InputItem
                                clear
                                value={dynamicValidateForm.phone}
                                onChange={text => changeText('phone', text)}
                                placeholder="请输入"
                            />
                        </Form.elFormItem>
                    </List.Item>
                    <List.Item>
                        <Form.elFormItem
                            prop="phone"
                            label="设置"
                            rules={[
                                { required: true, message: 'Please enter  numerals' },
                                { pattern: /^\d{6}$/, message: 'Please enter 6 Arabic numerals' }
                            ]}
                        >
                            <InputItem
                                clear
                                value={dynamicValidateForm.phone}
                                onChange={text => changeText('phone', text)}
                                placeholder="请输入"
                            />
                        </Form.elFormItem>
                    </List.Item>
                    <List.Item>
                        <Button
                            onPress={() => submit()}
                            type="primary"
                        >确定</Button>
                    </List.Item>
                </List>
            </Form.elForm> */}
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


// import React from 'react';
// import Button from '@material-ui/core/Button';
// import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

// class Networksetting extends React.Component {

//     state = {
//         email: '',
//     }

//     handleChange = (event) => {
//         const email = event.target.value;
//         this.setState({ email });
//     }

//     handleSubmit = () => {
//         // your submit logic
//     }

//     render() {
//         const { email } = this.state;
//         return (
//             <ValidatorForm
//                 ref="form"
//                 onSubmit={this.handleSubmit}
//                 onError={errors => console.log(errors)}
//             >
//                 <TextValidator
//                     label="Email"
//                     onChange={this.handleChange}
//                     name="email"
//                     value={email}
//                     validators={['required', 'isEmail']}
//                     errorMessages={['this field is required', 'email is not valid']}
//                 />
//                 {/* <Button type="submit">Submit</Button> */}
//             </ValidatorForm>
//         );
//     }
// }
// export default Networksetting