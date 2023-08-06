import React from 'react';
import { Layout } from 'antd';
import logo from '../../../images/logo/Logo.png';

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#fff',
    padding: '20px',
};

const FooterComponent = () => {
    return (
        <Footer style={footerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
                <p style={{ marginBottom: '20px' }}>Developed by Laxus</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ marginRight: '20px' }}>Contact:</p>
                <p style={{ marginRight: '20px' }}>Phone: +84862325xxx</p>
                <p style={{ marginRight: '20px' }}>Email: laxus2301@gmail.com</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ marginRight: '20px' }}>Address:</p>
                <p style={{ marginRight: '20px' }}>103, Vuc hamlet, Di Trach, Hoai Duc, Hanoi</p>
            </div>
        </Footer>
    );
};

export default FooterComponent;
