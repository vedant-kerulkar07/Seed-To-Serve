import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import AuthSuccess from './components/AuthSucess'
import FarmerPopup from './pages/FarmerPopup'
import AddCategory from './pages/AddCategory'
import AddProduct from './pages/AddProducts'
import OnlyFarmerAllowed from './components/OnlyFramerAllowed'


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
      </Routes>
  )
}

export default App
