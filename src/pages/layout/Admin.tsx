// import React, { useState } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import {
//     DesktopOutlined,
//     DoubleRightOutlined,
//     FileOutlined,
//     HomeOutlined,
//     PieChartOutlined,
//     SmileTwoTone,
//     TeamOutlined,
//     UnorderedListOutlined,
//     UserOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';

// const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];
// const handleSignOut = () => {
//     const navigate = useNavigate()
//     localStorage.clear();
//     // Di chuyển đến trang đăng nhập hoặc trang chủ
//     navigate('/');
// }
// const menuList = [
//     {
//         "id": 0,
//         "name": "Home",
//         "icon": <HomeOutlined />,
//         "path": "/"
//     },
//     {
//         "id": 1,
//         "name": "Dashboard",
//         "icon": <SmileTwoTone />,
//         "path": "/admin"
//     },
//     {
//         "id": 2,
//         "name": "Product",
//         "icon": <PieChartOutlined />,
//         "path": "/admin/products"
//     },
//     {
//         "id": 3,
//         "name": "User",
//         "icon": <TeamOutlined />,
//         "path": "/admin/users"
//     },
//     {
//         "id": 4,
//         "name": "Category",
//         "icon": <UnorderedListOutlined />,
//         "path": "/admin/category",
//         "onClick": handleSignOut
//     },
//     {
//         "id": 5,
//         "name": "Sign Out",
//         "icon": <DoubleRightOutlined />,
//         "path": "/",
//         "onClick": handleSignOut
//     },


// ]

// const Admin = () => {
//     const [collapsed, setCollapsed] = useState(false);
//     const {
//         token: { colorBgContainer },
//     } = theme.useToken();
//     return (

//         <div>
//             <Layout style={{ minHeight: '100vh' }}>
//                 <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
//                     <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//                         {
//                             menuList.map(item => {
//                                 return <Menu.Item
//                                     key={item.id}
//                                     icon={item.icon}
//                                 >
//                                     <Link to={item.path}>{item.name}</Link>
//                                 </Menu.Item>
//                             })
//                         }

//                     </Menu>
//                 </Sider>
//                 <Layout className="site-layout">
//                     <Content style={{ margin: '0 16px' }}>
//                         <Breadcrumb style={{ margin: '16px 0' }}>
//                             <Breadcrumb.Item>Home</Breadcrumb.Item>
//                             <Breadcrumb.Item>Admin</Breadcrumb.Item>
//                         </Breadcrumb>
//                         <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
//                             <Outlet />
//                         </div>
//                     </Content>
//                     <Footer style={{ textAlign: 'center' }}>Design ©2023 by Laxus</Footer>
//                 </Layout>
//             </Layout>
//         </div>
//     )
// }

// export default Admin
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
    DesktopOutlined,
    DoubleRightOutlined,
    FileOutlined,
    HomeOutlined,
    PieChartOutlined,
    SmileTwoTone,
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, [user]);
    const handleSignOut = () => {
        localStorage.clear();
        navigate('/');
    };
    const navigate = useNavigate();

    const menuList: MenuItem[] = [
        {
            id: 1,
            name: 'Home',
            icon: <HomeOutlined />,
            path: '/',
        },
        {
            id: 2,
            name: 'Dashboard',
            icon: <SmileTwoTone />,
            path: '/admin',
        },
        {
            id: 3,
            name: 'Product',
            icon: <PieChartOutlined />,
            path: '/admin/products',
        },
        {
            id: 4,
            name: 'User',
            icon: <TeamOutlined />,
            path: '/admin/users',
        },
        {
            id: 5,
            name: 'Category',
            icon: <UnorderedListOutlined />,
            path: '/admin/category',
            // onClick: handleSignOut,
        },
        {
            id: 6,
            name: 'Sign Out',
            icon: <DoubleRightOutlined />,
            path: '/',
            onClick: handleSignOut,
        },
    ];

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        {menuList.map(item => (
                            <Menu.Item key={item.id} icon={item.icon} onClick={item.onClick}>
                                <Link to={item.path}>{item.name}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <div style={{ float: 'right', paddingRight: '20px', color: '#fff' }}>
                            Hello, {user.name}
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Design ©2023 by Laxus</Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default Admin;
