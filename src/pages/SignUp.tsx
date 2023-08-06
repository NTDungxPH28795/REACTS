import React, { useEffect, useState } from 'react'
// import { Iproducts } from '../types/products'
import { IUser } from './types/users';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../api/users';

// interface IProps {
//     onAdd: (product: Iproducts) => void
// }
const SignUp = (props) => {
    const navigate = useNavigate()
    const [data, setData] = useState<IUser[]>([])
    useEffect(() => {
        setData(props.users)
    }, [props])
    console.log(props.users);
    const onFinish = (values: any) => {
        const isEmailExist = data.some((user: IUser) => user.email.toLowerCase() === values.email.toLowerCase()); if (isEmailExist) {
            notification.error({
                message: 'Error',
                description: 'Email already exists!',
            });
        } else {
            props.onSignUp(values)
            navigate('/')
            notification.success({
                message: 'Success',
                description: 'Successful Cccount Registration!',
            });
        }
    };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Account Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Re Password"
                    name="rePassword"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }, {
                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Please enter a valid email address!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tel"
                    name="tel"
                    rules={[
                        { required: true, message: 'Please input your tel!' },
                        {
                            pattern: /^[0-9\b]+$/,
                            message: 'Please enter a valid phone number!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || value.replace(/\D/g, '').length >= 10) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Phone number must have at least 10 digits!');
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SignUp