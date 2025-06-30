import React from 'react'
import Layout from '../components/layout/layout'

const About = () => {
  return (
    <Layout title={"About us- Ecommerce app"}>
        <h1>AboutPage</h1>
    </Layout>
  )
}

Layout.defaultProps={
  title: "Ecommerce App",
  description:"mern stack Project",
  author:"Rahul Acharjee"
}

export default About
