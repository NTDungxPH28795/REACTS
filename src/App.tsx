import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import Website from './pages/layout/Website'
// import HomePage from './pages/HomePage'

import { addProduct, delProduct, getAll, updateProduct } from './api/products'
import { Iproducts } from './pages/types/products'
import ProductDetail from './pages/ProductDetail'
import UpdateProduct from './pages/admin/UpdateProduct'
import ListProducts from './pages/admin/ListProducts'
import Admin from './pages/layout/Admin'
import AddProduct from './pages/admin/AddProduct'
import AdminPage from './pages/admin/AdminPage'
import Users from './pages/admin/Users'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { IAccount, IUser } from './pages/types/users'
import { addUser, getAllUser } from './api/users'
import ProductsPage from './pages/ProductsPage'
import { notification } from 'antd'
import Categories from './pages/admin/Categories'
import { addCategories, delCategories, getAllCategories, updateCategories } from './api/category'
import { ICategories } from './pages/types/categories'
import AddCategory from './pages/admin/AddCategory'
import UpdateCategory from './pages/admin/UpdateCategory'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setIsLoggedIn(true)
    } else {
      navigate('/')
    }
  }, [])
  const [products, setProduct] = useState([])
  useEffect(() => {
    getAll().then(({ data }) => setProduct(data))
  }, [])
  const [users, setUsers] = useState([])
  useEffect(() => {
    getAllUser().then(({ data }) => setUsers(data))
  }, [])
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getAllCategories().then(({ data }) => setCategories(data))
  }, [])
  // categories
  const onHandleRemoveCategories = (id: number) => {
    delCategories(id).then(() => setCategories(categories.filter((item: ICategories) => item.id !== id)))
  }
  const onHandleAddCategory = (categories: ICategories) => {
    addCategories(categories).then(() => {
      getAllCategories().then(({ data }) => setCategories(data))
    })
  }
  const onHandleUpdateCategory = (categories: ICategories) => {
    updateCategories(categories).then(() => {
      getAllCategories().then(({ data }) => setCategories(data))
    })
  }

  const onHandleRemove = (id: number) => {
    delProduct(id).then(() => setProduct(products.filter((item: Iproducts) => item.id !== id)))
  }
  const onHandleUpdate = (product: Iproducts) => {
    updateProduct(product).then(() => {
      getAll().then(({ data }) => setProduct(data))
    })
  }
  const onHandleAdd = (product: Iproducts) => {
    addProduct(product).then(() => {
      getAll().then(({ data }) => setProduct(data))
    })
  }
  const onHandleSignUp = (account: IUser) => {
    addUser(account)
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Website />}>
          <Route index element={<ProductsPage products={products} categories={[]} />} />
          <Route path='signin' element={<SignIn users={users} />}></Route>
          <Route path='signup' element={<SignUp onSignUp={onHandleSignUp} users={users} />}></Route>
          <Route path='products'  >
            <Route index element={<ProductsPage products={products} categories={[]} />} />
            <Route path=':id' element={<ProductDetail products={products} />} />
          </Route>
        </Route>
        {/* admin */}
        <Route path='/admin' element={<Admin />} >
          <Route index element={<AdminPage products={products} users={users} />} />
          <Route path='products' >
            <Route index element={<ListProducts products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProduct onAdd={onHandleAdd} />} />
            <Route path=':id/update' element={<UpdateProduct onUpdate={onHandleUpdate} products={products} />} />
          </Route>
          <Route path='users' element={<Users users={users} onRemove={function (id: number): void {
            throw new Error('Function not implemented.')
          }} />}>
          </Route>
          <Route path='category' >
            <Route index element={<Categories categories={categories} onRemoveCategory={onHandleRemoveCategories} />} />
            <Route path='add' element={<AddCategory onAddCategory={onHandleAddCategory} categories={categories} />} />
            <Route path=':id/update' element={<UpdateCategory onUpdateCategory={onHandleUpdateCategory} categories={categories} />} />
          </Route>
        </Route>
      </Routes>
    </div >
  )
}

export default App
