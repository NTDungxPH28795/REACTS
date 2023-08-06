import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
// import { Iproducts } from '../types/products';
import { Button, Form, Input, notification } from 'antd';
import { ICategories } from '../types/categories';
interface IProps {
    categories: ICategories[],
    onUpdateCategory: (category: ICategories) => void
}

const UpdateCategory = (props: IProps) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [category, setCategory] = useState<ICategories>() // khởi tạo biến state product có kiểu dữ liệu là IProduct
    useEffect(() => { // khi props thay đổi thì sẽ chạy useEffect này
        const currentCategory = props.category.find((product: ICategories) => product.id == Number(id))
        setCategory(currentCategory) // nếu có thì set lại giá trị cho biến product
    }, [props])
    useEffect(() => { // khi biến product thay đổi thì sẽ chạy useEffect này
        setFields() // gọi hàm setFields để set lại giá trị cho các input
    }, [category])
    const [form] = Form.useForm();

    const setFields = () => {// hàm này để set lại giá trị cho các input
        form.setFieldsValue({ // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
            id: category?.id,
            name: category?.name

        })
    }

    const onFinish = (values: any) => {
        props.onUpdateCategory(values);
        navigate('/admin/category');
        notification.success({
            message: 'Update Successful',
            description: `The category ${values.name} has been updated.`,
            duration: 2
        });
    };

    return (
        <div>
            <Form form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                onFinish={onFinish} >
                <Form.Item
                    label=""
                    name="id"
                    style={{ display: 'none' }} // ẩn input này đi
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name Category!' }, { min: 5, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateCategory