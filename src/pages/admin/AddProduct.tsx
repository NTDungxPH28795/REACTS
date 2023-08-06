// import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { useForm, SubmitHandler } from 'react-hook-form'
import { Iproducts } from '../types/products'
import { Button, Checkbox, Form, Input, notification } from 'antd';
interface IProps {
    onAdd: (product: Iproducts) => void
}
const AddProduct = (props: IProps) => {
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        props.onAdd(values)
        navigate('/admin/products')
        notification.success({
            message: 'Success',
            description: 'Product added successfully!',
        });
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
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name Product!' }, { min: 5, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please input your Price Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Price must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[
                        { required: true, message: 'Please input your image!' },
                        {
                            validator: (_, value) => {
                                const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                                if (urlRegex.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Image must be a valid URL.');
                            }
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddProduct
