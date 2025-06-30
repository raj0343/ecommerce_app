import React from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'


const Users = () => {
  return (
    <Layout title={"All-Users"}>
            <div className='row'>
                <div className='col-md-3 '>
                    <AdminMenu/>
                </div>
                <div className='col-md-9 p-3'>
                    <h1>
                        All Users
                    </h1>
                </div>


            </div>
    </Layout>
  )
}

export default Users
