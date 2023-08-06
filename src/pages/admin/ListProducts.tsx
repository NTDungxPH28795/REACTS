import React, { useEffect, useState } from 'react'
import { Iproducts } from '../types/products'
import { Link } from 'react-router-dom'
import { Table, Button, Breadcrumb, Popconfirm, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import Search from 'antd/es/transfer/search';
interface DataType {
    key: React.Key;
    name: string;
    price: number;
    image: string,
    description: string,
    categoryId: number
}
interface Iprops {
    products: Iproducts[],
    onRemove: (id: number) => void
}
const ListProducts = (props: Iprops) => {
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<DataType[]>([]);
    const data = props.products.map(item => {
        return {
            key: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            description: item.description,
            categoryId: item.categoryId
        }
    })
    const onSearch = (value: string) => {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        setSearchResult(filteredData);
        setSearchText(value);
    }
    const removeProduct = (id: number) => {
        props.onRemove(id)
    }
    const columns: ColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <img src={image} alt="Product image" width={100} />
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record) =>
                <span>
                    <Popconfirm
                        title="Are you sure to remove this item?"
                        onConfirm={() => {
                            removeProduct(record.key); notification.success({
                                message: 'Remove',
                                description: (
                                    <span>
                                        Product <b>{record.name}</b> remove successfully!
                                    </span>

                                )
                            });
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" style={{ backgroundColor: 'red', margin: '4px', minWidth: '8em' }}>
                            <CloseOutlined /> Remove
                        </Button>
                    </Popconfirm>
                    <Button type="primary" style={{ backgroundColor: 'green', margin: '4px', minWidth: '8em' }}><Link to={record.key + '/update'}><EditOutlined /> Update</Link></Button>
                </span>
        },
    ];

    <Breadcrumb
        items={[
            {
                title: <a><Link to={'/admin'}>Home</Link></a>,
            },
            {
                title: <a><Link to={'/admin/products'}>Products</Link></a>,
            },
        ]}
    />
    return (
        <div>
            <Search placeholder="Search product" value={searchText} onChange={(e) => onSearch(e.target.value)} enterButton />
            <Button type="primary" style={{ backgroundColor: 'green', margin: '10px' }}><Link to={'/admin/products/add'}><EditOutlined />Add Product</Link></Button>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={searchResult.length > 0 ? searchResult : data}
                pagination={{ pageSize: 3, showQuickJumper: true }}
            />
        </div>
    );
}

export default ListProducts
