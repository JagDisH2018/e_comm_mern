import {React, useEffect} from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState('');
  const [company,setCompany]=useState('');
  const [error,setError]=useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(params)
    getProductDetails();
  },[])

  const getProductDetails = async()=>{
    console.log(params);
    let result = await fetch(`http://localhost:3001/product/${params.id}`);
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  const updateProduct = async ()=>{
    console.log(name,price,category,company)
    let result = await fetch(`http://localhost:3001/product/${params.id}`,{
        method:'Put',
        body:JSON.stringify({name, price,category,company}),
        headers:{
            'Content-Type':"application/json"
        }
    });
    result = await result.json();
    console.log(result);
    navigate('/');
  }

  return (
    <div className='product'>
      <h1 className='addProduct'>Update Product</h1>
      <input type="text" placeholder='Enter product name' className='inputBox'  value={name} onChange={(e)=>{setName(e.target.value)}}/>

      <input type="text" placeholder='Enter product price' className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>

      <input type="text" placeholder='Enter product category' className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}}/>

      <input type="text" placeholder='Enter product company' className='inputBox' value={company} onChange={(e)=>{setCompany(e.target.value)}}/>

      <button onClick={updateProduct} className='btnProduct'>Update Product</button>
    </div>
  )
}

export default UpdateProduct
