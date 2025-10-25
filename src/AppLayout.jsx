import React from 'react'
import { Outlet, useNavigation } from 'react-router'

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state;

  return (
    <>
      <div className='px-5 py-2 bg-neutral-700 text-xl text-white rounded-2xl ml-2 mt-2 mr-5 mb-0'>LEDGER PROJECT</div>
      <Outlet></Outlet>
    </>
  )
}

export default AppLayout