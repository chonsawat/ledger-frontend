import React from 'react'
import { Link, Outlet, useLocation, useNavigation } from 'react-router'

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state;
  const location = useLocation()
  const pathLocation = {
    ledger: location.pathname.match("/ledger") !== null ? "bg-cyan-700" : "bg-gray-400",
    account: location.pathname.match("/account") !== null ? "bg-cyan-700" : "bg-gray-400"
  }

  return (
    <>
      <div className='px-5 py-2 bg-neutral-700 text-xl text-white rounded-2xl ml-2 mt-2 mr-5 mb-0 flex'>
        <h2>LEDGER PROJECT</h2>
        <Link to={"/accounts"} className={`${pathLocation.account}  hover:bg-cyan-500 rounded-md px-3 ml-5 mr-2`}>ACCOUNTS</Link>
        <Link to={"/ledger"} className={`${pathLocation.ledger} hover:bg-cyan-500 rounded-md px-3 mr-2`}>LEDGER</Link>
      </div>
      <Outlet></Outlet>
    </>
  )
}

export default AppLayout