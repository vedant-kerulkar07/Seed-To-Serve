import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const OnlyFarmerAllowed = () => {
  const user = useSelector(state => state.user)
  if(user && user.isLoggedIn && user.user.role === 'farmer') {
    return (
      <Outlet />
    )
  }else{
    return <Navigate to="/login" replace />
  }
}

export default OnlyFarmerAllowed
