
import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserSwitchOutlined, HomeOutlined, InboxOutlined, UserOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { MenuProps, Layout, Row, Col, Button, notification } from 'antd';
const { Header } = Layout;
import { Menu } from 'antd';
import logo from '../../../images/logo/Logo.png';
const Ilogo: React.CSSProperties = {
    borderRadius: '8px',
    width: '5em',
};


const HeaderHome = () => {
    const [current, setCurrent] = useState('mail');
    const [user, setUser] = useState({});

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Xóa dữ liệu của user khi đăng xuất
        localStorage.clear();
        // navigate('/');
        // Đặt lại trạng thái đăng nhập
        setIsLoggedIn(false);
        // Điều hướng về trang chủ
        navigate('/');
        notification.success({
            message: 'Success',
            description: 'Log out successfully!',
        });
    };
    const items: MenuProps['items'] = [
        {
            label: (
                <a><Link to={'/'} />Home</a>
            ),
            key: 'mail',
            icon: <HomeOutlined />
        },
        {
            label: (
                <a><Link to={'/products'} />Products</a>

            ),
            icon: <InboxOutlined />,

            key: 'alipay',
        },

        {
            label: isLoggedIn ? `Hello, ${user.name}` : 'Account',
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                {
                    type: 'group',
                    children: [
                        {
                            label: (
                                <Button
                                    style={{ border: 'none', color: '#000' }}
                                    type="link"
                                    icon={<UserOutlined />}
                                    onClick={() => navigate(isLoggedIn ? '/admin' : '/signin')}
                                >
                                    {isLoggedIn ? 'Admin' : 'Sign In'}
                                </Button>
                            ),
                            key: 'setting:1',
                        },
                        {
                            label: (
                                <Button
                                    className=''
                                    style={{ border: 'none', color: '#000' }}
                                    onClick={isLoggedIn ? handleSignOut : () => navigate('/signup')}
                                    type="link"
                                    danger={isLoggedIn}
                                    icon={<UserAddOutlined />}
                                    hidden={!isLoggedIn}
                                >
                                    {isLoggedIn ? 'Sign Out' : 'Sign Up'}
                                </Button>
                            ),
                            key: 'setting:2',
                        },
                    ],
                },
            ],
        }


    ];



    useEffect(() => {
        // Lấy thông tin user từ localStorage khi load trang
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
            setUser(JSON.parse(user));
        }
    }, []);

    return (
        <div>
            <Header style={{ backgroundColor: '#fff' }}>
                <Row justify="space-between" align="middle">
                    <Col >
                        <div className='box_logo'>
                            <img src={logo} style={Ilogo} alt="Logo" />
                        </div>
                    </Col>
                    <Col>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                    </Col>
                </Row>
            </Header>
        </div>
    )
}

export default HeaderHome


// import React, { useState, useEffect } from 'react'
// import { Link, Outlet, useNavigate } from 'react-router-dom'
// import { UserSwitchOutlined, HomeOutlined, InboxOutlined, UserOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
// import { MenuProps, Layout, Row, Col, Button, notification } from 'antd';
// const { Header } = Layout;
// import { Menu } from 'antd';
// import logo from '../../../images/logo/Logo.png';
// const Ilogo: React.CSSProperties = {
//     borderRadius: '8px',
//     width: '5em',
// };


// const HeaderHome = () => {
//     const [current, setCurrent] = useState('mail');
//     const [user, setUser] = useState({});
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [showMenu, setShowMenu] = useState(false);

//     useEffect(() => {
//         const user = localStorage.getItem('user');
//         if (user) {
//             setIsLoggedIn(true);
//             setUser(JSON.parse(user));
//             setShowMenu(true);
//         }
//     }, []);

//     const onClick: MenuProps['onClick'] = (e) => {
//         console.log('click ', e);
//         setCurrent(e.key);
//     };
//     const navigate = useNavigate();

//     const handleSignOut = () => {
//         localStorage.removeItem('user');
//         setIsLoggedIn(false);
//         navigate('/');
//         notification.success({
//             message: 'Success',
//             description: 'Log out successfully!',
//         });
//     };

//     const items: MenuProps['items'] = [
//         {
//             label: (
//                 <a><Link to={'/'} />Home</a>
//             ),
//             key: 'mail',
//             icon: <HomeOutlined />
//         },
//         {
//             label: (
//                 <a><Link to={'/products'} />Products</a>

//             ),
//             icon: <InboxOutlined />,
//             key: 'alipay',
//         },

//         {
//             label: isLoggedIn ? `Hello, ${user.name}` : 'Account',
//             key: 'SubMenu',
//             icon: <SettingOutlined />,
//             children: [
//                 {
//                     type: 'group',
//                     children: [
//                         {
//                             label: (
//                                 <Button
//                                     style={{ border: 'none', color: '#000' }}
//                                     type="link"
//                                     icon={<UserOutlined />}
//                                     onClick={() => navigate(isLoggedIn ? '/admin' : '/signin')}
//                                 >
//                                     {isLoggedIn ? 'Admin' : 'Sign In'}
//                                 </Button>
//                             ),
//                             key: 'setting:1',
//                         },
//                         {
//                             label: (
//                                 <Button
//                                     className=''
//                                     style={{ border: 'none', color: '#000' }}
//                                     onClick={isLoggedIn ? handleSignOut : () => navigate('/signup')}
//                                     type="link"
//                                     danger={isLoggedIn}
//                                     icon={<UserAddOutlined />}
//                                     hidden={!isLoggedIn}
//                                 >
//                                     {isLoggedIn ? 'Sign Out' : 'Sign Up'}
//                                 </Button>
//                             ),
//                             key: 'setting:2',
//                         },
//                     ],
//                 },
//             ],
//         }
//     ];

//     return (
//         <div>
//             <Header style={{ backgroundColor: '#fff' }}>
//                 <Row justify="space-between" align="middle">
//                     <Col >
//                         <div className='box_logo'>
//                             <img src={logo} style={Ilogo} alt="Logo" />
//                         </div>
//                     </Col>
//                     <Col>
//                         {showMenu && <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />}
//                     </Col>
//                 </Row>
//             </Header>
//         </div>
//     )
// }

// export default HeaderHome

