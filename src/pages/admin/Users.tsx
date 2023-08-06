import React, { useEffect, useState } from 'react';
import { Iproducts } from '../types/products';
import { Link } from 'react-router-dom';
import { Table, Button, Breadcrumb, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { IUser } from '../types/users';

interface DataType {
    key: React.Key;
    name: string;
    email: string;
    tel: string;
}

interface Iprops {
    users: IUser[];
    onRemove: (id: number) => void;
}

const Users = (props: Iprops) => {
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const data = props.users.map((item) => {
            return {
                key: item.id,
                name: item.name,
                email: item.email,
                tel: item.tel,
            };
        });
        setFilteredData(data);
    }, [props.users]);

    const removeProduct = (id: number) => {
        props.onRemove(id);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();

        const filtered = props.users.map((item) => {
            return {
                key: item.id,
                name: item.name,
                email: item.email,
                tel: item.tel,
            };
        }).filter((item) => {
            return (
                item.name.toLowerCase().includes(value) ||
                item.email.toLowerCase().includes(value) ||
                item.tel.toLowerCase().includes(value)
            );
        });

        setSearchText(value);
        setFilteredData(value ? filtered : props.users.map((item) => {
            return {
                key: item.id,
                name: item.name,
                email: item.email,
                tel: item.tel,
            };
        }));
    };




    const columns: ColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Tel', dataIndex: 'tel', key: 'tel' },
        // {
        //     title: 'Action',
        //     dataIndex: '',
        //     key: 'action',
        //     render: (record) => (
        //         <span>
        //             <Button
        //                 type="primary"
        //                 style={{ backgroundColor: 'red', margin: '4px' }}
        //                 onClick={() => removeProduct(record.key)}
        //             >
        //                 <CloseOutlined /> Remove
        //             </Button>
        //             <Button type="primary" style={{ backgroundColor: 'green' }}>
        //                 <Link to={record.key + '/update'}>
        //                     <EditOutlined /> Update
        //                 </Link>
        //             </Button>
        //         </span>
        //     ),
        // },
    ];

    return (
        <div>
            <Breadcrumb
                items={[
                    {
                        title: <a><Link to={'/admin'}>Home</Link></a>,
                    },
                    {
                        title: <a><Link to={'/admin/products'}>Users</Link></a>,
                    },
                ]}
            />
            <Input.Search
                placeholder="Search by name, email, or tel"
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

export default Users;
