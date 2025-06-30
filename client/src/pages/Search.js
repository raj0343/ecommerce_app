import Layout from '../components/layout/layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues]=useSearch()
  return (
    <Layout title={'search result'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>{values?.results.length <1 ?'no product found': `Found${values?.results.length}`}</h6>
                    <div className='row '>
            {values?.results.map((p) => (
              <div className='col-md-4 mb-4' key={p._id}>
                <div className='card h-100'>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className='card-img-top'
                    alt={p.name}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className='card-body d-flex flex-column justify-content-between'>
                    <div>
                      <h5 className='card-title'>{p.name}</h5>
                      <p className='card-text'>{p.description.substring(0, 40)}...</p>
                      <p className='card-text fw-bold'>₹{p.price}</p>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <button className='btn btn-primary w-100'>More Details</button>
                      <button className='btn btn-secondary w-100'>Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
                </div>
            </div>
    </Layout>
  )
}

export default Search
