import React from 'react'
import Layout from '../../components/layout/layout'
import UserMenu from '../../components/layout/UserMenu'

const Orders = () => {
  return (
    <Layout>
        <div className='container-flui p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                    <h1>Orders</h1>
                </div>

            </div>
        </div>
    </Layout>
  )
}

export default Orders
