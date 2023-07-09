const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require("./db/User");
const app = express();
app.use(express.json());
app.use(cors());

const Product = require("./db/Product");


app.post("/register", async (req, res) => {
    // res.send('Api runnig kar raha h')

    let user = new User(req.body);
    let result = await user.save();
    //return res.send(req.body);
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        } else {
            res.send({ result: "No user found" });
        }
    } else {
        res.send({ result: "No user found" });
    }

})


app.post("/add-product",async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})


app.get("/products", async(req,res)=>{
    let products = await Product.find();
    if(products.length > 0){
        res.send(products);
    }else{
        res.send({result:"No product found"})
    }
})

app.delete("/product/:id",async (req,res)=>{
    //res.send(req.params.id);
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
})

/* app.get("/product/:id",async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result:"No record found"});
    }
}) */
app.get("/product/:id", async (req, res) => {
    try {
      let result = await Product.findOne({ _id: req.params.id });
      if (result) {
        res.send(result);
      } else {
        res.send({ result: "No record found" });
      }
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
});

app.put("/product/:id", async(req,res)=>{
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set : req.body
        }
    )
    res.send(result);
});

app.get("/search/:key", async(req,res)=>{
    let result= await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}

        ]
    });
    res.send(result);
})
  

const port = 3001;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});