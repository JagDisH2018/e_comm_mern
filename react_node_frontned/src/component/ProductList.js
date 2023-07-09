import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:3001/products');
        result = await result.json();
        setProducts(result);
    }
    console.log("products", products)

    const deleteProduct = async (id) => {
        console.log(id);
        let result = await fetch(`http://localhost:3001/product/${id}`, {
            method: 'Delete'
        });
        result = await result.json();
        if (result) {
            //alert("record is deleted");
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        console.log(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:3001/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        }else{
            getProducts();
        }

    }

    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <input type='text' placeholder='Search Item' className='search-product-box'
                onChange={searchHandle}
            />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Action</li>
            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={'/update/' + item._id}>Update</Link>
                        </li>
                    </ul>
                )
                :
                <h1>No result found</h1>
            }
        </div>
    )
}

export default ProductList
