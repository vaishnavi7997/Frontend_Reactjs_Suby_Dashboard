import React,{useState, useEffect} from 'react'
import { API_URL } from '../data/apiPath';


const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const productsHandler = async() => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
            console.log(newProductsData);
        } catch (error) {
            console.error("Failed To Fetch Products", error);
            alert('Failed To Fetch Products')
        }
    }

    useEffect(() => {
        productsHandler()
        console.log("this is useEffect")
    }, [])

    const deleteProductById = async(productId) => {
       try {
            const confirmDelete = window.confirm("Are you sure you want to delete?");
         if (!confirmDelete) return; 

          const response = await fetch(`${API_URL}/product/${productId}`, {
          method: 'DELETE', 
       });

           if (response.ok) {
          setProducts(products.filter(product => product._id !== productId));
          alert("Product Deleted Successfully");
        } else {
       alert("Failed to delete product");
         }
       } catch (error) {
         console.error('Failed to delete product', error);
         alert('Failed to delete product');
    }
    }

  return (
    <div>
      {!products ? (
        <p>No Products Added</p>
      ) : (
        <div className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
                 return (
                  <>
                  <tr key={item._id} >
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.image && (
                        <img src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                     />
                      )}
                    </td>
                    <td>
                      <button onClick={() => deleteProductById(item._id)}>Delete</button>
                    </td>
                    </tr>
                  </>
                 )
            })}
          </tbody>
        </div>
      )}
    </div>
  )
}

export default AllProducts
