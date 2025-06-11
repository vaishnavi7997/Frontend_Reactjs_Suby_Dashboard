import React,{ useState } from 'react'
import {API_URL} from "../../data/apiPath"

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item) => item !== value));
    }else{
      setCategory([...category,value])
    }
  }
  const handleRegionChange = (event) => {
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item) => item !== value));
    }else{
      setRegion([...region,value])
    }
  }

  const handleImageUpload = (event) =>{
    const selectedImage = event.target.files[0];
    setFile(selectedImage)
  }

  const handleFirmSubmit = async(e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        console.error('User Not Authenticated')
      }
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);

      category.forEach((value) => {
        formData.append('category', value)
      });
      region.forEach((value) => {
        formData.append('region', value)
      })

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      });
      const data = await response.json()
      if(response.ok){
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("Firm Added Successfully");
      } else if(data.message === "vendor can have only one firm"){
        alert ("Firm Exists. Only One Firm Can Be Added ")
      } else if (data.message === "Firm name already exists") {
           alert("Firm name already exists. Please use a different name.");
      } else {
        alert('Failed To Add Firm');
       }
      console.log("this is firm id", data.firmId);
      const firmId = data.firmId;

      localStorage.setItem('firmId', firmId);
        localStorage.setItem('firmName', firmName); 

    } catch (error) {
      console.error("Failed To Add Firm")
      
    }
  }

  return (
    <div className='firmSection'>
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
          <label>Firm Name</label>
        <input type='text' name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} />
        <label>Area</label>
        <input type='text' name='area' value={area} onChange={(e) => setArea(e.target.value)} />

        {/* <label>Category</label>
        <input type='text' /> */}
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className='checkBoxContainer'>
           <label>Veg</label>
           <input type='checkbox' checked = {category.includes('veg')} onChange={handleCategoryChange} value = "veg" />
          </div>
          <div className='checkBoxContainer'>
           <label>Non-Veg</label>
           <input type='checkbox' checked = {category.includes('non-veg')} value = "non-veg" onChange={handleCategoryChange} />
          </div>
          </div>
        </div>

        {/* <label>Region</label>
        <input type='text' /> */}
        <div className="checkInp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className='checkBoxContainer'>
           <label>South-Indian</label>
           <input type='checkbox'  value = "south-indian" checked = {region.includes('south-indian')} 
           onChange={handleRegionChange}
           />
          </div>
          <div className='checkBoxContainer'>
           <label>North-Indian</label>
           <input type='checkbox' value = "north-indian"  checked = {region.includes('north-indian')} 
           onChange={handleRegionChange}
           />
          </div>
          <div className='checkBoxContainer'>
           <label>Chineese</label>
           <input type='checkbox' value = "chinese"  checked = {region.includes('chinese')}
           onChange={handleRegionChange}
           />
          </div>
          <div className='checkBoxContainer'>
           <label>Bakery</label>
           <input type='checkbox' value =  "bakery"  checked = {region.includes('bakery')}
           onChange={handleRegionChange}
           />
          </div>
          </div>
        </div>

        <label>Offer</label>
        <input type='text' name='offer'  value={offer} onChange={(e) => setOffer(e.target.value)}/>
        <label>Firm Image</label>
        <input type='file' onChange={handleImageUpload} /> 
          <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm
