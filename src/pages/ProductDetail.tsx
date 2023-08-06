import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Card, Row, Col, Pagination } from 'antd';
import { Iproducts } from './types/products';
// import './ProductDetail.css';

const { Meta } = Card;

const ProductDetail = (props) => {
    const { id } = useParams()
    const currentProduct = props.products.find((item => item.id == id))
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 3 // số lượng sản phẩm hiển thị trên mỗi trang
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const otherProducts = props.products.filter((item => item.id != id)).slice(startIndex, endIndex)
    const totalProducts = props.products.filter((item => item.id != id)).length
    const totalPages = Math.ceil(totalProducts / pageSize)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className="product-detail-container">
            <Breadcrumb
                items={[
                    {
                        title: <a><Link to={'/'}>Home</Link></a>,
                    },
                    {
                        title: <a><Link to={'/products'}>Products</Link></a>,
                    },
                    {
                        title: <a>{id}</a>,
                    }
                ]}
            />
            <div className="product-detail-content">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <img src={currentProduct?.image} />
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <div className="product-detail-info">
                            <h3>Name: {currentProduct?.name}</h3>
                            <p>Price: {currentProduct?.price}</p>
                            <p>Mô tả: {currentProduct?.description}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="other-products-container">
                <h4>Other products:</h4>
                <Row gutter={[16, 16]}>
                    {otherProducts.map((product: Iproducts) => (
                        <Col key={product.id} xs={24} sm={12} md={8}>
                            <Card className="other-product">
                                <Link to={`/products/${product.id}`}>
                                    <img src={product.image} style={{ width: '100%' }} />
                                    <Meta title={product.name} description={product.price} />
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination
                    current={currentPage}
                    total={totalProducts}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} products`}
                    pageSizeOptions={['3']}
                />
            </div>
        </div>

    )
}

export default ProductDetail
