import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const OnlyFarmerAllowed = () => {
  const { isLoggedIn, role } = useSelector(state => state.user)
  if (!isLoggedIn || !role) {
    return (
      <div>Loading....</div>
    )
  }

  if (role !== "FARMER") {
    return (
      <Navigate to="/login" replace />
    )
  }
  return (
    <Outlet />
  )
}
export default OnlyFarmerAllowed
