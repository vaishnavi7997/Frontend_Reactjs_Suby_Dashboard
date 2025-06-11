import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [productName, setproductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestseller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

    const handleCategoryChange = (event) => {
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item) => item !== value));
    }else{
      setCategory([...category,value])
    }
  }

  const handleBestSeller = (event) => {
    const value = event.target.value === 'true'
    setBestseller(value)
  }

    const handleImageUpload = (event) =>{
    const selectedImage = event.target.files[0];
    setImage(selectedImage)
  }

  const handleAddProduct = async(e) => {
    e.preventDefault()
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId')
      if(!loginToken || firmId){
          console.error("User Not Authemticated")
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('bestseller', bestSeller);
      formData.append('image', image);
      formData.append('description', description);

      category.forEach((value) => {
        formData.append('category', value)
      });
    
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        body: formData
      })
      // const data = await response.json()

      if(response.ok){
        alert('Product Added Succesfully')
      }
      setproductName("")
      setPrice("")
      setCategory([])
      setBestseller(false)
      setImage(null)
      setDescription("");
    } catch (error) {
      // console.error(data.message); 
      alert('Failed To Add Product')
    }
  }

  return (
    <div className='firmSection'>
       <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Products</h3>
          <label>Product Name</label>
        <input type='text' value={productName} onChange={(e) => setproductName(e.target.value)} />
        <label>Price</label>
        <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className='checkBoxContainer'>
           <label>Veg</label>
           <input type='checkbox' value = "veg" checked = {category.includes('veg')}  onChange={handleCategoryChange}/>
          </div>
          <div className='checkBoxContainer'>
           <label>Non-Veg</label>
           <input type='checkbox'  value = "non-veg"  checked = {category.includes('non-veg')} onChange={handleCategoryChange} />
          </div>
          </div>
        </div>

        <div className="checkInp">
          <label>Best Seller</label>
          <div className="inputsContainer">
            <div className="checkBoxContainer">
              <label>Yes</label>
              <input type='radio'  value = "true" checked = {bestSeller === true} onChange={handleBestSeller} />
            </div>
            <div className="checkBoxContainer">
              <label>No</label>
              <input type='radio'  value = "false" checked = {bestSeller === false} onChange={handleBestSeller}  />
            </div>
          </div>
        </div>

        <label>Description</label>
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
        <label>Firm Image</label>
        <input type='file'  onChange={handleImageUpload}/>

          <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct
