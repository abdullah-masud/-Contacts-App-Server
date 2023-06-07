const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
//Model
const userModel = require('./models/user.model.js')

const app = express()
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 8080

// Read
// http://localhost:8080
app.get('/', async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

// Create Data or Post data
// http://localhost:8080/create
/*
{
    "name":"masud",
    "email":"masud@gmail.com",
    "mobile": 123313213
}
*/
app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data save succesfully", data: data })
})

// Update Data
// http://localhost:8080/update
/*
{
    id:"",
    name:"",
    email:"",
    mobile:""
}
*/
app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    console.log(rest)
    const data = await userModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "data updated successfully", data: data })
})

// Delete API
//http://localhost:8080/delete/id
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const data = await userModel.deleteOne({ _id: id })
    res.send({ success: true, message: "data deleted successfully", data: data })
})


mongoose.connect("mongodb://localhost:27017/contactsAppDB")
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => {
            console.log(`Contacts App Server listening on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))

