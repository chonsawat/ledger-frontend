import React from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigation } from 'react-router'

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state;
  const location = useLocation()
  const pathLocation = {
    ledger: location.pathname === ("/ledger") ? "bg-cyan-700" : "bg-gray-400",
    ledgerGroup: location.pathname === ("/ledger/groupByDate") ? "bg-cyan-700" : "bg-gray-400",
    account: location.pathname === ("/accounts") ? "bg-cyan-700" : "bg-gray-400"
  }

  return (
    <>
      <div className='px-5 py-2 bg-neutral-700 text-xl text-white rounded-2xl ml-2 mt-2 mr-5 mb-0 flex'>
        <h2>LEDGER PROJECT</h2>
        <Link to={"/accounts"} className={`${pathLocation.account}  hover:bg-cyan-500 rounded-md px-3 ml-5 mr-2`}>ACCOUNTS</Link>
        <Link to={"/ledger"} className={`${pathLocation.ledger} hover:bg-cyan-500 rounded-md px-3 mr-2`}>LEDGER</Link>
        <Link to={"/ledger/groupByDate"} className={`${pathLocation.ledgerGroup} hover:bg-cyan-500 rounded-md px-3 mr-2`}>
          LEDGER (GROUP BY DATE)</Link>
      </div>
      <Outlet></Outlet>
    </>
  )
}

export default AppLayout