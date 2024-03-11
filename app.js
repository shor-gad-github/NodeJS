const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port  = "3000";

app.use(bodyParser.json());


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//SERVER API Data 
let dataStore = {};

app.get('/items/:id',(req,res)=>{
 const {id} =  req.params;
 if (dataStore[id])
 {
    res.json(dataStore[id]);
 }
 else{
    res.status(404).send('Item not found');
 }
});

app.post('/items/',(req,res)=>{
    const {id,item} =  req.body;
    dataStore[id] = item;
    console.log(dataStore);
    res.status(201).send(`Item Added id:${id}`)
});


app.put('/items/:id',(req,res)=>{
    const {id,item} =  req.body;

     if (!dataStore[id])
     {
        res.status(404).send('Item not found');  
     }
    dataStore[id] = item;
    res.status(201).send( dataStore[id]);
});


app.delete('/items/:id',(req,res)=>{
    const {id} =   req.params;

     if (!dataStore[id])
     {
        res.status(404).send('Item not found');  
     }
     else{
         delete dataStore[id];
         res.status(204).send("Item Deleted");
     }
});


