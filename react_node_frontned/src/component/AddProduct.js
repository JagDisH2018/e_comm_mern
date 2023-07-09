import {React} from 'react'
import { useState } from 'react'

const AddProduct = () => {
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState('');
  const [company,setCompany]=useState('');
  const [error,setError]=useState(false);

  const addProduct = async()=>{
    console.log(!name);
    if(!name || !price || !category || !company){
      setError(true)
      return false;
    }



    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    //console.log(userId._id);
    let result = await fetch("http://localhost:3001/add-product",{
      method:'post',
      body:JSON.stringify({name, price, category, company, userId}),
      headers:{
        "Content-Type":"application/json"
      }
    });
    result = await result.json();
    console.log(result);
  }
  return (
    <div className='product'>
      <h1 className='addProduct'>Add Product</h1>
      <input type="text" placeholder='Enter product name' className='inputBox'  value={name} onChange={(e)=>{setName(e.target.value)}}/>
      {error && !name && <span className='invalid-input'>Enter valid name</span>}

      <input type="text" placeholder='Enter product price' className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
      {error && !price && <span className='invalid-input'>Enter valid price</span>}

      <input type="text" placeholder='Enter product category' className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
      {error && !category && <span className='invalid-input'>Enter valid category</span>}

      <input type="text" placeholder='Enter product company' className='inputBox' value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
      {error && !company && <span className='invalid-input'>Enter valid company</span>}

      <button onClick={addProduct} className='btnProduct'>Add Product</button>
    </div>
  )
}

export default AddProduct
