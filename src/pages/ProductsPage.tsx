import React, { useEffect, useState } from 'react'
import { Iproducts } from './types/products'
import { Link } from 'react-router-dom'
import { Col, Divider, Row, Button, Table, Pagination } from 'antd';
import { Breadcrumb } from 'antd';
import Banner from './components/Banner';

const style: React.CSSProperties = { textAlign: 'center', margin: '10px 21px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', padding: '8px', borderRadius: '8px' };
const image_style: React.CSSProperties = { borderRadius: '8px' };
interface Iprops {
    products: Iproducts[],
    categories: string[]
}
const ProductsPage = (props: Iprops) => {
    const [data, setData] = useState<Iproducts[]>([])
    useEffect(() => {
        setData(props.products)
    }, [props])

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage] = useState<number>(8);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => <Link to={'/products/' + record.id}>{text}</Link>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            key: 'categories',
        },
    ];

    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    const handleSearch = () => {
        if (searchKeyword) {
            const filteredProducts = data.filter((product) =>
                product.name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setData(filteredProducts);
        } else {
            setData(props.products);
            return (
                <div>
                    <p>Sản phẩm không tồn tại (●'◡'●)</p>
                </div>
            )
        }
    };

    return (
        <div>
            <Banner />

            <Breadcrumb
                items={[
                    {
                        title: <a><Link to={'/'}>Home</Link></a>,
                    },
                    {
                        title: <a><Link to={'/products'}>Products</Link></a>,
                    },
                ]}
            />

            <div className='products_main'>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for products"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    {/* <button onClick={handleSearch}>Search</button> */}
                    <Button style={{ backgroundColor: 'black', margin: '6px', color: '#fff' }} onClick={handleSearch}>Search</Button>

                </div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                    {currentProducts.map((item) => {
                        return (

                            <Col style={style} className="gutter-row" span={5}>
                                <Link to={'/products/' + item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div key={item.id}>
                                        <h2 style={{ minHeight: '3em' }}>{item.name}</h2>
                                        <p style={{ minHeight: '1em' }}>{item.price}</p>
                                        <img style={image_style} width={100} src={item.image} alt="" />
                                        {/* <Button disabled>{item.categoryId}</Button> */}
                                        <p style={{ minHeight: '4em' }}>{item.description}</p>
                                    </div>
                                </Link>
                            </Col>
                        )
                    })}
                </Row >
                <Pagination
                    current={currentPage}
                    pageSize={productsPerPage}
                    total={data.length}
                    onChange={handlePageChange}
                />
            </div>
        </div >
    );
}

export default ProductsPage
