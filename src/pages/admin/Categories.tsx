import React, { useEffect, useState } from 'react';
// import { Iproducts } from '../types/products';
import { Link } from 'react-router-dom';
import { Table, Button, Breadcrumb, Input, Popconfirm, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
// import { IUser } from '../types/users';
import { ICategories } from '../types/categories';

interface DataType {
    key: React.Key;
    name: string;
}

interface ICategory {
    categories: ICategories[];
    onRemoveCategory: (id: number) => void;
}

const Categories = (props: ICategory) => {
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const data = props.categories.map((item) => {
            return {
                key: item.id,
                name: item.name
            };
        });
        console.log(data);
        setFilteredData(data);
    }, [props.categories]);

    const removeCategories = (id: number) => {
        props.onRemoveCategory(id);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();

        const filtered = props.categories.map((item) => {
            return {
                key: item.id,
                name: item.name
            };
        }).filter((item) => {
            return (
                item.name.toLowerCase().includes(value)
            );
        });

        setSearchText(value);
        setFilteredData(value ? filtered : props.categories.map((item) => {
            return {
                key: item.id,
                name: item.name
            };
        }));
    };




    const columns: ColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record) =>
                <span>
                    <Popconfirm
                        title="Are you sure to remove this item?"
                        onConfirm={() => {
                            removeCategories(record.key); notification.success({
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

    return (
        <div>
            <Breadcrumb
                items={[
                    {
                        title: <a><Link to={'/admin'}>Home</Link></a>,
                    },
                    {
                        title: <a><Link to={'/admin/categories'}>Categories</Link></a>,
                    },
                ]}
            />
            <Button type="primary" style={{ backgroundColor: 'green', margin: '10px' }}><Link to={'/admin/category/add'}><EditOutlined />Add Category</Link></Button>

            <Input.Search
                placeholder="Search by name"
                allowClear
                value={searchText}
                onChange={handleSearch}
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columns}
                expandable={{
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={filteredData}
                pagination={{ pageSize: 4, showQuickJumper: true }}
            />
        </div>
    );
};

export default Categories;
