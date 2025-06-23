import React from 'react'
import Header from './header'
import Footer from './footer'

const layout = ({children}) => {
  return (
    <div>
    <Header/>
    <main style={{minHeight:'80vh'}}>
      {children}
    </main>
    <Footer/>
    </div>
  )
}

export default layout
