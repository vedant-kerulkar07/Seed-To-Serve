import React from 'react'
import {Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import AuthSuccess from './components/AuthSucess'
import FarmerPopup from './pages/FarmerPopup'
import AddCategory from './pages/AddCategory'
import AddProduct from './pages/AddProducts'
import OnlyFarmerAllowed from './components/OnlyFramerAllowed'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import UserLayout from './layouts/UserLayout'
import UserDashboard from './pages/UserDashboard'
import ProductPage from './pages/Products'
import ProductDetails from './pages/ProductDetails'


const App = () => {
  return (
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route element={<OnlyFarmerAllowed />}>
          <Route path="/farmer-popup" element={<FarmerPopup />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addproducts" element={<AddProduct />} />
        </Route>

        <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path='products' element={<ProductPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
  )
}

export default App
