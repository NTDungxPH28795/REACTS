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
                <p style={{ marginBottom: '20px' }}>Developed by Dungx</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ marginRight: '20px' }}>Contact:</p>
                <p style={{ marginRight: '20px' }}>Phone: +84988328867</p>
                <p style={{ marginRight: '20px' }}>Email: Dung1811@gmail.com</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ marginRight: '20px' }}>Address:</p>
                <p style={{ marginRight: '20px' }}>Trung Văn, Nam Từ Liêm, Hà Nội</p>
            </div>
        </Footer>
    );
};

export default FooterComponent;
