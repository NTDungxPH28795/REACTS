import React from 'react';
import { Button } from 'antd';
import bannerImage from '../../../images/banner/Banner.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
            <img src={bannerImage} alt="Banner" style={{ width: '50%', marginRight: '20px' }} />
            <div>
                <h2 style={{ marginBottom: '20px' }}>Đăng kí ngay để nhận ưu đãi đặc biệt</h2>
                <p style={{ marginBottom: '20px' }}>Hãy đăng kí ngay để không bỏ lỡ cơ hội nhận ưu đãi đặc biệt từ chúng tôi!</p>
                <Button type="primary"><Link to={'/users/signup'}>Đăng kí ngay</Link></Button>
            </div>
        </div>
    );
};

export default Banner;
